import React from "react";
import axios from "axios";
import Config from "./config";
import ToDoApp from "./ToDo/ToDoApp";
import LogIn from "./User/LogIn/LogIn";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task_list : [],
            authenticated: false,
        }
        this.authenticationHandler = this.authenticationHandler.bind(this);
        this.loadTaskData = this.loadTaskData.bind(this);
    }

    authenticationHandler(token) {
        console.log("appjs authentication handler");

        // save token to the localStorage
        localStorage.authToken = token;

        this.loadTaskData((newList) => {
            this.setState({
                task_list: newList,
                authenticated: true
            });
        });
        
    }

    loadTaskData(callback) {
        console.log("loading task data");
        axios.get(Config.domain + "/task", {headers: { Authorization: `Bearer ${localStorage.authToken}`} })
            .then(res => {
                const newList = res.data;
                console.log("data received");
                callback(newList);
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentWillMount() {
        this.loadTaskData((newList) => {
            this.setState({
                task_list: newList,
                authenticated: true
            });
        });
    }

    render() {
        console.log("Rendering App.js");

        let child = <LogIn jwt={this.state.jwt} onAuthentication={this.authenticationHandler}/>;
        if (this.state.authenticated) {
            child = <ToDoApp taskList={this.state.task_list}/>
        }

        return child;
    }
}