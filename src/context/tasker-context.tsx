import { createContext, useContext } from 'react';
import { InputTask, Task } from '../reducer/reducer';

export type Value = {
    tasks: Task[];
    handleStarred: (id: string) => void;
    handleAddTasks: (task: InputTask) => void;
    handleUpdateTasks: (task: Task) => void;
    handleDelete: (id: string) => void;
    handleDeleteAll: () => void;
    filteredTasks: Task[] | null;
    handleFilter: (title: string) => void;
}

// Create the context with an initial value
export const TaskContext = createContext<Value | undefined>(undefined);

// Custom hook to easily access the context in functional components
export const useTaskContext = () => {
    const context: Value | undefined = useContext(TaskContext);

    if (!context) {
        throw new Error('useTaskContext must be used within a MyProvider');
    }

    return context;
};