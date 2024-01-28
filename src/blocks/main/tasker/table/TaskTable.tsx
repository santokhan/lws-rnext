// Table.tsx

import { useEffect, useRef, useState } from "react";
import { useTaskContext } from "../../../../context/tasker-context";
import UpdateTaskFormModal from "../../../modal/add-task/UpdateTaskFormModal";
import ModalContainer from "../../../../components/task-modal/ModalContainer";
import { Task } from "../../../../reducer/reducer";
import AddTaskFormModal from "../../../modal/add-task/AddTaskFormModal";

const TaskTable: React.FC = () => {
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

    const { tasks, handleDelete } = useTaskContext();

    return (
        <div className="overflow-auto">
            <table className="table-fixed overflow-auto xl:w-full">
                <thead>
                    <tr>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[48px]"></th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-[300px]"> Title </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize w-full"> Description </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[350px]"> Tags </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Priority </th>
                        <th className="p-4 pb-8 text-sm font-semibold capitalize md:w-[100px]"> Options </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Sample Task Rows */}
                    {/* Replace with dynamic data based on your needs */}
                    {tasks.map((task: Task) =>
                        <tr key={task.id} className="border-b border-[#2E3443] [&>td]:align-baseline [&>td]:px-4 [&>td]:py-2">
                            <td>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="icon icon-tabler icon-tabler-star"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2"
                                    stroke="yellow"
                                    fill="yellow"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                                    />
                                </svg>
                            </td>
                            <td>Integration API</td>
                            <td>
                                <div>Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.</div>
                            </td>
                            <td>
                                <ul className="flex justify-center gap-1.5 flex-wrap">
                                    <li>
                                        <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#00D991A1] px-2.5 text-sm capitalize text-[#F4F5F6]">Web</span>
                                    </li>
                                    <li>
                                        <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#1C92FFB0] px-2.5 text-sm capitalize text-[#F4F5F6]">Python</span>
                                    </li>
                                    <li>
                                        <span className="inline-block h-5 whitespace-nowrap rounded-[45px] bg-[#FE1A1AB5] px-2.5 text-sm capitalize text-[#F4F5F6]">API</span>
                                    </li>
                                </ul>
                            </td>
                            <td className="text-center">High</td>
                            <td>
                                <div className="flex items-center justify-center space-x-3">
                                    <button className="text-red-500" onClick={() => { handleDelete(task.id) }}>Delete</button>
                                    <button className="text-blue-500" ref={openerRef} onClick={showModal}>Edit</button>
                                    {isOpen &&
                                        <ModalContainer>
                                            <div ref={dialogFormRef}>
                                                <UpdateTaskFormModal hideModal={hideModal} initialTask={task} />
                                            </div>
                                        </ModalContainer>
                                    }
                                </div>
                            </td>
                        </tr>
                    )}
                    {/* Additional Task Rows Go Here */}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
