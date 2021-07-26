import React from 'react'
import "./Tasks.css"

function Tasks() {
    return (
        <div className="tasks">
            <p>Time to work!</p>
            <div className="task-header">
                <h2>Tasks</h2>
                <button><i class="fas fa-ellipsis-v"></i></button>
            </div>
            <div className="add-task">
                <i class="fas fa-plus-circle"></i> Add Task
            </div>
        </div>
    )
}

export default Tasks
