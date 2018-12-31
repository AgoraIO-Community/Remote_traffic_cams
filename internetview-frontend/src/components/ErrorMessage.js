import React, { Component } from "react";
import "../styles/App.css";

class ErrorMessage extends Component {
    render() {
        if (this.props.message == null) {
            return (<div></div>);
        } else {
            return (
                <div className = "message" style={{background: "rgb(255, 20, 20)"}}>
                    <div style={{marginTop: 12}}>{this.props.message}</div>
                </div>
            );
        }
    }
}

export default ErrorMessage;