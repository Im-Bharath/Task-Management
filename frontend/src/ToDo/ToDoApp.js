import React from 'react';
import ToDo from './components/ToDo/todo';
import Doing from './components/Doing/doing';
import Done from './components/Done/done';
import './ToDoApp.css';

import axios from "axios";
import Config from "../config";

class ToDoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            task_list: []
        };
        console.log("todoapp constructor called");

        this.newTaskHandler = this.newTaskHandler.bind(this);
        this.taskClearHandler = this.taskClearHandler.bind(this);
        this.taskCompleteHandler = this.taskCompleteHandler.bind(this);
        this.onDescpChange = this.onDescpChange.bind(this);
    }

    newTaskHandler(descp) {
        
        axios.post(Config.domain + "/task/", {
            description: descp,
            finished: false
        }, {headers: { Authorization: `Bearer ${localStorage.authToken}`} })
        .then((res) => {
            // update the state
            this.setState(prevState => {
                return {
                    task_list: prevState.task_list.concat({
                        _id: res.data.id,
                        description: descp,
                        finished: false
                    })
                };
            });
        })
        .catch(err => console.log(err));
    }

    taskCompleteHandler(id) {
        let finish = null;

        this.setState(prevState => ({
            task_list: prevState.task_list.map(item => {
                if (item._id === id) {
                    item.finished = !item.finished;
                    finish = item.finished;
                }
                return item;
            })
        }), () => {
            if (finish !== null) {
                axios.put(Config.domain + "/task/" + id, {
                    finished: finish
                }, {headers: { Authorization: `Bearer ${localStorage.authToken}`} })
                .then(res => console.log(res))
                .catch(err => console.log(err));
            }
        });

    }

    taskClearHandler(id) {

        axios.delete(Config.domain + "/task/" + id, {headers: { Authorization: `Bearer ${localStorage.authToken}`} })
            .then(() => {
                // after the task is deleted we need to rerender the whole list
                this.setState(prevState => ({
                    task_list: prevState.task_list.filter(item => item._id !== id)
                }));
            })
            .catch(err => console.log(err));
    }

    onDescpChange(id, new_descp) {
        this.setState(prevState => ({
            task_list: prevState.task_list.map(item => {
                if (item._id === id)
                    item.description = new_descp;
                return item;
            })
        }));

        axios.put(Config.domain + "/task/" + id, {
            description: new_descp
        }, {headers: { Authorization: `Bearer ${localStorage.authToken}`} })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    render() {
        // if task list is empty that means the response from databases
        // hasn't been received yet
        // after the response, UI will be rerendered
        if (this.state.task_list.length === 0)
            this.state.task_list = this.props.taskList;
        console.log("todoapp state: ", this.state.task_list);

        return (
            <div className="toDoApp">
                <ToDo task_list={this.state.task_list} newTaskHandler={this.newTaskHandler} onDescpChange={this.onDescpChange}/>
                <Doing task_list={this.state.task_list} taskCompleteHandler={this.taskCompleteHandler} onDescpChange={this.onDescpChange}/>
                <Done task_list={this.state.task_list} taskClearHandler={this.taskClearHandler} onDescpChange={this.onDescpChange}/>
            </div>
        );
    }
}


export default ToDoApp;