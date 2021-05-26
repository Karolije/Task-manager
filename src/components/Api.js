export default class API {
   
    apiUrl = 'http://localhost:3005/tasks'

    loadTasks() {
        return fetch(this.apiUrl)
            .then(resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp);
            });
     
    } 

    saveTask(task) {
        return fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
            .then(resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp);
            });
    }
}

