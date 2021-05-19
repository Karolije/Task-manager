export default class API {
   
    apiUrl = 'http://localhost:3005/tasks'

    loadTasks() {
        return fetch(this.apiUrl)
            .then(resp => {
                if(resp.ok) { return resp.json(); }
                return Promise.reject(resp);
            });
     
    } 
}

