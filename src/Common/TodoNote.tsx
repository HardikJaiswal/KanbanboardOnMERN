import React from 'react';
import { TodoService } from '../Services/TodoService.ts';

export class TodoNote extends React.Component {
    service = new TodoService();
    constructor(props) {
        super(props);
    }
    GetBackgroundColor() {
        switch (this.props.serviceEnum) {
            case 0: return '#ffa50057';
            case 1: return '#f080804f';
            case 2: return '#7fffd466';
            case 3: return 'beige';
            default: return 'white';
        }
    }

    GetBorder() {
        switch (this.props.data.Priority) {
            case 0: return '5px solid lightgreen';
            case 1: return '5px solid yellow';
            case 2: return '5px solid red';
        }
    }

    DeleteTodoItem() {
        let proceed = window.confirm('This task will be deleted. Proceed?');
        if (proceed) {
            this.service.deleteTask(this.props.data._id)
                .then(res => {
                    if (res.status == 200) alert("Task Deleted");
                    else console.log(res);
                });
        }
    }

    EditTodoItem() {
        this.props.editTask(this.props.data);
    }

    GetRemainingDays() {
        let currentDate = new Date();
        let finishingDate = new Date(this.props.data.ExpectedCompletion);
        return Math.ceil((finishingDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
    }

    render() {
        let daysLeft = this.GetRemainingDays();
        const showNotification = () => {
            if (Notification.permission === 'granted') {
                let InfoTitle, InfoBody,isNotificationRequired = false;
                if (daysLeft === 0) {
                    InfoTitle = "Today is last day to complete task";
                    InfoBody = `Your task of Objective: ${this.props.data.Title} is expiring today. Hurry up!!!`
                    isNotificationRequired = true;
                }
                //Here a condition for task completed is also checked
                else if (daysLeft < 0 && this.props.serviceEnum != 3) {
                    InfoTitle = "Task has expired";
                    InfoBody = `Your task of Objective: ${this.props.data.Title} has expired.\nPlease update to new target date.`
                    isNotificationRequired = true;
                }
                if (isNotificationRequired) {
                    let notification = new Notification(InfoTitle, {
                        body: InfoBody
                    })
                }
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
        };

        if (Notification.permission === 'granted') showNotification();
        return (
            <>
            <div style={{ backgroundColor: this.GetBackgroundColor(), border: this.GetBorder() }}
                className="todo-item"
                onDragStart={(e) => this.props.onDragStart(e,this.props.data._id) }
                draggable>
                <div>
                    <div>
                        <b>{this.props.data.Title}</b><br/>
                        {this.props.data.Description}
                    </div>
                    <div>
                        <label>Expected Completion Date: </label>
                        {this.props.data.ExpectedCompletion.substring(0, 10)}<br />
                        {daysLeft === 0 ?
                            <b>Task Due Today</b> :
                            daysLeft < 0 ?
                                <b>Task Has Expired</b> :
                                <span>Time Remaining <b>{daysLeft} days</b></span>}
                    </div>
                </div>
                <div className="overlay">
                    <button className="btn primary" onClick={() => this.EditTodoItem()}> Edit </button>
                    <button className="btn critical" onClick={() => this.DeleteTodoItem()}> Delete </button>
                </div>
            </div><br/></>
        );
    }
}
