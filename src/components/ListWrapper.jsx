import { useState } from 'react';
import { DndContext, closestCorners } from '@dnd-kit/core';
import { SortableContext, arrayMove, horizontalListSortingStrategy } from '@dnd-kit/sortable';

import useLocalStorage from '../hooks/useLocalStorage'

import { PlusIcon } from '@heroicons/react/24/solid';

import TaskList from './TaskList'

const ListWrapper = () => {

  const [lists, setLists] = useLocalStorage('react-todo.lists', [])
  const [newListId, setNewListId] = useState('')

  const addList = (list) => {
    setLists(prevState => [...prevState, list])
    setNewListId(list.id)
  }
  
  const deleteList = (list) => {
    setLists(prevState => prevState.filter(l => l.id !== list.id))
  };

  const unableNewListId = () => {
    setNewListId('')
  }

  const renameList = (listId, newName) => {
    setLists(prevState => prevState.map(l => (
      l.id === listId
      ? { ...l, name: newName }
      : l
    )))
    setNewListId('')
  };

  const handleAddList = () => {
    addList({
      name: 'New list',
      tasks: [],
      isRenaming: false,
      id: Date.now()
    })
  }

  const updateLocalStorage = (newTasks, listId) => {
    setLists(prevState => prevState.map(l => (
      l.id === listId
      ? { ...l, tasks: newTasks }
      : l
    )))
  }

  const getListPos = id => lists.findIndex(list => list.id === id)

  const handleDragEnd = event => {
    const {active, over} = event

    if(active.id === over.id) return;

    setLists(prevState =>{
      const originalPos = getListPos(active.id)
      const newPos = getListPos(over.id)

      return arrayMove(prevState, originalPos, newPos)
    })
  }

  return (
    <div className="flex items-start w-fit gap-4 p-4">
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={lists}
          strategy={horizontalListSortingStrategy}
        >
          {lists.map(list => (
              <TaskList
                key={list.id}
                list={list}
                deleteList={deleteList}
                renameList={renameList}
                newListId={newListId}
                updateLocalStorage={updateLocalStorage}
                unableNewListId={unableNewListId}
              />
          ))}
        </SortableContext>
      </DndContext>
      <div className='w-80 min-w-80 h-auto rounded-xl flex flex-col gap-3'>
        <button
            aria-label="Add Task"
            type="submit"
            className="flex gap-2 items-center justify-center text-white w-full border border-slate-700 hover:bg-white/5 transition-all font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={handleAddList}
        >
            New list
            <PlusIcon className="size-6 text-white" />
        </button>
      </div>
    </div>
    
  )
}

export default ListWrapper

