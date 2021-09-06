import React, { useState, useEffect, useRef } from 'react'
import "./css/Tasks.css"
import TaskItem from './TaskItem';

function Tasks() {
    const inputRef = useRef()
    const [isTaskTabOpen, setIsTaskTabOpen] = useState(false)
    const [taskValue, setTaskValue] = useState("")
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks()
    }, [])
    
    const changeTask = () => {
        setTaskValue(inputRef.current.value)
    }

    const getTasks = () => {
        if(localStorage.getItem('tasks') === null){
            setTasks([])
        }
        else{
            setTasks(JSON.parse(localStorage.getItem('tasks')))
        }
    }

    const taskAdd = (task) => {
        if(task){
            localStorage.setItem('tasks', JSON.stringify([...tasks, task]))
            setTasks([...tasks, task])
            setTaskValue('')
            setIsTaskTabOpen(false)
            console.log(localStorage.getItem('tasks'))
        }
        else{
            alert("please type something...")
        }
        
    }


    return (
        <div className="tasks">
            <p>Time to work!</p>
            <div className="task-header">
                <h2>Tasks</h2>
            </div>
            <div className="task-main">
                {tasks.map(task => {
                    return <TaskItem task={task} tasks={tasks} setTasks={setTasks}/>
                })}
            </div>
            {isTaskTabOpen ? (
                <form className="working-on">
                    <div className="task-input">
                        <input ref={inputRef} type="text" value={taskValue} placeholder="What are you working on?" onChange={changeTask}/>
                    </div>
                    <div className="task-footer">
                        <button type="button" className="cancel-btn" onClick={() => setIsTaskTabOpen(false)}>Cancel</button>
                        <button type="submit"  className="save-btn" onClick={() => taskAdd(inputRef.current.value)}>Save</button>
                    </div>
                </form>
            ): (
                <div className="add-task" onClick={() => setIsTaskTabOpen(true)}>
                    <i className="fas fa-plus-circle"></i> Add Task
                </div>

            )}
        </div> 
    )
}

export default Tasks
