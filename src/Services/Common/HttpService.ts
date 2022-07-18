import axios from 'axios';

export class HttpService {

    getData(url: string): Promise<any> {
        return axios.get(url);
    }

    postData(url: string, entity: object): Promise<any> {
        return axios.post(url, entity);
    }

    patchData(url: string): Promise<any> {
        return axios.patch(url);
    }

    deleteData(url: string): Promise<any> {
        return axios.delete(url);
    }

}