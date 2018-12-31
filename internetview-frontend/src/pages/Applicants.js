import React, { Component } from "react";
import {Grid} from "@material-ui/core";
import https from "../services/https";
import NavBar from "../components/NavBar";
import ApplicantListItem from "../components/ApplicantListItem";

class Applicants extends Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
    }
    render() {
        let ApplicantList = this.state.list.map((applicant, key) => {
            return <ApplicantListItem key={key} applicationId={applicant.applicationid} name={applicant.name}
                userId={applicant.userid} file={applicant.filename} salary={applicant.salary}
                position={applicant.title} location={applicant.location} status={applicant.accepted}
                file={applicant.filename}/>
        });

        return (
            <Grid direction="column" justify="center" alignItems="center">
                <NavBar />
                {ApplicantList}
            </Grid>


        );
    }
    componentDidMount() {
        https.get("/api/corporate/applications").then((response) => {
            let counter = 0;
            let list = [];
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].applications.length != 0) {
                    for (let j = 0; j < response.data[i].applications.length; j++) {
                        list.push({...response.data[i].applications[j],
                            salary: response.data[i].salary,
                            title: response.data[i].jobtitle,
                            location: response.data[i].location
                        });
                    }
                    counter++;
                }
            }
            for (let k = 0; k < counter; k++) {
                this.setState((state) => {
                    state.list = state.list.concat(list);
                    return state;
                });
            }
        });
    }
}

export default Applicants;