import { useState } from 'react';
import PrimaryButton from './UI/PrimaryButton';


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
                    className="input p-2 rounded-lg w-full bg-dark1-700 border-2 border-dark1-700 focus:outline-none  focus:border-2 focus:border-primary"
                    value={updatedList.name ? updatedList.name : ''}
                    onInput={(e) => setUpdatedList({...list, name : e.target.value})}
                    required
                    autoFocus
                    maxLength={60}
                    placeholder="Enter task name"
                />
                <PrimaryButton aria-label="Rename list" type="submit">
                    Save
                </PrimaryButton>
            </div>
        </form>
    )
}

export default RenameListForm

