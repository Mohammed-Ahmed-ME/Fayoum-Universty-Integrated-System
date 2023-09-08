import React, { useState } from 'react';
import {  Header } from "../../Components";
import { useStateContext } from "../../../contexts/ContextProvider";
import { PostNewNews } from "../../API/API";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";


const AddNewNews = () => {
    const [news, setNews] = useState('');
    const [studentGroup, setStudentGroup] = useState('All');
    const [To, setTo] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [showSAlert, setShowSAlert] = useState(false);
    const AddNews = async (e) => {
        e.preventDefault();
        const NewsData = {
            news,
            To,
            studentGroup
        };
        try {
            await PostNewNews(NewsData).then((data)=>{
            if (data.status!==200)
                 throw new Error()
              setShowSAlert(true);
                setTimeout(() => {
                    setShowSAlert(false);
                }, 5000);
            }).catch(()=>{
                throw new Error()
            })

        } catch {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 5000);
        }
    };


    const handleReset = () => {
        setTo('');
        setNews('');
        setStudentGroup("All");
    };

    const { currentColor } = useStateContext();
    const { UserData } = useStateContext();

    if (
        UserData.role !== "Full Administrator" &&
        UserData.role !== "Administrator" &&
        UserData.role !== "Professor" &&
        UserData.role !== "Assistant Professor"
    ) {
        window.location.href = "/Login";
        return null;
    }
    else
    return (
        <div className="mt-10">
            <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl" style={{ color: currentColor }}>Add New News</h1>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Form" title="Post News" />
                <form onSubmit={AddNews}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="news" className="font-semibold mb-2">

                            News:
                        </label>
                        <input
                            type="text"
                            id="news"
                            value={news}
                            placeholder="Enter The News"
                            onChange={(e) => setNews(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 h-12"
                            required
                        />

                        {To === 'Students' && (
                            <div className="flex flex-col">
                                <label htmlFor="studentGroup" className="font-semibold mb-2 mt-2">
                                    Academic Year:
                                </label>
                                <select
                                    id="studentGroup"
                                    value={studentGroup}
                                    onChange={(e) => setStudentGroup(e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 h-12"
                                    required
                                >
                                    <option value="All">All</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                    <option value="5th Year">5th Year</option>

                                </select>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="To" className="font-semibold mb-2">
                            TO:
                        </label>
                        <select
                            id="To"
                            value={To}
                            onChange={(e) => setTo(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 w-full h-12"
                            required
                        >
                            <option value="">Select Group</option>
                            <option value="Global">Global</option>
                            <option value="Full Administrators">Full Administrators</option>
                            <option value="Administrators">Administrators</option>
                            <option value="Professors">Professors</option>
                            <option value="Teaching Assistants">Teaching Assistants</option>
                            <option value="Research Assistants">Research Assistants</option>
                            <option value="Assistant Professors">Assistant Professors</option>
                            <option value="Students">Students</option>
                        </select>
                    </div>
                </div>
                    <div className="flex justify-center mt-10 space-x-5">
                    <button
                        type="submit"
                        style={{backgroundColor:currentColor}}
                        className=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        style={{backgroundColor:currentColor}}
                        className="hover: text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Reset Form
                    </button>
                </div>
                </form>
            </div>
            {showAlert && (
                <Alert severity="error" onClose={() => setShowAlert(false)} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                    <AlertTitle>Error</AlertTitle>
                    An Error Happened! 'Server My Be Un Avail'
                </Alert>
            )}   {showSAlert && (
                <Alert severity="success" onClose={() => setShowAlert(false)} sx={{ position: 'fixed', bottom: 16, right: 16 }}>
                    <AlertTitle>Success</AlertTitle>
                    News Posted successfully!
                </Alert>
            )}
        </div>
    );
};

export default AddNewNews;
