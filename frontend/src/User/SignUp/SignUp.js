import React from "react";
import axios from "axios";
import "./SignUp.css";

import Config from "../../config";

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        
        this.username = React.createRef();
        this.pwd = React.createRef();
        this.confirmPwd = React.createRef();

        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(event) {
        // prevent default submit behaviour
        event.preventDefault();

        let username = this.username.current.value;
        let pwd = this.pwd.current.value.trim();
        let confirmPwd = this.confirmPwd.current.value.trim();

        // empty form value and rerender
        this.username.current.value = "";
        this.setState();


        if (pwd != "" && pwd === confirmPwd) {
            console.log("password match");

            axios.post(Config.domain + "/user/signup", {
                username: username,
                password: pwd
            }, {headers: { Authorization: `Bearer ${localStorage.authToken}`} })
                .then((res) => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });

            return;
        }
        
        console.log("password error");
    }

    render() {
        return (
            <form className="signup-form" onSubmit={this.submitHandler}>
                <div className="signup-img-container">
                </div>
                <div className="signup-container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" ref={this.username} required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" ref={this.pwd} required />
                        
                    <label for="psw-confirm"><b>Confirm Password</b></label>
                    <input type="password" placeholder="Confirm Password" name="psw-confirm" ref={this.confirmPwd} required />

                    <button type="submit" className="signup-btn">Sign Up</button>
                </div>
            </form>
        );
    }
}