import React, { Component } from "react";
import { browserHistory } from "react-router";
import {Grid, Select, MenuItem} from "@material-ui/core";
import https from "../services/https";
import NavBar from "../components/NavBar";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/App.css";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", confirmPassword: "", name: "", type: "user", error: null};
    }
    render() {
        return (
            <div className="container">
                <NavBar />
                <ErrorMessage message={this.state.error} />
                <Grid container direction="column" justify="center" alignItems="center">
                    <input value={this.state.email} className="textInput"
                    onChange={(event) => this.setState({email: event.target.value})}
                    placeholder="Email" autoFocus={true} />
                    <input value={this.state.name} className="textInput"
                    onChange={(event) => this.setState({name: event.target.value})}
                    placeholder="Name or Company" autoFocus={true} />
                    <input type="password" value={this.state.password} className="textInput"
                    onChange={(event) => this.setState({password: event.target.value})}
                    placeholder="Password" autoFocus={true} />
                    <input type="password" value={this.state.confirmPassword} className="textInput"
                    onChange={(event) => this.setState({confirmPassword: event.target.value})}
                    placeholder="Confirm Password" autoFocus={true} />
                    <Grid container direction="row" justify="center" alignItems="center">
                        <div style={{fontSize: 32, marginRight: 20, marginTop: 30}}>Account Type:</div>
                        <Select className="selectInput" value={this.state.type}
                        onChange={(event) => this.setState({type: event.target.value})}>
                            <MenuItem value="user">
                              <div style={{fontSize: 32}}>User</div>
                            </MenuItem>
                            <MenuItem value="corporate">
                              <div style={{fontSize: 32}}>Corporate</div>
                            </MenuItem>
                        </Select>
                    </Grid>
                    <button style={{borderRadius: 10, height: 80, width: 400, fontSize: 32, marginTop: 60, backgroundColor: "rgb(40, 172, 255)"}}
                        onClick={() => this.signup()}>
                        Sign Up
                    </button>
                </Grid>
            </div>
        );
    }
    signup() {
        let data
        if (this.state.type == "user") {
            data = {
                email: this.state.email,
                name: this.state.name,
                password: this.state.password,
                accountType: this.state.type
            };
        } else {
            data = {
                email: this.state.email,
                company: this.state.name,
                password: this.state.password,
                accountType: this.state.type
            };
        }

        if (this.state.email != "" && this.state.name != "" && this.state.password == this.state.confirmPassword && this.state.password != "") {
            https.post("/auth/register", data).then((response) => {
                browserHistory.push('/login');
            }).catch((error) => {
                this.setState({error: "Sign up failed"});
                setTimeout(() => {
                    this.setState({error: null});
                }, 1000);
            });
        }
    }
}

export default Signup;