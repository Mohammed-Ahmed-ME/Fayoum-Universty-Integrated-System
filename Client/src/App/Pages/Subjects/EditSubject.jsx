import React, { useState, useEffect } from 'react';
import {  Header } from "../../Components";
import { useStateContext } from "../../../contexts/ContextProvider";
import { EditStudentSubject} from "../../API/API";

const RemoveSubject = () => {
    const [studentID, setStudentID] = useState('');
    const [code, setSubjectCode] = useState('');
    const [Degree, setSubjectDegree] = useState('');
    const [currentAction, setCurrentAction] = useState('');

    const Edit = async (e) => {
        e.preventDefault();
        try {
            const subjectData = {
                studentID,
                code,
                Degree
            };
            const Add = await EditStudentSubject(subjectData);
            setCurrentAction(Add.data);

        } catch {
            setCurrentAction('Something went wrong, please fill in all fields and check for duplicated data!');
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentAction('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentAction]);

    const handleReset = () => {
        setSubjectCode('');
        setStudentID('');
        setCurrentAction('');
        setSubjectDegree('');
    };

    const { currentColor,UserData } = useStateContext();
    if (
        UserData.role !== "Full Administrator" &&
        UserData.role !== "Administrator" &&
        UserData.role !== "Professor"
    ) {
        window.location.href = "/Login";
        return null;
    }
    else
    return (
        <div className="mt-10">
            <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl" style={{ color: currentColor }}>Edit Subject</h1>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Form" title="Edit Subject" />
                <form onSubmit={Edit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="StudentID" className="font-semibold mb-2">
                                Student ID:
                            </label>
                            <input
                                type="text"
                                id="id"
                                value={studentID}
                                placeholder="Enter The studentID"
                                onChange={(e) => setStudentID(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"
                                required
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="SubjectCode" className="font-semibold mb-2">
                                Subject Code:
                            </label>
                            <input
                                id="code"
                                value={code}
                                onChange={(e) => setSubjectCode(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"
                                required
                            >
                            </input>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="SubjectDegree" className="font-semibold mb-2">
                                Subject Degree:
                            </label>
                            <input
                                type="number"
                                id="degree"
                                value={Degree}
                                onChange={(e) => setSubjectDegree(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"
                                required
                            >
                            </input>
                        </div>
                    </div>
                    <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-lg pb-2 items-center text-center sm:text-sm md:text-lg lg:text-1xl xl:text-2xl" style={{ color: currentColor }}>
                        {currentAction}
                    </h1>
                    <div className="flex justify-center mt-10 space-x-5">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Reset Form
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RemoveSubject;
