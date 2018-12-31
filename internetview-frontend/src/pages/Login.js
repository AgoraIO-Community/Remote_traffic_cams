import React, { Component } from "react";
import {Grid, Select, MenuItem} from "@material-ui/core";
import { browserHistory } from "react-router";
import https from "../services/https";
import NavBar from "../components/NavBar";
import ErrorMessage from "../components/ErrorMessage";
import "../styles/App.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: "", password: "", type: "user", error: null};
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
                    <input type="password" value={this.state.password} className="textInput"
                    onChange={(event) => this.setState({password: event.target.value})}
                    placeholder="Password" />
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
                        onClick={() => this.login()}>
                        Log In
                    </button>
                </Grid>
            </div>


        );
    }
    login() {
        let data = {
            email: this.state.email,
            password: this.state.password
        };
        if (this.state.email != "" && this.state.password != "") {
            if (this.state.type == "user") {
                https.post("/auth/login/user", data).then((response) => {
                    localStorage.setItem("token", JSON.stringify(response.data));
                    browserHistory.push('/jobs');
                }).catch((error) => {
                    this.setState({error: "Log in failed"});
                    setTimeout(() => {
                        this.setState({error: null});
                    }, 1000);
                });
            }
            else {
                https.post("/auth/login/corporate", data).then((response) => {
                    console.log(response.data);
                    localStorage.setItem("token", JSON.stringify(response.data));
                    browserHistory.push('/applicants');
                }).catch((error) => {
                    this.setState({error: "Log in failed"});
                    setTimeout(() => {
                        this.setState({error: null});
                    }, 1000);
                });
            }

        }
    }
}

export default Login;