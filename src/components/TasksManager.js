import React from 'react';
import API from './Api';

class TasksManager extends React.Component {
    constructor(props) {
        super(props);
        this.api = new API('http://localhost:3005/tasks') 
        this.state = {
            input: '',
            tasks: []
        }
    }


    componentDidMount() {
        console.log('componentDidMount!');

        const promise = this.api.loadTasks();
        promise.then(data => {
            console.log(data, '<== data');

            this.setState({
                tasks: data,
            })
        })
        .catch(err => console.error(err));
    }

    onClick = () => {
        const { tasks } = this.state;
        console.log(tasks)
    }

    newTask = e => {
        e.preventDefault();
        const { input } = this.state;
        
        this.setState({
            tasks: [...this.state.tasks,
            {
                name: input,
                time: 0,
                isRunning: false,
                isDone: false,
                isRemoved: true,
            }
            ]
        })
    }

    addTaskForm() {
        return (
            <form>
                <input 
                    name="task" 
                    value={this.state.input} 
                    onChange={ e => this.setState({ input: e.target.value }) } 
                />
                <input type="submit" onClick={this.newTask} />
            </form>
        )
    }

    incrementTime = e => {
        console.log(this.state.tasks[0].isRunning)
        setInterval(() => {
            this.setState(state => {
                const newTasks = state.tasks.map(task => {
                        return {...task, time: task.time + 1, isRunning: "true"}
           
                });
                console.log(newTasks)
                return {
                    tasks: newTasks,
                }
            });
          }, 1000);       
    }

    
    
    
    

    renderTasks() {

        const taskList = this.state.tasks.map(t => {


            return (
                <>
                    <header>{t.name} {t.time}sec</header>
                    <footer>
                        <button onClick={this.incrementTime}>start/stop</button>
                        <button>zakończone</button>
                        <button disabled={true}>usuń</button>
                    </footer>
                </>

            )
        })
        return <section>{taskList}</section>

    }



    render() {
        return (
            <main>
                {this.addTaskForm()}
                <h1 onClick={this.onClick}>TasksManager</h1>
                {this.renderTasks()}
            </main>
        )
    }
}

export default TasksManager;