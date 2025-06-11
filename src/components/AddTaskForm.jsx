
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';
import PrimaryButton from './UI/PrimaryButton';


const AddTaskForm = ({addTask, addTaskFormRef}) => {

    const [task, setTask] = useState({});

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addTask({
            name: task.name,
            description: "",
            checked: false,
            id: Date.now()
        })
        setTask({})
    }


    return (
        <form
            className="w-full"
            onSubmit={handleFormSubmit}
            ref={addTaskFormRef}
        >
            <div className="wrapper flex items-center gap-2">
                <label
                    htmlFor="addTaskName"
                    className="label"
                    hidden
                >Enter Task</label>
                <input
                    type="text"
                    id="addTaskName"
                    className="input p-2 rounded-lg w-full bg-dark1-700 border-2 border-dark1-700 focus:outline-none  focus:border-2 focus:border-primary"
                    value={task.name ? task.name : ''}
                    // onInput={(e) => setTask(e.target.value)}
                    onInput={(e) => setTask({...task, name : e.target.value})}
                    required
                    autoFocus
                    maxLength={60}
                    placeholder="Enter task name"
                />
                <PrimaryButton
                    aria-label="Add Task"
                    type="submit">
                    Add
                    <PlusIcon className="size-6 text-white" />
                </PrimaryButton>
            </div>
        </form>
    )
}

export default AddTaskForm

