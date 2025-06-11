import { TrashIcon } from "@heroicons/react/16/solid"
import { useEffect } from 'react';
import TaskNameGroup from "./TaskNameGroup";
import TaskDescriptionGroup from "./TaskDescriptionGroup";
import PrimaryButton from "./UI/PrimaryButton";

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
            <div className="w-full max-w-2xl bg-dark1-800 rounded-2xl flex flex-col my-8 p-4 ">
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
                            className={`rounded-md cursor-pointer p-2 ${editedTask.priority === "high" ? 'bg-red-500' : editedTask.priority === "medium" ? 'bg-yellow-500' : editedTask.priority === "low" ? 'bg-green-500' : 'bg-dark1-600'}`}
                            id=""
                            onChange={handlePriority}
                            value={editedTask.priority}
                        >
                            <option value="" className="bg-dark1-600">None</option>
                            <option value="high" className="bg-dark1-600">High</option>
                            <option value="medium" className="bg-dark1-600">Medium</option>
                            <option value="low" className="bg-dark1-600">Low</option>
                        </select>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2 pt-4">
                
                    <button
                        className="flex gap-2 items-center text-red-400 bg-dark1 border-2 border-red-400 hover:border-red-300 hover:bg-dark1-400 hover:text-red-300 transition-all font-medium rounded-lg text-sm p-3"
                        aria-label={`Delete ${editedTask.name} Task`}
                        onClick={handleDelete}
                    >
                        Delete
                        <TrashIcon className="size-5 text-red-400" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditTaskModal

