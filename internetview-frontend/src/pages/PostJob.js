import React, { Component } from "react";
import {Grid, Select, MenuItem} from "@material-ui/core";
import https from "../services/https";
import NavBar from "../components/NavBar";
import SuccessMessage from "../components/SuccessMessage";
import "../styles/App.css";

class PostJob extends Component {
    constructor(props) {
        super(props);
        this.state = {jobTitle: "", type: "full-time", salary: "", location: "", logo: "", description: "", success: null};
  }
    render() {
        return (
            <div className="container">
                <NavBar />
                <SuccessMessage message={this.state.success}/>
                <Grid container direction="column" justify="center" alignItems="center">
                    <input value={this.state.jobTitle} className="textInput"
                    onChange={(event) => this.setState({jobTitle: event.target.value})}
                    placeholder="Job Title" autoFocus={true} />
                    <input value={this.state.location} className="textInput"
                    onChange={(event) => this.setState({location: event.target.value})}
                    placeholder="Location" />
                    <Grid container direction="row" justify="center" alignItems="center">
                        <div style={{fontSize: 32, marginRight: 20, marginTop: 30}}>Type:</div>
                        <Select className="selectInput" value={this.state.type} style = {{width: 360}}
                        onChange={(event) => this.setState({type: event.target.value})}>
                            <MenuItem value="full-time">
                              <div style={{fontSize: 32}}>Full-time</div>
                            </MenuItem>
                            <MenuItem value="part-time">
                              <div style={{fontSize: 32}}>Part-time</div>
                            </MenuItem>
                        </Select>
                    </Grid>
                    <input value={this.state.salary} className="textInput"
                    onChange={(event) => this.setState({salary: event.target.value})}
                    placeholder="Salary" />
                    <input value={this.state.logo} className="textInput"
                    onChange={(event) => this.setState({logo: event.target.value})}
                    placeholder="Url to the logo" />
                    <textarea value={this.state.description} className="textArea"
                    onChange={(event) => this.setState({description: event.target.value})}
                    placeholder="Description" />
                    <button style={{borderRadius: 10, height: 80, width: 400, fontSize: 32, marginTop: 60, backgroundColor: "rgb(40, 172, 255)"}}
                        onClick={() => this.post()}>
                        Post
                    </button>
                </Grid>
            </div>


        );
    }
    post() {
        let data = {
            jobtitle: this.state.jobTitle,
            location: this.state.location,
            jobtype: this.state.type,
            salary: this.state.salary,
            logo: this.state.logo,
            description: this.state.description
        };
        Object.keys(this.state).forEach((key) => {
            if (this.state[key] == "") return;
        });
        https.post("api/corporate/createposting", data).then((response) => {
            this.setState({success: "Job has been successfully posted!"});
            setTimeout(() => {
                this.setState({success: null});
            }, 3000);
        });
    }
}

export default PostJob;