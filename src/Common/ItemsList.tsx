import React from 'react';
import { TodoService } from '../Services/TodoService.ts';
import { TodoNote } from './TodoNote.tsx';

export class ItemsList extends React.Component {
    todoService = new TodoService();
    tasksIdList = [];

    constructor(props) {
        super(props);
        this.state = {
            Tasks: []
        }
        this.syncingDataWithDb = this.syncingDataWithDb.bind(this);
    }

    componentDidMount() {
        this.todoService.getTasks(this.props.serviceEnum)
            .then((res) => {
                res = res.data;
                if (res) {
                    this.tasksIdList = res.map((item) => {
                        return item.Id;
                    })
                    this.tasksIdList.sort((a, b) => { return a - b; });
                    this.setState({ Tasks: res });
                } else {
                    console.log("Request failed for" + this.props.title);
                }
            });
        //this.syncingDataWithDb();
    }

    // shouldComponentUpdate(nextProp, nextState) {
    //     let result = false;
    //     if (this.state.Tasks.join() != nextState.Tasks.join()) {
    //         result = true;
    //     }
    //     return result;
    // }

    syncingDataWithDb() {
        setInterval(() => {
            this.todoService.getTasks(this.props.serviceEnum)
                .then((res) => {
                    res = res.data;
                    if (res) {
                        this.tasksIdList = res.map((item) => {
                            return item.Id;
                        })
                        this.tasksIdList.sort((a, b) => { return a - b; });
                        this.setState({ Tasks: res });
                    } else {
                        console.log("Request failed for" + this.props.title);
                    }
                })
        }, 1000);
    }

    onDrop(event) {
        let id = event.dataTransfer.getData("Id");
        let status = this.props.serviceEnum;
        this.todoService.setCustomStatus(id, status);
    }

    onDragStart(event, Id) {
        event.dataTransfer.setData("Id", Id);
    }

    onDragOver(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="todo-itemlist"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e)}>
                <h3>{this.props.title}</h3>
                <div>
                    {
                        this.state.Tasks.sort((a, b) => { return b.Priority - a.Priority; }).map((item, pos) => {
                            return (
                                <TodoNote
                                    key={pos}
                                    data={item} editTask={(task) => this.props.editTask(task)}
                                    onDragStart={(event, Id) => this.onDragStart(event, Id)} 
                                    serviceEnum={this.props.serviceEnum} />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}