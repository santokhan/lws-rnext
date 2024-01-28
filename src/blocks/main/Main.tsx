// Table.tsx

import TaskProvider from '../../reducer/reducer';
import TaskerHeader from './tasker/header/TaskerHeader';
import TaskTable from './tasker/table/TaskTable';
import { FC } from 'react';

const TaskContainer: FC = () => {
  return (
    <TaskProvider>
      <section className="mb-20" id="tasks">
        <div className="container mx-auto">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
            <TaskerHeader />
            <TaskTable />
          </div>
        </div>
      </section>
    </TaskProvider>
  );
};

export default TaskContainer;
