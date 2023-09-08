import React, {useState} from 'react';
import avatar from '../../../Images/avatar.jpg';
import {GetUser} from "../../API/API";
import {useStateContext} from "../../../contexts/ContextProvider";
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import SearchIcon from '@mui/icons-material/Search';

const GetUserInfo = () => {
    const [userData, setUserData] = useState(null);
    const [nationalID, setNationalID] = useState("");
    const imgSrc = userData?.img ? "data:image/jpg;base64," + userData.img : avatar;
    const {currentColor,UserData} = useStateContext();
    let Role
    if (userData?.role === "Student") {
        Role = 'Student at ' + userData?.academicYear
    } else {
        Role = userData?.role
    }
    let totalScore = 0
    const score = () => {
        userData?.subjects.map((subject) => {
            if (subject.degree > 0)
                totalScore = Number(totalScore) + Number(subject.degree)
            return null
        })
    }
    score();
    const handleGetUser = () => {
        GetUser(nationalID)
            .then(data => {
                    console.log(data)
                    if (data.data)
                        setUserData(data.data);
                    else
                        setUserData(null)
                }
            )
            .catch(error => {
                console.error(error);
            });
    }
    const Data = [
        {
            title: UserData?.name,
            icon: <BadgeOutlinedIcon sx={{fontSize: 40}}/>
        }, {
            icon: <MarkEmailUnreadIcon sx={{fontSize: 40}}/>,
            title: UserData?.email
        },
        {
            icon: <CreditScoreIcon sx={{fontSize: 40}}/>,
            title: UserData?.nationalID
        },
        {
            icon: <AccountBalanceIcon sx={{fontSize: 40}}/>,
            title: UserData?.faculty
        },
        {
            icon: <BadgeOutlinedIcon sx={{fontSize: 40}}/>,
            title: UserData?.age
        },
        {
            icon: <SchoolIcon sx={{fontSize: 40}}/>,
            title: Role
        },
        {
            icon: <ContactPhoneIcon sx={{fontSize: 40}}/>,
            title: UserData?.phone
        },
        {
            icon: <LocationOnIcon sx={{fontSize: 40}}/>,
            title: UserData?.address
        }
    ]

    if(UserData.role !== "Full Administrator" && UserData.role !== "Administrator")
    {
        window.location.href = "/Login"
        return null
    }
    else
        return (
            <div className="mt-10 px-4">
                {userData === null ? (
                    <div className="flex justify-center items-center flex-col">
                        <label htmlFor="nationalID" className="font-semibold mb-2 text-2xl dark:text-white">
                            National ID:
                        </label>
                        <div className="flex justify-center items-center">
                            <div className="flex">
                                <input
                                    type="text"
                                    id="nationalID"
                                    value={nationalID}
                                    placeholder="Enter The National ID To Get User"
                                    className="focus:outline-none dark:text-white focus:ring focus:ring-blue-500 rounded-md bg-slate-300 dark:bg-slate-800 border-gray-300  p-2 h-12 w-96 md:w-400"

                                    onChange={(e) => setNationalID(e.target.value)}
                                />
                                <button
                                    className="hover:bg-blue-950 ml-4 mt-1 text-xl bg-slate-300 rounded-full w-10 h-10"
                                    style={{ color: currentColor }}
                                    onClick={handleGetUser}
                                >
                                    <SearchIcon sx={{ fontSize: 30 }} />
                                </button>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className="mt-10 px-4">
                        <div className="flex justify-end">
                            <button
                                className="hover:bg-blue-950 ml-4 mt-1 text-xl bg-slate-300 rounded-full w-10 h-10"
                                style={{ color: currentColor }}
                                onClick={()=>setUserData(null)}
                            >
                                <SearchIcon sx={{ fontSize: 30 }} />
                            </button>
                        </div>
                        <div className="justify-center items-center">
                            <p className="font-semibold text-3xl items-center dark:text-gray-200 text-center">{UserData?.name}'s Profile</p>
                            <p className="text-gray-500 text-xl dark:text-gray-400 text-center">{UserData?.role}</p>
                        </div>
                        <div className="flex gap-5 items-center justify-center mt-6 border-color border-b-1 pb-6">
                            <img
                                className="rounded-full h-72 w-72 border-8"
                                src={imgSrc}
                                alt="user-profile"
                            />
                        </div>
                        <div>
                            <div>
                                <p className="font-semibold text-3xl items-center dark:text-gray-200">Details:</p>
                            </div>
                            <div className="flex flex-wrap lg:flex-nowrap justify-center">
                                <div className="flex m-3 flex-wrap justify-center gap-4 items-center">
                                    {Data.map((card) => (
                                        <div className="flex m-3 flex-wrap justify-center gap-4 items-center" key={card.title}>
                                            <div className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl flex flex-col items-center justify-center">
                                                <button
                                                    type="button"
                                                    style={{ color: currentColor, fontSize: 40 }}
                                                    className="text-3xl hover:drop-shadow-xl"
                                                >
                                                    {card.icon}
                                                </button>
                                                <p className="mt-8 justify-center text-center items-center text-xl">{card.title}</p>
                                                <p className="text-xl font-bold mt-1"></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {(UserData?.role === "Student" || UserData?.subjects.length > 0) && (
                                <div>
                                    <div>
                                        <p className="font-semibold text-3xl items-center dark:text-gray-200">Subjects:</p>
                                    </div>
                                    <div className="flex flex-wrap justify-center">
                                        <div className="flex flex-wrap justify-center">
                                            <div className="flex flex-wrap justify-center">
                                                <div>
                                                    <div className="flex gap-3 flex-wrap justify-center">
                                                        {UserData?.subjects.map((figure, index) => (
                                                            <div className="mt-1 relative min-w-96" key={figure.subjectCode}>
                                                                <figure
                                                                    key={figure.name}
                                                                    className="md:flex bg-slate-300 rounded-xl flex-wrap gap-2 p-8 md:p-0 dark:bg-slate-800 m-5"
                                                                >
                                                                    <div className="pt-2 md:p-4 text-center md:text-left space-y-4">
                                                                        <p className="absolute lift-3 top-6 text-sky-950 text-lg dark:text-white">{index + 1}/{UserData?.subjects.length}</p>
                                                                        <figcaption className="pl-4 font-medium">
                                                                            <div className="text-sky-950 dark:text-sky-400 text-xl">
                                                                                <BadgeOutlinedIcon /> Subject Name: {figure.subjectName}
                                                                            </div>
                                                                            <div className="text-sky-950 dark:text-sky-400 text-xl">
                                                                                <QrCodeScannerOutlinedIcon /> Subject Code: {figure.subjectCode}
                                                                            </div>
                                                                            <div className="text-sky-950 dark:text-sky-400 text-xl">
                                                                                <WorkspacePremiumOutlinedIcon /> Subject Degree: {figure.degree}
                                                                            </div>
                                                                        </figcaption>
                                                                    </div>
                                                                </figure>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {(UserData?.role === "Student" || UserData?.subjects.length > 0) && (
                                <div>
                                    <h1 className="md:text-4xl text-2xl font-bold m-2 mb-8 text-slate-500 text-center">
                                        Total Score = {totalScore}, Total Subjects = {UserData?.subjects.length}
                                    </h1>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        );
};
export default GetUserInfo;