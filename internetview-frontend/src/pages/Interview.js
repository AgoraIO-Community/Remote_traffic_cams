import React, { Component } from "react";
import { browserHistory } from "react-router";
import {Grid} from "@material-ui/core";
import NavBar from "../components/NavBar";
import JobListItem from "../components/JobListItem";
import "../styles/App.css";

class Interview extends Component {
    constructor(props) {
        super(props);
        this.state = {remoteId: "", joined: false, client: null, localStream: null};
        this.video = React.createRef();
    }
    render() {
        let JoinButton = null;
        let LeaveButton = null;
        if (this.state.joined == false) {
            JoinButton = (
                <button style={{borderRadius: 10, height: 60, width: 500, fontSize: 36, backgroundColor: "green"}}
                    onClick={() => this.join()}>
                    Join The Interview Call
                </button>
            )
            LeaveButton = null;
        } else {
            JoinButton = null;
            LeaveButton = (
                <button style={{borderRadius: 10, height: 60, width: 500, fontSize: 36, backgroundColor: "red"}}
                    onClick={() => this.leave()}>
                    Leave The Interview Call
                </button>
            )
        }
        return (
            <div>
                <NavBar />
                {JoinButton}
                {LeaveButton}
                <div ref={this.video} className="container">
                    <div id="agora_local" className = "local"></div>
                    <div id={"agora_remote"+this.state.remoteId} className = "remote"></div>
                </div>

            </div>

        );
    }
    componentDidMount() {

    }
    join(){
        this.setState({joined: true});
        let video = this.video.current;
        if(!window.AgoraRTC.checkSystemRequirements()) {
            alert("Your browser does not support WebRTC!");
        } else {
            let client = window.AgoraRTC.createClient({mode: 'interop'});
            client.init("6798b872eda341cb826f1228fb6b4ad2", () => {
                console.log("AgoraRTC client initialized");
                client.join(null, "1", null, (uid) => {
                    console.log("User " + uid + " join channel successfully");
                    let localStream = window.AgoraRTC.createStream({
                        streamID: uid,
                        audio: true,
                        video: true,
                        screen: false
                    });
                    localStream.setVideoProfile('720p_3');
                    localStream.on("accessAllowed", function() {
                        console.log("accessAllowed");
                    });
                    localStream.on("accessDenied", function() {
                      console.log("accessDenied");
                    });
                    localStream.init( function () {
                        console.log("getUserMedia successfully");
                        localStream.play('agora_local');
                        client.publish(localStream, function (err) {
                            console.log("Publish local stream error: " + err);
                        });
                        client.on('stream-published', function (evt) {
                            console.log("Publish local stream successfully");
                         });
                    }, function (err) {
                      console.log("getUserMedia failed", err);
                    });
                    this.setState({localStream});
                }, function(err) {
                  console.log("Join channel failed", err);
                });
            }, function (err) {
                console.log("AgoraRTC client init failed", err);
            });
            client.on('error', function(err) {
                console.log("Got error msg:", err.reason);
                if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
                  client.renewChannelKey("", function(){
                    console.log("Renew channel key successfully");
                  }, function(err){
                    console.log("Renew channel key failed: ", err);
                  });
                }
            });
            client.on('stream-added', function (evt) {
                let stream = evt.stream;
                console.log("New stream added: " + stream.getId());
                console.log("Subscribe ", stream);
                client.subscribe(stream, function (err) {
                  console.log("Subscribe stream failed", err);
                });
            });
            client.on('stream-subscribed', (evt) => {
                let stream = evt.stream;
                console.log("Subscribe remote stream successfully: " + stream.getId());
                this.setState({remoteId: stream.getId()});
                stream.play('agora_remote' + stream.getId());
            });
            client.on('stream-removed', (evt) => {
                let stream = evt.stream;
                stream.stop();
                this.setState({remoteId: null});
                console.log("Remote stream is removed " + stream.getId());
            });
            client.on('peer-leave', (evt) => {
                let stream = evt.stream;
                if (stream) {
                  stream.stop();
                  this.setState({remoteId: null});
                  console.log(evt.uid + " leaved from this channel");
                }
            });
            this.setState({client});
        }

    }
    leave(){
        this.setState({joined: false})
        let client = this.state.client;
        let localStream = this.state.localStream;
        client.leave(function () {
            console.log("Leavel channel successfully");
        }, function (err) {
            console.log("Leave channel failed");
        })
        client.unpublish(localStream, function (err) {
            console.log("Unpublish local stream failed" + err);
        });
        browserHistory.goBack();
    }
}

export default Interview;