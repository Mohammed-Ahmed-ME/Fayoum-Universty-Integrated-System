import React, {useState} from 'react';
import {GetUser} from "../../API/API";
import {useStateContext} from "../../../contexts/ContextProvider";
import SearchIcon from '@mui/icons-material/Search';

const GetRequest = () => {
    const [userData, setUserData] = useState(null);
    const [nationalID, setNationalID] = useState("");
    const {currentColor, UserData} = useStateContext();
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
                                    style={{color: currentColor}}
                                    onClick={handleGetUser}
                                >
                                    <SearchIcon sx={{fontSize: 30}}/>
                                </button>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className="mt-10">
                        <figure
                            key={UserData?.requestId}
                            className="md:flex bg-slate-300 rounded-xl p-8 md:p-0 dark:bg-slate-800 m-5 relative"
                        >
                            <img
                                className="w-32 h-32 md:h-42 md:w-42 md:rounded-ful  rounded-full mx-auto md:mx-10 my-auto border-8"
                                src={`data:image/jpg;base64, ${UserData?.img}`}
                                alt=""
                                width="384"
                                height="512"
                            />
                            <div className="pt-6 md:p-8 text-center md:text-left space-y-4">
                                <figcaption className="font-medium">
                                    <div className="text-sky-500 dark:text-sky-300 text-2xl">{UserData?.name}</div>
                                    <div className="text-slate-700 dark:text-slate-200 pl-3">
                                        {UserData?.role === 'Student' ? `${UserData?.role} ${UserData?.academicYear}` : UserData?.role}
                                    </div>
                                </figcaption>
                                <blockquote>
                                    <div className="text-sky-600 dark:text-sky-400 text-xl">Category:</div>
                                    <div
                                        className="text-sky-600 dark:text-sky-200 text-lg pl-2"> {UserData?.category} </div>
                                    <div className="text-sky-600 dark:text-sky-400 text-xl">Request:</div>
                                    <div
                                        className="text-lg font-medium dark:text-white pl-2 ">{UserData?.userRequest}</div>
                                    <br/>
                                </blockquote>
                                <figcaption className="font-medium">
                                    <div className="text-slate-700 dark:text-slate-200">
                                        <div className="text-sky-600 dark:text-sky-400 text-xl">Info:</div>
                                        <p className="text-slate-700 dark:text-slate-200">Request
                                            ID: {UserData?.requestId}   </p>
                                        <p className="text-slate-700 dark:text-slate-200">Faculty
                                            Of: {UserData?.faculty}  </p>
                                        <p className="text-slate-700 dark:text-slate-200">To: {UserData?.sendTo}   </p>
                                        {getCairoDateTime(UserData?.createdAt)}
                                    </div>
                                    <button
                                        className="flex my-4 justify-center mx-auto md:mx-0 text-center items-center">
                                <span className=" text-sky-400 dark:text-sky-300   mr-2 text-center md:text-left"
                                >Request Status: </span>
                                        <div
                                            className="px-2 py-1 rounded-xl  "
                                            style={{
                                                backgroundColor:
                                                    UserData?.status === 'Accepted'
                                                        ? 'green'
                                                        : UserData?.status === 'Rejected'
                                                            ? 'red'
                                                            : 'orange',
                                                color:
                                                    UserData?.status === 'Accepted'
                                                        ? 'white'
                                                        : UserData?.status === 'Rejected'
                                                            ? 'white'
                                                            : 'black',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {UserData?.status}
                                        </div>
                                    </button>
                                    {UserData?.agreedBy !== "" && (
                                        <div className="flex flex-col">
                                            <div className="flex items-center mb-2">
                                                <div>
                                                    <p className="flex-col text-sky-400 dark:text-sky-300 mr-2 text-center md:text-left">
                                                        Response By: {UserData?.agreedBy}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    )}
                                    {UserData?.response !== "" && (
                                        <div className="flex flex-col">
                                            <div className="flex items-center mb-2">
                                                <div>
                                                    <p className="flex-col text-sky-400 dark:text-sky-300 mr-2 text-center md:text-left">
                                                        Response: {UserData?.response}
                                                    </p>

                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </figcaption>
                            </div>
                        </figure>
                    </div>
                )
                }
            </div>
        )
};
export default GetRequest;
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