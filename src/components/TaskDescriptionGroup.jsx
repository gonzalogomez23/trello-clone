import { useState } from "react";
import { PencilSquareIcon, CheckIcon } from "@heroicons/react/24/outline";

const TaskDescriptionGroup = ({editedTask, updateTasks}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [updatedTaskDescription, setUpdatedTaskDescription] = useState(editedTask.description)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        editedTask.description = updatedTaskDescription
        updateTasks({...editedTask, description: updatedTaskDescription})
        setIsEditing(false)
    }

    return (
        <div>
            <div
                className="flex items-center justify-between pb-2"
                
            >
                <p className="text-lg font-semibold">Description</p>
                {/* <PencilSquareIcon className="size-5 text-white" /> */}
                
                {editedTask.description !== "" && !isEditing && (
                    <button
                        aria-label={`Edit task description`}
                        // type="submit"
                        className="flex gap-2 items-center text-white border border-slate-500 hover:bg-white/5 font-medium rounded-lg text-sm px-4 py-2"
                        onClick={() => setIsEditing(true) }
                    >
                        Edit
                    </button>
                )}
            </div>
            {editedTask.description !== "" && !isEditing
                ? (
                    <p>{editedTask.description}</p>
                )
                : (
                    <form
                        className="wrapper flex flex-col items-end gap-2"
                        onSubmit={handleFormSubmit}
                    >
                        <label
                            htmlFor="editTaskDescription"
                            className="label"
                            hidden
                        >Enter Task</label>
                        <textarea
                            // type="text"
                            id="editTaskDescription"
                            className="input p-2 rounded-lg w-full bg-gray-700 border-2 border-gray-700 focus:outline-none  focus:border-2 focus:border-primary"
                            value={updatedTaskDescription}
                            onInput={(e) => setUpdatedTaskDescription(e.target.value)}
                            // required
                            autoFocus={isEditing ? true : false}
                            onFocus={(e) => e.target.selectionStart = e.target.value.length }
                            maxLength={1000}
                            placeholder="Add a description"
                        />
                        <button
                            aria-label={`Confirm edited task to now read ${updatedTaskDescription}`}
                            type="submit"
                            className="flex gap-2 items-center text-white bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Save
                            {/* <CheckIcon className="size-6 text-white" /> */}
                        </button>
                    </form>
                )
            }
        </div>
    )
}

export default TaskDescriptionGroup
