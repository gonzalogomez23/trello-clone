import { useState } from "react";
import { PencilSquareIcon, CheckIcon } from "@heroicons/react/24/outline";

const TaskNameGroup = ({editedTask, updateTasks}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [updatedTaskName, setUpdatedTaskName] = useState(editedTask.name)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        editedTask.name = updatedTaskName
        updateTasks({...editedTask, name: updatedTaskName})
        setIsEditing(false)
    }

    return (
        <div>
            {isEditing 
                ? (
                    <form
                        className="wrapper flex items-center gap-2"
                        onSubmit={handleFormSubmit}
                    >
                        <label
                            htmlFor="editTaskName"
                            className="label"
                            hidden
                        >Enter Task Name</label>
                        <input
                            type="text"
                            id="editTaskName"
                            className="input p-2 rounded-lg w-full bg-gray-700 border-2 border-gray-700 focus:outline-none  focus:border-2 focus:border-primary"
                            value={updatedTaskName}
                            onInput={(e) => setUpdatedTaskName(e.target.value)}
                            required
                            autoFocus
                            maxLength={60}
                            placeholder="Update task"
                        />
                        <button
                            aria-label={`Confirm edited task to now read ${updatedTaskName}`}
                            type="submit"
                            className="flex gap-2 items-center text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Confirm
                            <CheckIcon className="size-6 text-white" />
                        </button>
                    </form>
                )
                : (
                    <div
                        className="group flex items-center justify-between cursor-pointer rounded-lg transition-all hover:bg-white/5 px-2 py-1"
                        onClick={() => setIsEditing(true) }
                    >
                        <p className="text-xl">{editedTask.name}</p>
                        <PencilSquareIcon className="size-5 text-white opacity-0 group-hover:opacity-100" />
                    </div>
                )
            }
        </div>
    )
}

export default TaskNameGroup
