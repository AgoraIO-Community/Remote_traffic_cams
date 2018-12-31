import React, { Component } from "react";
import moment from "moment";
import { browserHistory } from "react-router";
import FileSaver from "file-saver";
import {Grid, Modal} from "@material-ui/core";
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import https from "../services/https";
import SuccessMessage from "../components/SuccessMessage";

class ApplicantListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {interview: false, datetime: new Date(), success: null};
    }
    render() {
        let Buttons = null;
        if (this.props.status == "pending"){
            Buttons = (
                <Grid container direction="row" justify="flex-end" alignItems="center">
                    <button style={{borderRadius: 10, height: 40, width: 120, fontSize: 24, backgroundColor: "red", marginRight:8}}
                        onClick={() => this.decline()}>
                        Decline
                    </button>
                    <button style={{borderRadius: 10, height: 40, width: 220, fontSize: 24, backgroundColor: "green"}}
                        onClick={() => this.interview()}>
                        Offer An Interview
                    </button>
                </Grid>
            );
        }
        return (
            <div className="container">
                <SuccessMessage message={this.state.success}/>
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                style={this.modalStyle()} open={this.state.interview}
                onClose={() => this.setState({interview: false})}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <div style={{margin: 30}}></div>
                        <div style={{fontSize: 36, color: "white"}}><b>Set Up An Interview</b></div>
                        <div style={{margin: 20}}></div>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <Grid container justify="space-around">
                                <DatePicker margin="normal" label="Date" style={{backgroundColor: "rgb(214, 214, 214)", paddingLeft: 40}}
                                value={this.state.datetime} onChange={(datetime) => this.setState({datetime})} />
                                <TimePicker margin="normal" label="Time" style={{backgroundColor: "rgb(214, 214, 214)", paddingLeft: 40}}
                                value={this.state.datetime} onChange={(datetime) => this.setState({datetime})} />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <div style={{margin: 20}}></div>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <button style={{borderRadius: 10, height: 40, width: 120, fontSize: 24}}
                                onClick={() => this.submit()}>
                                Submit
                            </button>
                            <div style={{margin: 30}}></div>
                            <button style={{borderRadius: 10, height: 40, width: 120, fontSize: 24}}
                                onClick={() => {this.setState({interview: false})}}>
                                Cancel
                            </button>
                        </Grid>

                        <div style={{margin: 30}}></div>
                    </Grid>

                </Modal>
                <Grid container direction="column" justify="center" alignItems="center">
                    <Grid container direction="row" justify="center" alignItems="center">
                        <div style={{fontSize: 24, margin: 10}}><b>Name: </b>{this.props.name}</div>
                        <div style={{fontSize: 24, margin: 10}}><b>Applied for: </b>{this.props.position}</div>
                        <div style={{fontSize: 24, margin: 10}}><b>Salary: </b>${this.props.salary}</div>
                    </Grid>

                    <Grid container direction="row" justify="center" alignItems="center">
                        <div style={{fontSize: 24, margin: 10}}><b>Location: </b>{this.props.location}</div>
                        <div style={{fontSize: 24, margin: 10}}><b>Resume: </b></div>
                        <button style={{borderRadius: 5, height: 30, width: 100, fontSize: 20}}
                            onClick={() => this.resume()}>
                            Download
                        </button>
                    </Grid>
                    {Buttons}
                </Grid>
                <div style={{color: "black", backgroundColor: "black", height: 1, marginTop: 10}}></div>
            </div>
        );
    }
    modalStyle() {
        return {
          top: `${50}%`,
          left: `${50}%`,
          transform: `translate(-${50}%, -${50}%)`,
          height: `${50}%`
        };
    }
    resume() {
        https.post("/api/corporate/resume", {id: this.props.applicationId}).then((response) => {
            https.post("/api/corporate/resume/download", {id: this.props.applicationId},
            {responseType: 'blob', timeout: 30000}).then((file) => {
                const blob = new Blob([file.data], {type: "text/plain;charset=utf-8"});
                FileSaver.saveAs(blob, response.data);
            });
        });

    }
    decline() {
        let data = {
            id: this.props.applicationId,
            status: "denied"
        }
        https.post("/api/corporate/makeoffer", data).then((response) => {
            this.setState({interview: false})
            this.setState({success: "The denied offer has been successful sent!"});
            setTimeout(() => {
                this.setState({success: null});
            }, 3000);
        });
    }
    interview() {
        this.setState({interview: !this.state.interview});
    }
    submit() {
        let data = {
            id: this.props.applicationId,
            datetime: moment(this.state.datetime._d).format('MMMM Do YYYY, h:mm a'),
            status: "accepted"
        }
        https.post("/api/corporate/makeoffer", data).then((response) => {
            this.setState({interview: false})
            this.setState({success: "The offer has been successful sent!"});
            setTimeout(() => {
                this.setState({success: null});
            }, 3000);
        });

    }
}

export default ApplicantListItem;