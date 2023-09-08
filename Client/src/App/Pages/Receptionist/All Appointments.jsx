import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../../../contexts/ContextProvider';
import { MailInbox, MailResponseUpdate, MailStatusUpdate } from '../../../API/API';

const AllApointements = () => {
    const { currentColor, UserData } = useStateContext();
    const [figureData, setFigureData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFigures, setFilteredFigures] = useState([]);

    const fetchData = async () => {
        try {
            const data = await MailInbox();
            setFigureData(data);
        } catch (error) {
            console.error('Error fetching figure data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = figureData.filter((figure) => {
            const { name, role, userRequest, status, createdAt, email, category, requestId, response } = figure;
            const lowerCaseQuery = searchQuery.toLowerCase();
            return (
                name.toLowerCase().includes(lowerCaseQuery) ||
                role.toLowerCase().includes(lowerCaseQuery) ||
                userRequest.toLowerCase().includes(lowerCaseQuery) ||
                status.toLowerCase().includes(lowerCaseQuery) ||
                createdAt.toLowerCase().includes(lowerCaseQuery) ||
                email.toLowerCase().includes(lowerCaseQuery) ||
                category.toLowerCase().includes(lowerCaseQuery) ||
                requestId.toLowerCase().includes(lowerCaseQuery) ||
                response.toLowerCase().includes(lowerCaseQuery)
            );
        });
        setFilteredFigures(filtered);
    }, [searchQuery, figureData]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };



        return (
            <div className="mt-10">
                <h1
                    className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl"
                    style={{color: currentColor}}
                >
                    My Inbox <span className="text-4xl pl-5">( {filteredFigures.length} )</span>
                </h1>
                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        className="px-4 py-2  focus:outline-none dark:text-white focus:ring focus:ring-blue-500 rounded-md w-full mx-20 bg-slate-300 dark:bg-slate-800"
                        placeholder="Search in Mail..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                {filteredFigures.map((figure) => (
                    <figure
                        key={figure.requestId}
                        className="md:flex bg-slate-300 rounded-xl p-8 md:p-0 dark:bg-slate-800 m-5 relative"
                    >
                        <img
                            className="w-32 h-32 md:h-42 md:w-42 md:rounded-ful  rounded-full mx-auto md:mx-10 my-auto border-8"
                            src={`data:image/jpg;base64, ${figure.img}`}
                            alt=""
                            width="384"
                            height="512"
                        />
                        <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                            <figcaption className="font-medium">
                                <div className="text-sky-500 dark:text-sky-300 text-2xl">{figure.name}</div>
                                <div className="text-slate-700 dark:text-slate-200 pl-3">
                                    {figure.role === 'Student' ? `${figure.role} ${figure.academicYear}` : figure.role}
                                </div>
                            </figcaption>
                            <blockquote>
                                <div className="text-sky-600 dark:text-sky-400 text-xl">Category:</div>
                                <div className="text-sky-600 dark:text-sky-200 text-lg pl-2"> {figure.category} </div>
                                <div className="text-sky-600 dark:text-sky-400 text-xl">Request:</div>
                                <div className="text-lg font-medium dark:text-white pl-2 ">{figure.userRequest}</div>
                                <br/>
                            </blockquote>
                            <figcaption className="font-medium">
                                <div className="text-sky-600 dark:text-sky-400 text-xl">Info:</div>
                                <div className="text-slate-700 dark:text-slate-200">
                                    <p className="text-slate-700 dark:text-slate-200">Request
                                        ID: {figure.requestId}   </p>
                                    <p className="text-slate-700 dark:text-slate-200">Faculty Of: {figure.faculty}  </p>
                                    <p className="text-slate-700 dark:text-slate-200">From: {figure.email} </p>
                                    {getCairoDateTime(figure.createdAt)}
                                </div>
                            </figcaption>
                        </div>
                    </figure>
                ))}
            </div>
        );
};

export default AllApointements;

const getCairoDateTime = (dateTimeString) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Africa/Cairo',
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString('en-US', options);
};