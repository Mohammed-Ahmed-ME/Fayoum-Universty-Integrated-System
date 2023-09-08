import React, { useEffect, useState } from 'react';
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import { GetUsersData } from "../../API/API";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import GradingOutlinedIcon from '@mui/icons-material/GradingOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import SchoolIcon from '@mui/icons-material/School';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';

import { useStateContext } from "../../../contexts/ContextProvider";

const Home = () => {
    const [UsersData, setUsersData] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const Detail = await GetUsersData();
                setUsersData(Detail.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const SummaryData = [
        {
            icon: <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.FullAdministrators || 0,
            title: 'Full Administrators',
        },
        {
            icon: <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.Administrators || 0,
            title: 'Administrators',
        },
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.Professors || 0,
            title: 'Professors',
        },
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.AssistantProfessors || 0,
            title: 'Assistant Professors',
        },
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.TeachingAssistants || 0,
            title: 'Teaching Assistants',
        },
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.ResearchAssistants || 0,
            title: 'Research Assistants',
        },
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.Students || 0,
            title: 'Students',
        },
        {
            icon: <RequestQuoteIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.AcceptedReq + UsersData.RejectedReq + UsersData.PendingReq || 0,
            title: 'Mail',
        },
    ];

    const StudentsDetail = [
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.Students || 0,
            title: 'All Students',
            desc: 'All Students in University',
            iconColor: '#03C9D7',
        },
        {
            icon: <LooksOneIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.FirstYear || 0,
            title: 'First Year Students',
            desc: 'All Students In The 1st Year',
        },
        {
            icon: <LooksTwoIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.SecondYear || 0,
            title: 'Second Year Students',
            desc: 'All Students In The Second Year',
        },
        {
            icon: <Looks3Icon sx={{ fontSize: 40 }} />,
            amount: UsersData.ThirdYear || 0,
            title: 'Third Year Students',
            desc: 'All Students In The Third Year',
        },
        {
            icon: <Looks4Icon sx={{ fontSize: 40 }} />,
            amount: UsersData.FourthYear || 0,
            title: 'Fourth Year Students',
            desc: 'All Students In 4th Year',
        },
        {
            icon: <Looks5Icon sx={{ fontSize: 40 }} />,
            amount: UsersData.FifthYear || 0,
            title: 'Fifth Year Students',
            desc: 'The Students In 5th Year',
        },
    ];

    const Staff = [
        {
            icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.FullAdministrators || 0,
            title: 'Full Administrators',
            desc: 'All Administrators in University',
        },
        {
            icon: <AdminPanelSettingsOutlinedIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.Administrators || 0,
            title: 'Administrators',
            desc: 'All Administrators in University',
        },
        {
            icon: <SchoolOutlinedIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.Professors || 0,
            title: 'Professors',
            desc: 'All Professors in University',
        },
        {
            icon: <SchoolOutlinedIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.AssistantProfessors || 0,
            title: 'Assistant Professors',
            desc: 'All Assistant Professors in University',
        },
        {
            icon: <SchoolOutlinedIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.TeachingAssistants || 0,
            title: 'Teaching Assistants',
            desc: 'All Teaching Assistants in University',
        },
        {
            icon: <SchoolOutlinedIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.ResearchAssistants || 0,
            title: 'Research Assistants',
            desc: 'All Research Assistants in University',
        },
    ];

    const RequestData = [
        {
            icon: <GradingOutlinedIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.AcceptedReq || 0,
            title: 'Accepted Mail',
            desc: 'All Accepted Mail',
        },
        {
            icon: <CancelOutlinedIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.RejectedReq || 0,
            title: 'Rejected Mail',
            desc: 'All Rejected Mail',
        },
        {
            icon: <PendingActionsOutlinedIcon sx={{ fontSize: 40 }} />,
            amount: UsersData.PendingReq || 0,
            title: 'Pending Mail',
            desc: 'All Pending Mail',
        },
    ];

    const { currentColor } = useStateContext();


    if (UsersData === null) {
        return <p className="text-6xl text-center m-auto mt-1/2">Loading...</p>;
    }
    return (
        <div className="mt-10">
            <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl"
                style={{color: currentColor}}>Fayoum University Admin Dashboard</h1>

            <div className="flex flex-wrap lg:flex-nowrap justify-center">
                <div className="flex m-3 flex-wrap justify-center gap-4 items-center">
                    {SummaryData.map((item) => (
                        <div
                            key={item.title}
                            className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl flex flex-col items-center justify-center">
                            <button
                                type="button"
                                style={{color: currentColor, fontSize: 40}}
                                className="text-3xl  hover:drop-shadow-xl"
                            >
                                {item.icon}
                            </button>
                            <p className="mt-4">
                                <span className="text-lg ">{item.amount}</span>
                            </p>
                            <p className="text-xl  font-bold mt-1">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-10 m-4 flex-wrap justify-center">
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
                    <div className="flex justify-between items-center gap-2">
                        <p className="text-xl font-semibold">Students Details</p>
                    </div>
                    <div className="mt-10 w-72 md:w-400">
                        {StudentsDetail.map((item) => (
                            <div key={item.title} className="flex justify-between mt-4">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        style={{
                                            color: currentColor,
                                            fontSize: 40
                                        }}
                                        className="text-2xl rounded-lg p-1 hover:drop-shadow-xl "
                                    >
                                        {item.icon}
                                    </button>
                                    <div>
                                        <p className="text-md font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                                <p>{item.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
                    <div className="flex justify-between items-center gap-2">
                        <p className="text-xl font-semibold">Working Staff</p>
                    </div>
                    <div className="mt-10 w-72 md:w-400">
                        {Staff.map((item) => (
                            <div key={item.title} className="flex justify-between mt-4">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        style={{
                                            color: currentColor,
                                            fontSize: 40
                                        }}
                                        className="text-2xl rounded-lg p-1 hover:drop-shadow-xl "
                                    >
                                        {item.icon}
                                    </button>
                                    <div>
                                        <p className="text-md font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                                <p>{item.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
                    <div className="flex justify-between items-center gap-2">
                        <p className="text-xl font-semibold">Request Info</p>
                    </div>
                    <div className="mt-10 w-72 md:w-400">
                        {RequestData.map((item) => (
                            <div key={item.title} className="flex justify-between mt-4">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        style={{
                                            color: currentColor,
                                            fontSize: 40
                                        }}
                                        className="text-2xl rounded-lg p-1 hover:drop-shadow-xl "
                                    >
                                        {item.icon}
                                    </button>
                                    <div>
                                        <p className="text-md font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-400">{item.desc}</p>
                                    </div>
                                </div>
                                <p>{item.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Home;


