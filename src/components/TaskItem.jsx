import React from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteIcon from '@material-ui/icons/Delete';

function TaskItem(props) {
    const {tasks, task, setTasks} = props
    const deleteCheck = (e) => {
        const item = e.target.parentElement.parentElement
        const task = item.parentElement
        const text = task.children[0].children[1].innerText
        const newTasks = tasks.filter(task => task !== text)
        localStorage.setItem('tasks', JSON.stringify(newTasks))
        setTasks(newTasks)

    }

    const completeCheck = e => {
        console.log(e.target.parentElement.parentElement.parentElement)
        if(e.target.parentElement.parentElement.parentElement.classList.contains('task-div')){
            e.target.parentElement.parentElement.parentElement.classList.toggle("completed")
        }else{
            e.target.parentElement.parentElement.parentElement.parentElement.classList.toggle("completed")
        }
    }

    
    return (
        <div className="task-div">
            <div className="comp-task">
                <button className='completed-btn' onClick={completeCheck}><CheckCircleIcon style={{color: 'rgb(196, 196, 196)'}}/></button>
                <p>{task}</p>
            </div>
            <button className='trash-btn' onClick={deleteCheck}><DeleteIcon style={{color: 'rgb(196, 196, 196)'}}/></button>
        </div>
    )
}

export default TaskItem
