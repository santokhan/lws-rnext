import { ReactNode, useCallback } from "react";
import { useImmerReducer } from "use-immer";
import { nanoid } from 'nanoid';
import { TaskContext, Value } from "../context/tasker-context";

export type InputTask = {
    title: string;
    description: string;
    tags: string[];
    priority: string;
};

export type Task = {
    id: string;
    title: string;
    description: string;
    tags: string[];
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
        title: "Integration API",
        description: "Connect an existing API to a third-party database using secure methods and handle data exchange efficiently.",
        tags: ["Web", 'Python', 'API'],
        priority: 'high',
        createdAt: new Date()
    },
];

const taskReducer = (draft: Task[], action: Action): Task[] => {
    switch (action.type) {
        case "add":
            return typeof action.payload === 'object' ? [...draft, {
                ...action.payload,
                id: nanoid(),
                createdAt: new Date()
            }]
                : draft;
        case "update": {
            const { id, ...updatedTask } = action.payload as Task;
            const index = draft.findIndex(t => t.id === id);
            if (index !== -1) {
                draft[index] = { ...draft[index], ...updatedTask, createdAt: new Date() };
            }
            return draft;
        }
        case "delete":
            return draft.filter(t => t.id !== action.payload);
        case "delete/all":
            return [];
        default:
            return draft;
    }
};

const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, dispatch] = useImmerReducer(taskReducer, initialTodos);

    const handleAddTasks = useCallback((task: InputTask) => {
        dispatch({ type: "add", payload: task });
    }, [dispatch]);

    const handleUpdateTasks = useCallback((task: Task) => {
        dispatch({ type: "update", payload: task });
    }, [dispatch]);

    const handleDelete = useCallback((id: string) => {
        dispatch({ type: "delete", payload: id });
    }, [dispatch]);

    const handleDeleteAll = useCallback(() => {
        dispatch({ type: "delete/all", payload: '' });
    }, [dispatch]);

    const value: Value = {
        tasks,
        handleAddTasks,
        handleUpdateTasks,
        handleDelete,
        handleDeleteAll
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
