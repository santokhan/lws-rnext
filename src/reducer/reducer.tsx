import { ReactNode, useCallback, useState } from "react";
import { useImmerReducer } from "use-immer";
import { nanoid } from 'nanoid';
import { TaskContext, Value } from "../context/tasker-context";

export type InputTask = {
    title: string;
    description: string;
    tags: string;
    priority: string;
};

export type Task = {
    id: string;
    starred: boolean;
    title: string;
    description: string;
    tags: string;
    priority: string;
    createdAt: Date;
};

export type Action = {
    type: string;
    payload: string | Task | InputTask;
};

const initialTodos: Task[] = [
    {
        id: "iGOI2OjgFT1qP5K933eIE",
        starred: true,
        title: "Integration API",
        description: "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
        tags: "Web, Python, API",
        priority: 'high',
        createdAt: new Date()
    },
    {
        id: "iGOI2OjgFT1qP5K933eIA",
        starred: false,
        title: "API Data Synchronization with Python",
        description: "Implement a Python solution to synchronize data between an API and a third-party database securely, optimizing data exchange.",
        tags: "Python, Data Synchronization, API",
        priority: 'high',
        createdAt: new Date()
    },
];

const taskReducer = (draft: Task[], action: Action): Task[] => {
    switch (action.type) {
        case "STARRED": {
            const id = action.payload as String;
            return draft.map((e) => {
                if (e.id == id) {
                    return { ...e, starred: !e.starred };
                } else {
                    return e;
                }
            });
        }
        case "ADD": {
            const newTask = action.payload as InputTask;
            console.log(newTask);
            return [
                ...draft,
                { ...newTask, id: nanoid(), createdAt: new Date(), starred: false }
            ]
        }
        case "UPDATE": {
            const { id, ...updatedTask } = action.payload as Task;
            const index = draft.findIndex(t => t.id === id);
            if (index !== -1) {
                draft[index] = { ...draft[index], ...updatedTask, createdAt: new Date() };
            }
            return draft;
        }
        case "DELETE":
            return draft.filter(t => t.id !== action.payload);
        case "DELETE/ALL":
            return [];
        default:
            return draft;
    }
};

const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, dispatch] = useImmerReducer(taskReducer, initialTodos);
    const [filteredTasks, setFilteredTasks] = useState<Task[] | null>(null);

    const handleStarred = useCallback((id: string) => {
        dispatch({ type: "STARRED", payload: id });
    }, [dispatch]);

    const handleAddTasks = useCallback((task: InputTask) => {
        dispatch({ type: "ADD", payload: task });
    }, [dispatch]);

    const handleUpdateTasks = useCallback((task: Task) => {
        dispatch({ type: "UPDATE", payload: task });
    }, [dispatch]);

    const handleDelete = useCallback((id: string) => {
        dispatch({ type: "DELETE", payload: id });
    }, [dispatch]);

    const handleDeleteAll = useCallback(() => {
        dispatch({ type: "DELETE/ALL", payload: '' });
    }, [dispatch]);

    const handleFilter = (title: string) => {
        if (title === '') {
            return setFilteredTasks(null);
        } else {
            setFilteredTasks(tasks.filter((e) => {
                return e.title.toLowerCase().includes(title.toLowerCase());
            }));
        }
    }

    const value: Value = {
        tasks,
        handleStarred,
        handleAddTasks,
        handleUpdateTasks,
        handleDelete,
        handleDeleteAll,
        filteredTasks,
        handleFilter
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
