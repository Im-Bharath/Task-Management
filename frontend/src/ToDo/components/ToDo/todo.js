import React from "react";
import ListItem from '../shared-components/ListItem/ListItem';
import AddItem from "./AddItem";
import './todo.css';




class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.createListItem = this.createListItem.bind(this);
    }

    createListItem() {
        this.props.newTaskHandler("Add description");
    }

    render() {
        console.log("todo: " + this.props.task_list);
        return (
            <div className='toDo'>
                <div className="toDo-header">
                    <h3>Tasks</h3>
                </div>
                <ul className="toDo-list">
                    {this.props.task_list.map((item) => {
                        return <ListItem description={item.description} key={"todo_"+ item._id}  id={item._id} checkedState={null} onDescpChange={this.props.onDescpChange} clickHandler={null}/>
                    })}
                    
                    <AddItem clickHandler={this.createListItem}/>
                </ul>
                
            </div>
        );
    }
}

export default ToDo;