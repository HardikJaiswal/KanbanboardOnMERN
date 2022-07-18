import React from 'react';

export class PopupForm extends React.Component{

    InitialFormInfo = {
        'Title': '',
        'Description': '',
        'ExpectedCompletion': '',
        'Status': 0,
        'Priority': 0
    }

    constructor(props) {
        super(props);
        if (props.userInfo) {
            let task = props.userInfo;
            this.InitialFormInfo = {
                'Title': task.Title,
                'Description': task.Description,
                'ExpectedCompletion': task.ExpectedCompletion,
                'Status': task.Status,
                'Priority': task.Priority
            }
        }
        this.state = {
            userInfo: this.InitialFormInfo
        }
    }

    updateField = (event) => {
        let updatedForm = this.state.userInfo;
        updatedForm[event.target.name] = event.target.value;
        this.props.updateFormParameters(event.target.name, event.target.value);
        this.setState({ userInfo: updatedForm });
    }

    render() {
        return (
            <div className="popup-container">
                <form className="popup-form">
                    <div>
                        <label>Objective Name </label><br />
                        <input name="Title" type="text"
                            value={this.state.userInfo.Title} onChange={this.updateField} required />
                    </div>
                    <div>
                        <label>Description </label><br />
                        <textarea rows={2} name="Description"
                            value={this.state.userInfo.Description} onChange={this.updateField}></textarea>
                    </div>
                    <div>
                        <label>Deadline </label><br />
                        <input name="ExpectedCompletion" type="date"
                            value={this.state.userInfo.ExpectedCompletion.substring(0,10)} onChange={this.updateField} required />
                    </div>
                    <div>
                        <label>Priority</label><br />
                        <select name="Priority"
                            value={this.state.userInfo.Priority} onChange={this.updateField} required>
                            <option value={0}>Low</option>
                            <option value={1}>Medium</option>
                            <option value={2}>High</option>
                        </select>
                    </div>
                    <div>
                        <button className="btn primary" type="submit" onClick={(event) => this.props.createTask(event)}>
                            {this.props.userInfo != undefined ? 'Save' : 'Create'}
                        </button>
                        <button className="btn critical" onClick={() => this.props.closeForm()}>Close</button>
                    </div>
                </form>
            </div>
        );
    }
}