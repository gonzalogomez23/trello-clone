
import { useState, useEffect, useRef } from 'react';
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import { useSortable, arrayMove, SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useOutsideClick from '../hooks/useOutsideClick'; 

import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';

// Components
import TaskItem from "./TaskItem"
import AddTaskForm from "./AddTaskForm"
import RenameListForm from "./RenameListForm"
import DropdownMenu from "./DropdownMenu"

// Styles
import styles from './TaskList.module.css'

const TaskList = ({list, deleteList, renameList, newListId, unableNewListId, updateLocalStorage }) => {

  const [isAdding, setIsAdding] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)
  const [updatedTasks, setUpdatedTasks] = useState(list.tasks)
  
  const inputRef = useRef(null)
  const formRef = useRef(null)
  const addTaskFormRef = useRef(null)

  const {attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({id: list.id})

  const style = {
      transform: CSS.Translate.toString(transform),
      transition,
  };

  const toggleAddListMode = () => {
    setIsAdding(!isAdding)
  }

  const toggleRenameListMode = () => {
    setIsRenaming(!isRenaming)
  }

  const addTask = (newTask) => {
    setUpdatedTasks([...list.tasks, newTask])
    setIsAdding(false)
  }

  const updateTasks = (updatedTask) => {
    setUpdatedTasks(prevState => prevState.map(task => 
      task.id === updatedTask.id
      ? { ...task, ...updatedTask }
      : task
    ))
  }

  const deleteTask = (taskId) => {
    setUpdatedTasks(prevState => prevState.filter(task => task.id !== taskId))
  };
  
  useOutsideClick(addTaskFormRef, () => setIsAdding(false));

  useOutsideClick(formRef, () => {
    unableNewListId()
    setIsRenaming(false)
  } );
  
  useEffect(() => {
    newListId === list.id && setIsRenaming(true)

    if(isRenaming && inputRef.current){
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [newListId, isRenaming]);
  
  useEffect(() => {
    updateLocalStorage(updatedTasks, list.id)
  }, [updatedTasks]);

  const getTaskPos = id => updatedTasks.findIndex(task => task.id === id)
  
  const handleDragEnd = event => {
    const {active, over} = event
    
    if(active.id === over.id) return;
    
    setUpdatedTasks(prevState =>{
        const originalPos = getTaskPos(active.id)
        const newPos = getTaskPos(over.id)
        return arrayMove(prevState, originalPos, newPos)
      })
  }

  const sensors = useSensors(
    useSensor(PointerSensor,{
      activationConstraint: {
        distance: 3
      }
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  return (
    <div className={`bg-dark1-800 w-80 touch-none min-w-80 rounded-xl flex flex-col gap-3 p-3 ${isDragging && 'shadow-lg z-40'}`} ref={setNodeRef} style={style}>
      {isRenaming
        ? (<RenameListForm
            list={list}
            renameList={renameList}
            toggleRenameListMode={toggleRenameListMode}
            inputRef={inputRef}
            formRef={formRef}
          />)
        : (
          <div className='flex gap-4'>
            <div className={`flex items-center flex-grow px-2 ${isDragging ? 'cursor-grabbing': ' cursor-grab'}`} {...attributes} {...listeners}>
              <h2 className="font-bold text-lg">{list.name}</h2>
            </div>
            <DropdownMenu
              list={list}
              deleteList={deleteList}
              toggleRenameListMode={toggleRenameListMode}
            />
          </div>
        )
      }
      { updatedTasks.length > 0 && (
        <ul className={styles.tasks}>
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
            <SortableContext items={updatedTasks} strategy={verticalListSortingStrategy}>
              {updatedTasks.map(task => (
                  <TaskItem 
                      key={task.id}
                      task={task}
                      updateTasks={updateTasks}
                      deleteTask={deleteTask}
                  />
              ))}
            </SortableContext>
          </DndContext>
        </ul>
      )}
      
      { isAdding
      ? (
        <div>
          <div className='flex items-center gap-4 pb-2'>
            <p className='flex-grow'>Add new task</p>
            <button
                  className="text-white p-2"
                  aria-label={`Close add-task mode`}
                  onClick={toggleAddListMode}
              >
              <XMarkIcon className="size-6 text-white" />
            </button>
          </div>
          <AddTaskForm
            addTask={addTask}
            addTaskFormRef={addTaskFormRef}
          />
        </div>
      )
      : (
        <button
            aria-label="Add Task"
            type="submit"
            className="flex gap-2 items-center text-white w-full hover:bg-white/5 transition-all font-medium rounded-lg text-sm p-2"
            onClick={toggleAddListMode}
        >
            <PlusIcon className="size-6 text-white" />
            Add new task
        </button>
      )
      }
    </div>
  )
}

export default TaskList
