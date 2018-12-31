import React, { Component } from "react";
import moment from "moment";
import jwtDecode from "jwt-decode";
import { browserHistory } from "react-router";
import {Grid, Modal} from "@material-ui/core";
import https from "../services/https";
import SuccessMessage from "../components/SuccessMessage";

class ApplicantListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {userStatus: null, corporateStatus: null, success: null, token: null, accountType: null};
    }
    render() {
        let Buttons = null;
        if (this.state.userStatus == "pending" && this.state.corporateStatus == "accepted"
        && this.state.token != null && this.state.accountType == "user") {
            Buttons = (
                <Grid container direction="row" justify="flex-end" alignItems="center">
                    <button style={{borderRadius: 10, height: 40, width: 120, fontSize: 24, backgroundColor: "red", marginRight:8}}
                        onClick={() => this.decline()}>
                        Decline
                    </button>
                    <button style={{borderRadius: 10, height: 40, width: 120, fontSize: 24, backgroundColor: "green"}}
                        onClick={() => this.accept()}>
                        Accept
                    </button>
                </Grid>
            )

        } else if (this.state.userStatus == "accepted" && this.state.corporateStatus == "accepted" && this.state.token != null){
            Buttons = (
                <Grid container direction="row" justify="flex-end" alignItems="center">
                    <button style={{borderRadius: 10, height: 40, width: 140, fontSize: 28, backgroundColor: "green", marginRight: 20}}
                        onClick={() => this.interview()}>
                        Interview
                    </button>
                </Grid>
            )
        }
        return (
            <div className="container">
                <SuccessMessage message={this.state.success} />
                <Grid container direction="row" justify="center" alignItems="center">
                    <div style={{fontSize: 24, margin: 10}}><b>Company: </b>{this.props.company}</div>
                    <div style={{fontSize: 24, margin: 10}}><b>Position: </b>{this.props.position}</div>
                    <div style={{fontSize: 24, margin: 10}}><b>Location: </b>{this.props.location}</div>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                    <div style={{fontSize: 24, margin: 10}}><b>Meeting Time: </b>{this.props.meetingTime?this.props.meetingTime:"Not decided yet"}</div>
                    <div style={{fontSize: 24, margin: 10}}><b>User Status: </b>{this.props.userStatus}</div>
                    <div style={{fontSize: 24, margin: 10}}><b>Corporate Status: </b>{this.props.corporateStatus}</div>
                </Grid>
                {Buttons}

                <div style={{color: "black", backgroundColor: "black", height: 1, marginTop: 10}}></div>
            </div>
        );
    }
    componentDidMount() {
        this.setState({userStatus: this.props.userStatus, corporateStatus: this.props.corporateStatus});
        let token = localStorage.getItem("token");
        let payload;
        if (token != null) {
            payload = jwtDecode(JSON.parse(token));
            this.setState({token, accountType: payload.accountType})
        }


    }
    decline() {
        let data = {
            id: this.props.applicationId,
            status: "denied"
        }
        https.post("/api/user/acceptoffer", data).then((response) => {
            this.setState({status: "denied"});
            this.setState({success: "You have denied the interview!"});
            setTimeout(() => {
                this.setState({success: null});
            }, 3000);
        });
    }
    accept() {
        let data = {
            id: this.props.applicationId,
            status: "accepted"
        }
        https.post("/api/user/acceptoffer", data).then((response) => {
            this.setState({status: "accepted"});
            this.setState({success: "You have confirmed the interview!"});
            setTimeout(() => {
                this.setState({success: null});
            }, 3000);
        });
    }
    interview() {
        browserHistory.push('/interview');
    }
}

export default ApplicantListItem;