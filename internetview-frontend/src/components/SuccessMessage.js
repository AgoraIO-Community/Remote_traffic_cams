import React, { Component } from "react";
import "../styles/App.css";

class SuccessMessage extends Component {
    render() {
        if (this.props.message == null) {
            return (<div></div>);
        } else {
            return (
                <div className = "message" style={{background: "rgb(0, 224, 7)"}}>
                    <div style={{marginTop: 12}}>{this.props.message}</div>
                </div>
            );
        }
    }
}

export default SuccessMessage;