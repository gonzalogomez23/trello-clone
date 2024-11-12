import { TrashIcon } from "@heroicons/react/16/solid"
import { useEffect } from 'react';
import TaskNameGroup from "./TaskNameGroup";
import TaskDescriptionGroup from "./TaskDescriptionGroup";

const EditTaskModal = ({editedTask, updateTasks, deleteTask, closeEditMode}) => {

    useEffect(() => {
        const closeModalIfEscaped = (e) => {
            e.key === "Escape" && closeEditMode()
        }

        window.addEventListener('keydown', closeModalIfEscaped)

        return () => {
            window.removeEventListener('keydown', closeModalIfEscaped)
        }
    }, [closeEditMode])

    const handlePriority = (e) => {
        const {name, value} = e.target
        editedTask[name] = value
        updateTasks({...editedTask, [name]: value})
    } 

    const handleDelete = () => {
        deleteTask(editedTask.id)
        closeEditMode();
    } 


    return (
        <div
            role='dialog'
            aria-labelledby='editTask'
            className='absolute w-screen h-screen bg-black/75 left-0 top-0 flex justify-center items-center z-50'
            onMouseDown={(e) => {e.target === e.currentTarget && closeEditMode()}}
        >
            <div className="w-full max-w-2xl bg-gray-800 rounded-2xl flex flex-col my-8 p-4 ">
                <TaskNameGroup 
                    editedTask={editedTask}
                    updateTasks={updateTasks}
                />
                <hr className="my-2"/>
                <div className="flex flex-col px-2 py-3 gap-8">
                    <TaskDescriptionGroup 
                        editedTask={editedTask}
                        updateTasks={updateTasks}
                    />
                    <div>
                        <p className="text-lg font-semibold pb-3">Priority</p>
                        <select
                            name="priority"
                            className={`rounded-md cursor-pointer p-2 ${editedTask.priority === "high" ? 'bg-red-500' : editedTask.priority === "medium" ? 'bg-yellow-500' : editedTask.priority === "low" ? 'bg-green-500' : 'bg-slate-600'}`}
                            id=""
                            onChange={handlePriority}
                            value={editedTask.priority}
                        >
                            <option value="" className="bg-slate-600">None</option>
                            <option value="high" className="bg-slate-600">High</option>
                            <option value="medium" className="bg-slate-600">Medium</option>
                            <option value="low" className="bg-slate-600">Low</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-4">
                
                    <button
                        // type="submit"
                        className="flex gap-2 items-center text-white bg-red-500 hover:bg-red-400 font-medium rounded-lg text-sm p-3"
                        aria-label={`Delete ${editedTask.name} Task`}
                        onClick={handleDelete}
                    >
                        Delete
                        <TrashIcon className="size-5 text-white" />
                    </button>
                </div>
            </div>
            {/* <form
                className="w-full max-w-2xl my-8 p-4 bg-gray-800 rounded-2xl"
                onSubmit={handleFormSubmit}
            >
                <h2 className="text-4xl text-center font-bold mb-8">Edit task</h2>
                <div className="wrapper flex items-center gap-4">
                    <label
                        htmlFor="editTask"
                        className="label"
                        hidden
                    >Enter Task</label>
                    <input
                        type="text"
                        id="editTask"
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
                </div>
            </form> */}
        </div>
    )
}

export default EditTaskModal

