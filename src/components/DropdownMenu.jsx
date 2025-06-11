import { useEffect, useRef, useState } from "react"
import { Bars3Icon } from '@heroicons/react/24/solid';

const DropdownMenu = ({list, deleteList, toggleRenameListMode}) => {

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef()

    const toggleMenu = () => {
        setIsOpen(prev => !prev);
    }

    
    const handleClickOutside = (event) => {
        if(dropdownRef.current && !dropdownRef.current.contains(event.target)){
            setIsOpen(false)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    },[])


  return (
    <div className="relative inline-block text-left"  ref={dropdownRef}>
        <button
            className="text-white p-2"
            aria-label={`Close add-task mode`}
            onClick={toggleMenu}
        >
            <Bars3Icon className="size-6 text-white" />
        </button>

        {/* Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
            From: "transform opacity-0 scale-95"
            To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
            From: "transform opacity-100 scale-100"
            To: "transform opacity-0 scale-95" */}
        {isOpen && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-dark1-700 border border-dark1-600 shadow-lg focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="p-1" role="none">
                    <a
                    className="block text-sm cursor-pointer rounded-md transition-all hover:bg-white/5 px-3 py-2"
                    // role="menuitem"
                    // tabIndex="-1"
                    // id="menu-item-0"
                    onClick={toggleRenameListMode}
                    >Rename</a>
                    <a
                        className="block text-sm cursor-pointer rounded-md transition-all hover:bg-white/5 px-3 py-2"
                        // role="menuitem"
                        // tabIndex="-1"
                        onClick={() => {deleteList(list)}}
                    >
                        Delete list
                    </a>
                </div>
            </div>
        )

        }
        </div>
  )
}

export default DropdownMenu
