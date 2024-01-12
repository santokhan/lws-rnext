import React from 'react';
import SearchForm from '../components/form/Search';
import DataTable from '../components/table/StudentData';

const StudentsData = () => {
    return (
        <section className="py-24 lg:pt-[120px] lg:pb-28">
            <div className="container mx-auto">
                <SearchForm />
                <DataTable />
            </div>
        </section>
    )
};

export default StudentsData;