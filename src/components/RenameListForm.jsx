import { useState } from 'react';


const RenameListForm = ({list, renameList, toggleRenameListMode, inputRef, formRef}) => {

    const [updatedList, setUpdatedList] = useState(list);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        renameList(list.id, updatedList.name)
        toggleRenameListMode()
    }


    return (
        <form
            className="w-full"
            onSubmit={handleFormSubmit}
            ref={formRef}
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
                    ref={inputRef}
                    className="input p-2 rounded-lg w-full bg-gray-700 border-2 border-gray-700 focus:outline-none  focus:border-2 focus:border-primary"
                    value={updatedList.name ? updatedList.name : ''}
                    // onInput={(e) => setTask(e.target.value)}
                    onInput={(e) => setUpdatedList({...list, name : e.target.value})}
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
                    Save
                </button>
            </div>
        </form>
    )
}

export default RenameListForm

