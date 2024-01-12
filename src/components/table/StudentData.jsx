import React from 'react';
import StudentsData from '../../lib/student-data.json'
import avator from '../../assets/avatar.png';
import DataGrid from './Table'

const Table = () => {
    function groupedByClass(list) {
        return Object.entries(list.reduce((acc, student) => {
            const key = student.studentClass;

            if (!acc[key]) {
                acc[key] = [];
            }

            acc[key].push(student);
            return acc;
        }, {}));
    }

    const studentList = groupedByClass(StudentsData);

    return (
        <div className="max-w-[848px] mx-auto overflow-auto">
            <DataGrid.Table>
                <DataGrid.Head>
                    <DataGrid.Row className='border-[#FFFFFF0D]'>
                        <DataGrid.TH className="w-2/12">ID</DataGrid.TH>
                        <DataGrid.TH className="w-6/12">Name</DataGrid.TH>
                        <DataGrid.TH className="w-2/12">Scores</DataGrid.TH>
                        <DataGrid.TH className="w-2/12">Percentage</DataGrid.TH>
                    </DataGrid.Row>
                </DataGrid.Head>
                <DataGrid.Body>
                    {studentList.map((studentList, idx) =>
                        <DataGrid.Group key={idx}>
                            <DataGrid.ClassRow class={studentList[0]} />
                            {
                                studentList[1].map((student, studentIdx) => (
                                    <DataGrid.Row key={studentIdx} {...student} id={studentIdx + 1} className='border-[#7ECEB529]'>
                                        <DataGrid.Cell>{studentIdx + 1}</DataGrid.Cell>
                                        <DataGrid.Cell>
                                            <div className="flex space-x-3 items-center">
                                                <img
                                                    className="w-8 h-8"
                                                    src={avator}
                                                    width="32"
                                                    height="32"
                                                    alt="John Smith"
                                                />
                                                <span className="whitespace-nowrap">{student.name}</span>
                                            </div>
                                        </DataGrid.Cell>
                                        <DataGrid.Cell>{student.score}</DataGrid.Cell>
                                        <DataGrid.Cell>{student.percentage}</DataGrid.Cell>
                                    </DataGrid.Row>
                                ))
                            }
                        </DataGrid.Group>
                    )}
                </DataGrid.Body>
            </DataGrid.Table>
        </div>
    )
};

export default Table;