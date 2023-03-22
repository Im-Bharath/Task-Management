import React from "react";
import SignUp from "./SignUp/SignUp";
import LogIn from "./LogIn/LogIn";

export default class User extends React.Component {

    render() {

        const container = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            background: "#d3d3d3",
        };

        return (
            <div style={container}>
                <LogIn />

            </div>
        );
    }
}