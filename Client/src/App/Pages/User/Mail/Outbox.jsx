import React, { useEffect, useState } from 'react';
import { useStateContext } from '../../../../contexts/ContextProvider';
import { DeleteMail, MailOutBox } from '../../../API/API';
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const OutBox = () => {
    const { currentColor } = useStateContext();
    const [figureData, setFigureData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFigures, setFilteredFigures] = useState([]);
    const [showAlert, setShowAlert] = useState(false);

    const fetchData = async () => {
        try {
            const OutboxData = await MailOutBox();
             setFigureData(OutboxData);
        } catch (error) {
            console.error('Error fetching figure data:', error);
        }
    };

    useEffect( () => {
        fetchData();
    },[]);

    useEffect(() => {
        const filtered = figureData.filter((figure) => {
            const { name, role, userRequest, status, createdAt,email ,category,requestId,response} = figure;
            const lowerCaseQuery = searchQuery.toLowerCase();
            return (
                name.toLowerCase().includes(lowerCaseQuery) ||
                role.toLowerCase().includes(lowerCaseQuery) ||
                userRequest.toLowerCase().includes(lowerCaseQuery)||
                status.toLowerCase().includes(lowerCaseQuery)||
                createdAt.toLowerCase().includes(lowerCaseQuery)||
                email.toLowerCase().includes(lowerCaseQuery)||
                category.toLowerCase().includes(lowerCaseQuery)||
                requestId.toLowerCase().includes(lowerCaseQuery)||
                response.toLowerCase().includes(lowerCaseQuery)

            );
        });
        setFilteredFigures(filtered);
    }, [searchQuery, figureData]);
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

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

    const handleDelete = async (ID , Name) => {
        await DeleteMail(ID , Name);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
             fetchData();
        }, 5000);
    };
    const { UserData } = useStateContext();

    if(UserData.role === "Gust")
    {
        window.location.href = "/Login"
        return null
    }
    else
    return (
        <div className="mt-10">
            <h1
                className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl"
                style={{ color: currentColor }}
            >
                My Outbox <span className="text-4xl pl-5">( {filteredFigures.length} )</span>
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
                            <div className="text-sky-600 dark:text-sky-400 text-xl">Category: </div>
                            <div className="text-sky-600 dark:text-sky-200 text-lg pl-2"> {figure.category} </div>
                            <div className="text-sky-600 dark:text-sky-400 text-xl">Request: </div>
                            <div className="text-lg font-medium dark:text-white pl-2 ">{figure.userRequest}</div>
                            <br />
                        </blockquote>
                        <figcaption className="font-medium">
                            <div className="text-slate-700 dark:text-slate-200">
                                <div className="text-sky-600 dark:text-sky-400 text-xl">Info: </div>
                                <p className="text-slate-700 dark:text-slate-200">Request ID: {figure.requestId}   </p>
                                <p className="text-slate-700 dark:text-slate-200">Faculty Of:  {figure.faculty}  </p>
                                <p className="text-slate-700 dark:text-slate-200">To: {figure.sendTo}   </p>
                                {getCairoDateTime(figure.createdAt)}
                            </div>
                            <button className="flex my-4 justify-center mx-auto md:mx-0 text-center items-center">
                                <span className=" text-sky-400 dark:text-sky-300   mr-2 text-center md:text-left"
                                >Request Status: </span>
                                <div
                                    className="px-2 py-1 rounded-xl  "
                                    style={{
                                        backgroundColor:
                                            figure.status === 'Accepted'
                                                ? 'green'
                                                : figure.status === 'Rejected'
                                                    ? 'red'
                                                    : 'orange',
                                        color:
                                            figure.status === 'Accepted'
                                                ? 'white'
                                                : figure.status === 'Rejected'
                                                    ? 'white'
                                                    : 'black',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {figure.status}
                                </div>
                            </button>
                            {figure.agreedBy !== "" && (
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <div>
                                            <p className="flex-col text-sky-400 dark:text-sky-300 mr-2 text-center md:text-left">
                                                Response By: {figure.agreedBy}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            )}
                            {figure.response !== "" && (
                                <div className="flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <div>
                                            <p className="flex-col text-sky-400 dark:text-sky-300 mr-2 text-center md:text-left">
                                                Response: {figure.response}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            )}
                        </figcaption>
                        {showAlert && (
                            <Alert severity="warning" onClose={() => setShowAlert(false)} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                                <AlertTitle>Success</AlertTitle>
                                Request Deleted successfully!
                            </Alert>
                        )}
                        <button
                            className="flex my-4 justify-center mx-auto md:mx-0 text-center items-center absolute bottom-4 right-4 text-red-500 hover:bg-white "
                            onClick={() => handleDelete(figure.requestId , figure.name)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                                <DeleteIcon />
                        </button>
                    </div>
                </figure>
            ))}
        </div>
    );
};

export default OutBox;
