import React from 'react';
import API from './Api';
import data from '../../db/data.json'

class TasksManager extends React.Component {
    constructor(props) {
        super(props);
        // api = new API('http://localhost:3005/tasks') 
        this.state = {

            tasks: [
                {
                    name: 'Task 1',
                    time: 0,
                    isRunning: false,
                    isDone: false,
                    isRemoved: true,
                },
                {
                    name: 'Task 2',
                    time: 0,
                    isRunning: false,
                    isDone: false,
                    isRemoved: true,
                }
            ]
        }
    }
    onClick = () => {
        const { tasks } = this.state;
        console.log(tasks)
    }

    newTask = e => {
        e.preventDefault();
        const { name } = this.state.tasks;
        this.addTask(`${name}`);
        this.setState({
            tasks: [...this.state.tasks,
            {
                name: e.target.parentElement.firstElementChild.value,
                time: 0,
                isRunning: false,
                isDone: false,
                isRemoved: true,
            }
            ]
        })
    }

    addTask(name) {
        console.log(this.state)
        this.setState({
            tasks: [...this.state.tasks, name]
        })
    }

    addTaskForm() {
        return (
            <form>
                <input name="task" />
                <input type="submit" onClick={this.newTask} />
            </form>
        )
    }

    startStopTime = e => {
        e.preventDefault();
        console.log(this.state.tasks)
    }


    renderTasks() {

        const taskList = this.state.tasks.map(t => {


            return (
                <>
                    <header>{t.name} {t.time}sec</header>
                    <footer>
                        <button onClick={this.startStopTime}>start/stop</button>
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