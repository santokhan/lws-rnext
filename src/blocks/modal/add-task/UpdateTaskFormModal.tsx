// UpdateTaskFormModal.tsx

import React, { FormEvent, useState } from 'react';
//import icon.
import { CloseCircle } from 'iconsax-react';
import { useTaskContext } from '../../../context/tasker-context';
import { Task } from '../../../reducer/reducer';

export type AddTaskProps = {
    initialTask: Task;
    hideModal: () => void
}

const UpdateTaskFormModal: React.FC<AddTaskProps> = ({ hideModal, initialTask }) => {
    const [state, setstate] = useState<Task>(initialTask);

    const { handleUpdateTasks } = useTaskContext();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // add new task
        handleUpdateTasks(state);

        // close modal
        hideModal();
    }

    const { tasks } = useTaskContext();

    return (
        <form onSubmit={handleSubmit} className="relative mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
            <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
                Add New Task
            </h2>

            <button type="button" autoFocus={true} className='absolute right-6 top-6 text-gray-200 hover:text-white' onClick={hideModal}>
                <CloseCircle className='w-6 h-6' />
            </button>

            {/* inputs */}
            <div className="space-y-9 text-white lg:space-y-10">
                {/* title */}
                <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="title">Title</label>
                    <input
                        className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                        type="text"
                        name="title"
                        id="title"
                        value={state.title}
                        onChange={e => { setstate((prev) => ({ ...prev, title: e.target.value })) }}
                        required
                    />
                </div>
                {/* description */}
                <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                        name="description"
                        id="description"
                        value={state.description}
                        onChange={e => { setstate((prev) => ({ ...prev, description: e.target.value })) }}
                        required
                    ></textarea>
                </div>
                {/* input group */}
                <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                    {/* tags */}
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="tags">Tags</label>
                        <input
                            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                            type="text"
                            name="tags"
                            id="tags"
                            value={state.tags}
                            // onChange={e => { setstate((prev) => ({ ...prev, tags: e.target.value })) }}
                            required
                        />
                    </div>
                    {/* priority */}
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="priority">Priority</label>
                        <select
                            className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                            name="priority"
                            id="priority"
                            value={state.priority}
                            onChange={e => { setstate((prev) => ({ ...prev, priority: e.target.value })) }}
                            required
                        >
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* inputs ends */}
            <div className="mt-16 flex justify-center lg:mt-20">
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                >
                    Update Task
                </button>
            </div>
            <pre className='overflow-hidden'>{JSON.stringify(tasks, null, 2)}</pre>
        </form>
    );
};

export default UpdateTaskFormModal;