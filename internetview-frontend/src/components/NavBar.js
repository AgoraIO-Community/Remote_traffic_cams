import React, { Component } from "react";
import { browserHistory } from "react-router";
import jwtDecode from "jwt-decode";
import {IconButton, Drawer, Hidden, List, ListItem, Button, Grid} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import AboutIcon from "@material-ui/icons/QuestionAnswer";
import "../styles/App.css";

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {toggle: false, token: null};
    }
    render() {
        let MenuItems = null;
        let NavBarButtons = null;
        if (this.state.token == null) {
            MenuItems = (
                <List>
                    <ListItem button onClick={() => this.signup()}>
                        <HomeIcon style={{ fontSize: 50 }}/>
                        <div className="drawerItemText" >Sign Up</div>
                    </ListItem>
                    <ListItem button onClick={() => this.login()}>
                        <AboutIcon style={{ fontSize: 50 }}/>
                        <div className="drawerItemText">Log In</div>
                    </ListItem>
                </List>
            );
            NavBarButtons = (
                <div className="navBarButtonContainer">
                    <button className="navBarButton" onClick={() => this.signup()}>Sign Up</button>
                    <button className="navBarButton" onClick={() => this.login()}>Log In</button>
                </div>
            );
        } else {
            let payload = jwtDecode(this.state.token);
            if (payload.accountType == "user") {
                MenuItems = (
                    <List>
                        <ListItem button onClick={() => this.jobs()}>
                            <HomeIcon style={{ fontSize: 50 }}/>
                            <div className="drawerItemText" >Jobs</div>
                        </ListItem>
                        <ListItem button onClick={() => this.offers()}>
                            <AboutIcon style={{ fontSize: 50 }}/>
                            <div className="drawerItemText">Offers</div>
                        </ListItem>
                        <ListItem button onClick={() => this.logout()}>
                            <AboutIcon style={{ fontSize: 50 }}/>
                            <div className="drawerItemText">console.log();</div>
                        </ListItem>
                    </List>
                );
                NavBarButtons = (
                    <div className="navBarButtonContainer">
                        <button className="navBarButton" onClick={() => this.jobs()}>Jobs</button>
                        <button className="navBarButton" onClick={() => this.offers()}>Offers</button>
                        <button className="navBarButton" onClick={() => this.logout()}>Log Out</button>
                    </div>
                )
            } else {
                MenuItems = (
                    <List>
                        <ListItem button onClick={() => this.post()}>
                            <HomeIcon style={{ fontSize: 50 }}/>
                            <div className="drawerItemText" >Post</div>
                        </ListItem>
                        <ListItem button onClick={() => this.applicants()}>
                            <HomeIcon style={{ fontSize: 50 }}/>
                            <div className="drawerItemText" >Applicants</div>
                        </ListItem>
                        <ListItem button onClick={() => this.offers()}>
                            <AboutIcon style={{ fontSize: 50 }}/>
                            <div className="drawerItemText">Offers</div>
                        </ListItem>
                        <ListItem button onClick={() => this.logout()}>
                            <AboutIcon style={{ fontSize: 50 }}/>
                            <div className="drawerItemText">console.log();</div>
                        </ListItem>
                    </List>
                );
                NavBarButtons = (
                    <div className="navBarButtonContainer">
                        <button className="navBarButton" onClick={() => this.post()}>Post</button>
                        <button className="navBarButton" onClick={() => this.applicants()}>Applicants</button>
                        <button className="navBarButton" onClick={() => this.offers()}>Offers</button>
                        <button className="navBarButton" onClick={() => this.logout()}>Log Out</button>
                    </div>
                )
            }

        }

        return (
            <div className="navBar">
                <Drawer anchor="right" open={this.state.toggle} onClose={() => this.toggle(false)}>
                    <div tabIndex={0} role="button" onClose={() => this.toggle(false)}
                        onKeyDown={() => this.toggle(false)}>
                        {MenuItems}
                    </div>
                </Drawer>
                <Grid container>
                    <Grid item xs={8}>
                        <div className="logoAndBrandName">
                            <img src={require('../images/logo.png')} className="smallLogoImage" alt="Logo" />
                            <h1 className="bigBrandName">InternetView</h1>
                        </div>
                    </Grid>
                    <Grid item xs={4} dir="rtl">
                        <Hidden smDown>
                            {NavBarButtons}
                        </Hidden>
                        <Hidden mdUp>
                            <IconButton onClick={() => this.toggle()} style={{marginTop: 20}}>
                                <MenuIcon style={{ fontSize: 40 }}/>
                            </IconButton>
                        </Hidden>
                    </Grid>
                </Grid>
            </div>
        );

    }
    componentDidMount() {
        this.setState({token: localStorage.getItem("token")});
    }
    toggle (boolean) {
        if (boolean === undefined) this.setState({ toggle: !this.state.toggle});
        else this.setState({ toggle: boolean});
    }
    jobs() {
        browserHistory.push('/jobs');
    }
    post() {
        browserHistory.push('/post-job');
    }
    applicants() {
        browserHistory.push('/applicants');
    }
    offers() {
        browserHistory.push('/offers');
    }
    signup(){
        browserHistory.push('/signup');
    }
    login(){
        browserHistory.push('/login');
    }
    logout(){
        localStorage.removeItem("token");
        browserHistory.push('/');
    }
}

export default NavBar;