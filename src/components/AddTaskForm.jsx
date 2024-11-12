
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRef, useState } from 'react';


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
                    className="input p-2 rounded-lg w-full bg-gray-700 border-2 border-gray-700 focus:outline-none  focus:border-2 focus:border-primary"
                    value={task.name ? task.name : ''}
                    // onInput={(e) => setTask(e.target.value)}
                    onInput={(e) => setTask({...task, name : e.target.value})}
                    required
                    autoFocus
                    maxLength={60}
                    placeholder="Enter task name"
                />
                <button
                    aria-label="Add Task"
                    type="submit"
                    className="flex gap-2 items-center text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Add
                    <PlusIcon className="size-6 text-white" />
                </button>
            </div>
        </form>
    )
}

export default AddTaskForm

