import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import {Grid} from "@material-ui/core";
import https from "../services/https";
import NavBar from "../components/NavBar";
import OfferListItem from "../components/OfferListItem";

class Offers extends Component {
    constructor(props) {
        super(props);
        this.state = {list: []};
    }
    render() {
        let OfferList = this.state.list.map((offer, key) => {
            return <OfferListItem key={key} company={offer.companyname} position={offer.jobtitle}
                location={offer.location} meetingTime={offer.meetingtime} userStatus={offer.confirmed}
                corporateStatus={offer.accepted} applicationId = {offer.applicationid}/>
        });
        return (
            <div className="container">
                <NavBar />
                {OfferList}
            </div>

        );
    }
    componentDidMount() {
        let token = localStorage.getItem("token");
        if (token != null && jwtDecode(token).accountType == "user") {
            https.get("/api/user/applications").then((response) => {
		        if ( response.data.length == 0) return;
                let list = [];
                for (let i = 0; i < response.data[0].length; i++) {
                    let temp = response.data[0][i].post;
                    delete response.data[0][i].post;
                    list.push({...response.data[0][i], ...temp});
                }
		        for (let i = 0; i < list.length; i++) {
                    this.setState((state) => {
                        state.list = state.list.concat(list);
                        return state;
                    });
                }
            });
        } else {
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

}

export default Offers;
