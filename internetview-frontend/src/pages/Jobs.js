import React, { Component } from "react";
import {Grid} from "@material-ui/core";
import https from "../services/https";
import NavBar from "../components/NavBar";
import JobListItem from "../components/JobListItem";

class Jobs extends Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
    }
    render() {
        let JobList = this.state.list.map((job, key) => {
            return <JobListItem key={key} id={job.postid} jobTitle={job.jobtitle} salary={job.salary} posted={job.datecreated.substring(0, job.datecreated.indexOf(","))}
                companyName={job.companyname} time={job.jobtype} location={job.location} logo={job.logo}
                description={job.description} />
        });
        return (
            <Grid direction="column" justify="center" alignItems="center" style={{flex: 0.8}}>
                <NavBar />
                {JobList}
            </Grid>


        );
    }
    componentDidMount(){
        https.get("/api/user/postings").then((response) => {
            console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                this.setState((state) => {
                    state.list = state.list.concat(response.data[i]);
                    return state;
                });
            }
        });
    }
}

export default Jobs;
