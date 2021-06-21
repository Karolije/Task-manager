import React from 'react';
import API from './Api';
import styled from 'styled-components'


const Container = styled.div`
background: #6C8FA3;
margin: 0 auto;
max-width: 600px;
margin-top: 15px;
padding: 15px;
border-radius: 10px;
text-align: center

`

const Header = styled.header`

max-width: 600px;
margin-top: 15px;
padding: 15px;
border-radius: 10px;
text-align: center;
font-size: 1.4em;
color: #FF9FB2;
`

const Button = styled.button`
background-color: ${(props) => props.backgroundColor};
font-size: 0.9em;
width: 100%;
border: 0;
color: white;
justify-content: center;
padding: 5px 10px;
margin: 5px;
border-radius: 5px;

&:hover {
    background-color: #FBDCE2;
}

&:disabled {
    background-color:  #FBDCE2;
}
`


const Input = styled.input`

border: 0;
justify-content: center;
padding: 10px 30px;
margin: 0;
font-size: 0.7em;
color: #FF9FB2;
`

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

        this.incrementTime();
    }

    onClick = () => {
        const { tasks } = this.state;
    }

    newTask = e => {
        e.preventDefault();
        const { input } = this.state;
        

        const newTask = {
            name: input,
            time: 0,
            isRunning: false,
            isDone: false,
            isRemoved: false,
        }

        this.api.saveTask(newTask)
            .then(resp => {
                console.log(resp, '<== resp');
                this.setState({
                    tasks: [...this.state.tasks, resp],
                    input: '',
                  
                })
            });
    }

    addTaskForm() {
        return (
            <form>
                <Input 
                    name="task" 
                    value={this.state.input} 
                    onChange={ e => this.setState({ input: e.target.value }) } 
                />
                <Input type="submit" onClick={this.newTask} value="Add" />
            </form>
        )
    }

    incrementTime = () => {
        this.intervalId = setInterval(() => {
            this.setState(state => {
                const newTasks = state.tasks.map(task => {
                    if(task.isRunning) {
                        const newTask = {...task, time: task.time + 1}

                        // zapisanie do API
                        this.api.updateTask(newTask)
              
          
 
               
        

                        return newTask;
                    }

                    return task;
           
                });

                return {
                    tasks: newTasks,
                }
            });
          }, 1000);       
    }


    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    
    handleClickStartStop = (taskId) => {
        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if(task.id === taskId) {
                    return {...task, isRunning: !task.isRunning}
                }

                return {...task, isRunning: false}
            });

            return {
                tasks: newTasks,
            }
        });
    }
    
    handleClickEnded = (taskId) => {
        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if(task.id === taskId) {
                    return {...task, isDone: !task.isRunning}
                }

                return {...task}
            });

            return {
                tasks: newTasks,
            }
        });
    }

    handleClickRemove = (taskId) => {

        // const task = {...this.state.find(item => item.id === taskId)};
        // task.isRemoved = true;
        // this.api.updateTask(copyTask)
        // .then(() => /* setState */)
        // .catch(err => );


        this.setState(state => {
            const newTasks = state.tasks.map(task => {
                if(task.id === taskId) {
                    // this.api.removeTask(task.id);

                    const copyTask = {...task, isRemoved: !task.isRemoved};
                    this.api.updateTask(copyTask)
                    return copyTask;

                }

                return {...task}
            });

            console.log(newTasks, 'remove');
            return {
                tasks: newTasks,
            }
        });
    }
    
    

    renderTasks() {

        const taskList = this.state.tasks.map(t => {
            if(t.isRemoved) {
                return null;
            }

            return (
                <Container>
                    <header>{t.name} {t.time}sec</header>
                    <footer>
                        <Button backgroundColor="#B0E0E6" disabled={t.isDone} onClick={e => this.handleClickStartStop(t.id) }>{t.isRunning ? 'stop' : 'start'}</Button>
                        <Button  backgroundColor="#B0E0E6" disabled={t.isDone} onClick={e => this.handleClickEnded(t.id)}>zakończone</Button>
                        <Button onClick={e => this.handleClickRemove(t.id)} backgroundColor="#B0E0E6">usuń</Button>
                    </footer>
                </Container>

            )
        })
        return <section>{taskList}</section>

    }



    render() {
        return (
            <main>
                <Header>
                    <h1 onClick={this.onClick}>TasksManager</h1>
                    {this.addTaskForm()}
                </Header>
                {this.renderTasks()}
            </main>
        )
    }
}

export default TasksManager;