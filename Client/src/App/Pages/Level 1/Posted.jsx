import React, {useEffect, useState} from 'react';
import {useStateContext} from '../../../contexts/ContextProvider';
import {DeleteNews, PostedNews} from '../../API/API';
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Posted = () => {
    const [showAlert, setShowAlert] = useState(false);
    const {currentColor, UserData} = useStateContext();
    const [figureData, setFigureData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFigures, setFilteredFigures] = useState([]);
    const fetchData = async () => {
        try {
            const News = await PostedNews();
            setFigureData(News);
        } catch (error) {
            console.error('Error fetching figure data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = figureData.filter((figure) => {
            const { name, role, userNews ,createdAt,sendTo} = figure;
            const lowerCaseQuery = searchQuery.toLowerCase();
            return (
                name.toLowerCase().includes(lowerCaseQuery) ||
                role.toLowerCase().includes(lowerCaseQuery) ||
                createdAt.toLowerCase().includes(lowerCaseQuery) ||
                userNews.toLowerCase().includes(lowerCaseQuery)||
                sendTo.toLowerCase().includes((lowerCaseQuery))
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

    const handleDelete = async (ID, Name) => {
        await DeleteNews(ID, Name);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
            fetchData();

        }, 5000);
    }
        if (
        UserData.role !== "Full Administrator" &&
        UserData.role !== "Administrator" &&
        UserData.role !== "Professor" &&
        UserData.role !== "Assistant Professor"
    ) {
        window.location.href = "/Login";
        return null;
    } else
        return (
            <div className="mt-10">
                <h1
                    className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl"
                    style={{color: currentColor}}
                >
                    My Posted News <span className="text-4xl pl-5">( {filteredFigures.length} )</span>
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
                                <div className="text-sky-500 dark:text-sky-400 text-xl">{figure.name}</div>
                                <div className="text-slate-700 dark:text-slate-500">{figure.role}</div>
                            </figcaption>
                            <blockquote>
                                <p className="text-lg font-medium dark:text-white">{figure.userNews}</p><br/>
                            </blockquote>
                            <figcaption className="font-medium">
                                <div className="text-slate-700 dark:text-slate-500">
                                    {getCairoDateTime(figure.createdAt)}
                                    <p className="text-slate-700 dark:text-slate-500">To: {figure.studentGroup} {figure.sendTo}   </p>
                                </div>
                            </figcaption>
                            <button
                                className="flex my-4 justify-center mx-auto md:mx-0 text-center items-center"
                                onClick={() => handleDelete(figure.requestId, figure.name)}
                                style={{
                                    position: 'absolute',
                                    bottom: '0.5rem',
                                    right: '0.5rem',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <div className="text-red-500"><DeleteIcon/>
                                </div>
                            </button>
                        </div>
                        {showAlert && (
                            <Alert severity="warning" onClose={() => setShowAlert(false)} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                                <AlertTitle>Success</AlertTitle>
                                News Deleted successfully!
                            </Alert>
                        )}
                    </figure>

                ))}
            </div>
        );
};

export default Posted;

