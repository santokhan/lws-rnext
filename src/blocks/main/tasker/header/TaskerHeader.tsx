// TaskerHeader.tsx

import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import AddTaskFormModal from '../../../modal/add-task/AddTaskFormModal';
import { useTaskContext } from '../../../../context/tasker-context';
import ModalContainer from '../../../../components/task-modal/ModalContainer';

const TaskerHeader: FC = () => {
    const [needle, setneedle] = useState<string>("");
    const [isOpen, setisOpen] = useState<boolean>(false);
    const dialogFormRef = useRef<HTMLDivElement | null>(null);
    const openerRef = useRef<HTMLButtonElement | null>(null);

    function showModal() {
        setisOpen(true);
    }
    function hideModal() {
        setisOpen(false);
    }
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // Check if the click occurred outside the dialog
            if (dialogFormRef.current && openerRef.current) {
                if (!dialogFormRef.current.contains(e.target as Node)) {
                    if (!openerRef.current.contains(e.target as Node)) {
                        hideModal();
                    }
                }
            }
        };

        // Add the event listener when the modal is open
        if (isOpen) {
            window.addEventListener('click', handleClickOutside)
        }

        // Remove the event listener when the component unmounts or the modal is closed
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const { handleDeleteAll, handleFilter } = useTaskContext();

    function handleSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        // submit
        handleFilter(needle)
    }

    return (
        <div className="mb-14 items-center justify-between sm:flex">
            <h2 className="text-2xl font-semibold max-sm:mb-4">Your Tasks</h2>
            <div className="flex items-center space-x-5">
                <form onSubmit={handleSubmit}>
                    <div className="flex">
                        <div className="relative overflow-hidden rounded-lg text-gray-50 md:min-w-[380px] lg:min-w-[440px]">
                            <input
                                type="search"
                                id="search-dropdown"
                                className="z-20 block w-full bg-gray-800 px-4 py-2 pr-10 focus:outline-none"
                                placeholder="Search Task"
                                value={needle}
                                onChange={e => { setneedle(e.target.value) }}
                            />
                            <button type="submit" className="absolute right-2 top-0 h-full rounded-e-lg text-white md:right-4">
                                <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                                <span className="sr-only">Search</span>
                            </button>
                        </div>
                    </div>
                </form>

                <button className="rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold" ref={openerRef} onClick={showModal}>Add Task</button>
                {isOpen &&
                    <ModalContainer>
                        <div ref={dialogFormRef}>
                            <AddTaskFormModal hideModal={hideModal} />
                        </div>
                    </ModalContainer>
                }
                <button className="rounded-md bg-red-500 px-3.5 py-2.5 text-sm font-semibold" onClick={handleDeleteAll}>Delete All</button>
            </div>
        </div>
    );
};

export default TaskerHeader;
