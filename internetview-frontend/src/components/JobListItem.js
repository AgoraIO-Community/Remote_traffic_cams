import React, { Component } from "react";
import {Grid, Modal} from "@material-ui/core";
import https from "../services/https";
import SuccessMessage from "../components/SuccessMessage";

class JobListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {hiddenDescription: true, apply: false, appiled: false, resume: null, success: null};
    }
    render() {
        let InfoButtonText = null;
        let Description = null;
        let SmallDivider = null;
        if (this.state.hiddenDescription == true) {
            InfoButtonText = "More Info"
            Description = null;
            SmallDivider = null;
        } else {
            InfoButtonText = "Less Info";
            Description = (
                <p style={{marginLeft: 50, marginRight: 50, fontSize: 22}}>{this.props.description}</p>
            );
            SmallDivider = (
                <div style={{backgroundColor: "grey", height: 1, width: 1000, alignSelf : "center"}}></div>
            );
        }

        return (
            <div className="container">
                <SuccessMessage message={this.state.success} />
                <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description"
                    style={this.modalStyle()} open={this.state.apply}
                    onClose={() => this.setState({apply: false})}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <div style={{margin: 30}}></div>
                        <div style={{fontSize: 36, color: "white"}}><b>Upload your resume</b></div>
                        <div style={{margin: 30}}></div>
                        <input style={{color: "white"}} type="file"
                            onChange={(e) => {this.setState({resume: e.target.files[0]})}}/>
                        <div style={{margin: 30}}></div>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <button style={{borderRadius: 10, height: 40, width: 120, fontSize: 24}}
                                onClick={() => this.submit()}>
                                Submit
                            </button>
                            <div style={{margin: 30}}></div>
                            <button style={{borderRadius: 10, height: 40, width: 120, fontSize: 24}}
                                onClick={() => {this.setState({apply: false})}}>
                                Cancel
                            </button>
                        </Grid>

                        <div style={{margin: 40}}></div>
                    </Grid>

                </Modal>
                <div style={{fontSize: 36, textAlign: 'center'}}>{this.props.jobTitle}</div>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                    <Grid direction="column" style={{marginLeft: 60, marginRight: 60}}>
                        <img src={this.props.logo} style={{height: 80, width: 80}}/>
                        <div style={{fontSize: 30}}>{this.props.companyName}</div>
                    </Grid>
                    <Grid direction="column">
                        <div style={{fontSize: 24, margin: 20}}><b>Post Date: </b>{this.props.posted}</div>
                        <div style={{fontSize: 24, margin: 20}}><b>Type: </b>{this.props.time}</div>
                    </Grid>
                    <Grid direction="column">
                        <div style={{fontSize: 24, margin: 20}}><b>Location: </b>{this.props.location}</div>
                        <div style={{fontSize: 24, margin: 20}}><b>Salary: </b>${this.props.salary}</div>
                    </Grid>
                    <Grid direction="column" style={{marginTop: 60}}>
                        <button style={{borderRadius: 10, height: 40, width: 120, fontSize: 24, marginRight:8}}
                            onClick={() => this.info()}>
                            {InfoButtonText}
                        </button>
                        <button style={{borderRadius: 10, height: 40, width: 120, fontSize: 24}}
                            onClick={() => this.apply()}>
                            Apply
                        </button>
                    </Grid>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="center">
                    {SmallDivider}
                    {Description}
                </Grid>
                <div style={{color: "black", backgroundColor: "black", height: 1}}></div>
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
    info() {
        this.setState({hiddenDescription: !this.state.hiddenDescription});
    }
    apply() {
        this.setState({apply: !this.state.apply});
    }
    submit() {
        let formData = new FormData();
        formData.append("id", this.props.id);
        formData.append("file", this.state.resume);
        https.post("/api/user/submitapp", formData).then((response) => {
            this.setState({apply: false})
            this.setState({success: "Resume has been successful sent!"});
            setTimeout(() => {
                this.setState({success: null});
            }, 3000);
        });

    }
}

export default JobListItem;