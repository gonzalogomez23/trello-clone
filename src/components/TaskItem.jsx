import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import EditTaskModal from './EditTaskModal'

// Styles
import styles from './TaskItem.module.css'
import { useState } from "react";

const TaskItem = ({task, updateTasks, deleteTask}) => {
    
    const [isEditing, setIsEditing] = useState(false)
    const [editedTask, setEditedTask] = useState(null)

    const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: task.id})

    const style = {
        transform: CSS.Translate.toString(transform),
        transition,
    };

    const enterEditMode = (task) => {
        setEditedTask(task);
        setIsEditing(true)
    }

    const closeEditMode = () => {
        setIsEditing(false)
    }


    return (
        <li className="max-w-full">
            <a
                href="#"
                className={`flex items-center justify-between bg-dark1-700 hover:bg-dark1-600 transition-colors rounded-lg touch-none gap-4 p-3 pe-5 ${styles.task} ${styles[`task-${task.priority}`]} ${isDragging && 'shadow-lg z-40'}`}
                onClick={() => enterEditMode(task)}  ref={setNodeRef} style={style} {...attributes} {...listeners}
            >
                <p>{task.name}</p>
            </a>
            { isEditing && (
                <EditTaskModal
                    editedTask={editedTask}
                    updateTasks={updateTasks}
                    deleteTask={deleteTask}
                    closeEditMode={closeEditMode}
                />
            )}
        </li>
    )
}

export default TaskItem
