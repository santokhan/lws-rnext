import React, { FormEvent, useState } from 'react';
import { CloseCircle } from 'iconsax-react';
import { useTaskContext } from '../../../context/tasker-context';
import { InputTask } from '../../../reducer/reducer';

const initialTask: InputTask = {
    title: '',
    description: '',
    tags: '',
    priority: '',
};

interface AddTaskProps {
    hideModal: () => void;
}

const AddTaskFormModal: React.FC<AddTaskProps> = ({ hideModal }) => {
    const [state, setState] = useState<InputTask>(initialTask);
    const { handleAddTasks } = useTaskContext();

    const handleChange = (key: keyof InputTask) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setState((prev) => ({ ...prev, [key]: e.target.value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState((prev) => ({ ...prev, tags: e.target.value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleAddTasks(state);

        hideModal();
    };

    return (
        <form onSubmit={handleSubmit} className="relative mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11">
            <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
                Add New Task
            </h2>

            <button type="button" autoFocus={true} className='absolute right-6 top-6 text-gray-200 hover:text-white' onClick={hideModal}>
                <CloseCircle className='w-6 h-6' />
            </button>

            <div className="space-y-9 text-white lg:space-y-10">
                <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="title">Title</label>
                    <input
                        className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                        type="text"
                        name="title"
                        id="title"
                        value={state.title}
                        onChange={handleChange('title')}
                        required
                    />
                </div>

                <div className="space-y-2 lg:space-y-3">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
                        name="description"
                        id="description"
                        value={state.description}
                        onChange={handleChange('description')}
                        required
                    ></textarea>
                </div>

                <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="tags">Tags (Web, API etc)</label>
                        <input
                            className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                            type="text"
                            name="tags"
                            id="tags"
                            value={state.tags}
                            onChange={handleTagsChange}
                            required
                        />
                    </div>

                    <div className="space-y-2 lg:space-y-3">
                        <label htmlFor="priority">Priority</label>
                        <select
                            className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                            name="priority"
                            id="priority"
                            value={state.priority}
                            onChange={handleChange('priority')}
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
            <div className="mt-16 flex justify-center lg:mt-20">
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
                >
                    Create new task
                </button>
            </div>
        </form>
    );
};

export default AddTaskFormModal;
