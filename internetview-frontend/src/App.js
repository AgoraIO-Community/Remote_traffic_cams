import React, { Component } from "react";
import { Router, Route, browserHistory} from "react-router";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Applicants from "./pages/Applicants";
import Jobs from "./pages/Jobs";
import Offers from "./pages/Offers";
import Interview from "./pages/Interview";
import PostJob from "./pages/PostJob";

class App extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/" component={Home}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/applicants" component={Applicants}></Route>
                <Route path="/jobs" component={Jobs}></Route>
                <Route path="/offers" component={Offers}></Route>
                <Route path="/interview" component={Interview}></Route>
                <Route path="/post-job" component={PostJob}></Route>
            </Router>
        );
    }
}

export default App;