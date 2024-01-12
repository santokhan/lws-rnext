import React from 'react';
import avator from '../../assets/avatar.png';

const ClassRow = (props) => {
    const classList = {
        "1": 'One',
        "2": 'Two',
        "3": 'Three',
        "4": 'Four',
        "5": 'Five',
    }
    return (
        <tr class="bg-white/5">
            <td class="p-5 text-sm md:text-xl" colspan="4">Class {classList[props.class]}</td>
        </tr>
    )
}

const TH = ({ children, className }) => (
    <th className={["p-5 text-sm md:text-xl font-semibold text-left", className].join(" ")}>{children}</th>
)

const Cell = ({ children, className }) => {
    return (
        <td class={["p-5 text-sm md:text-xl text-left", className].join(" ")}>
            {children}
        </td>
    )
}

const Row = (props) => {
    const { name, score, percentage, className, id } = props;

    return (
        <tr class={["border-b", className].join(" ")}>
            {props.children}
            {/* <Col>{id}</Col>
            {
                name &&
                <Col>
                    <div class="flex space-x-3 items-center">
                        <img
                            class="w-8 h-8"
                            src={avator}
                            width="32"
                            height="32"
                            alt="John Smith"
                        />
                        <span class="whitespace-nowrap">{name}</span>
                    </div>
                </Col>
            }
            {score && <Col>{score}</Col>}
            {percentage && <Col>{percentage}</Col>} */}
        </tr>
    )
}

const Group = ({ children }) => {
    return (
        <>{children}</>
    )
}

const Head = ({ children }) => (
    <thead>
        {children}
    </thead>
)

const Body = ({ children }) => (
    <tbody>
        {children}
    </tbody>
)

const Table = ({ children }) => {
    return (
        <table className="w-full">
            {children}
        </table>
    )
};

const DataGrid = { Table, Head, Body, Row, Group, ClassRow, Cell, TH };

export default DataGrid;