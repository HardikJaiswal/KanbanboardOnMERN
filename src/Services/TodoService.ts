import { HttpService } from './Common/HttpService.ts'

export class TodoService {
    httpservice = new HttpService();

    getTasks(serviceOption: number) {
        switch (serviceOption) {
            case 0: return this.httpservice.getData('http://localhost:8080/api/taskservice/gettodotasks')
            case 1: return this.httpservice.getData('http://localhost:8080/api/taskservice/getinprogresstasks')
            case 2: return this.httpservice.getData('http://localhost:8080/api/taskservice/getmarkedforreviewtasks')
            case 3: return this.httpservice.getData('http://localhost:8080/api/taskservice/getdonetasks')
        }
    }
    updateTask(task: object) {
        return this.httpservice.postData('http://localhost:8080/api/taskservice/updatetask', task);
    }
    setCustomStatus(Id: string, newStatus: number) {
        return this.httpservice.patchData(`http://localhost:8080/api/taskservice/setstatus?id=${Id}&status=${newStatus}`);
    }
    createNewTask(task: object) {
        return this.httpservice.postData('http://localhost:8080/api/taskservice', task);
    }
    deleteTask(id: number) {
        return this.httpservice.deleteData(`http://localhost:8080/api/taskservice?id=${id}`);
    }
}