import React,{Component} from 'react';
import { ItemsList } from '../Common/ItemsList.tsx';
import { PopupForm } from '../PopupForm/PopupForm.tsx';
import { TodoService } from '../Services/TodoService.ts';

export class Dashboard extends Component {
    services = {
        todo: 0,
        inProgress: 1,
        markedForReview: 2,
        completed: 3,
    };
    formFields = {
        'Title': '',
        'Description': '',
        'ExpectedCompletion': '',
        'Status': 0,
        'Priority': 0
    };
    todoServie = new TodoService();

    constructor(props) {
        super(props);
        this.state = {
            displayForm: false,
            curUser: null
        }
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
        this.openForm = this.openForm.bind(this);
        this.closeForm = this.closeForm.bind(this);
        this.createTask = this.createTask.bind(this);
    }

    createTask(event) {
        event.preventDefault();
        if (this.state.curUser) {
            this.todoServie.updateTask(this.formFields);
        }
        else {
            this.todoServie.createNewTask(this.formFields)
            .then((res) => {
                res = res.data;
                if (res) {
                    alert("New task created");
                    this.closeForm();
                } else {
                    alert("Some error occured");
                }
            });
        }
    }

    resetFields() {
        this.formFields = {
            'Title': '',
            'Description': '',
            'ExpectedCompletion': '',
            'Status': 0,
            'Priority': 0
        };
    }

    editTask(task: object) {
        this.formFields = {
            'Title': task.Title,
            'Description': task.Description,
            'ExpectedCompletion': task.ExpectedCompletion,
            'Status': task.Status,
            'Priority': task.Priority
        }
        this.setState({ curUser: task });
        this.openForm();
    }

    closeForm() {
        this.resetFields();
        this.setState({ displayForm: false });
        this.setState({ curUser: null });
    }

    openForm(){
        this.setState({ displayForm: true });
    }

    setField(name: string, value: object) {
        this.formFields[name] = value;
    }


    render() {
        return (
            <div>
                <div style={{ padding:"1%" }}>
                    <div className="header">
                        <b>KanBan Board</b>
                        <button className="btn primary" onClick={() => this.openForm()}>Add Task</button>
                    </div>
                    <div className="dashboard">
                        <ItemsList title="ToDo"
                            serviceEnum={this.services.todo}
                            editTask={(task) => this.editTask(task)} />
                        <ItemsList title="In Progress"
                            serviceEnum={this.services.inProgress}
                            editTask={(task) => this.editTask(task)} />
                        <ItemsList title="Review"
                            serviceEnum={this.services.markedForReview}
                            editTask={(task) => this.editTask(task)} />
                        <ItemsList title="Completed"
                            serviceEnum={this.services.completed}
                            editTask={(task) => this.editTask(task)} />
                    </div>
                </div>
                {this.state.displayForm ?
                    <PopupForm updateFormParameters={(name, value) => this.setField(name, value)} userInfo={this.state.curUser}
                        closeForm={() => this.closeForm()} createTask={(event) =>this.createTask(event)} />
                    : null}
            </div>
        );
    }
}