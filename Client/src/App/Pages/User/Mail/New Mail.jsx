import React, { useState, useEffect } from 'react';
import { Button, Header } from "../../../Components";
import { useStateContext } from "../../../../contexts/ContextProvider";
import { PostNewMail } from "../../../API/API";
import {
    AcademicRequests,
    CareerandInternshipRequests, Emails,
    FinancialAdministrativeRequests, HealthandWellbeingRequests, OtherRequests,
    RequestsCategory, StudentServicesRequests
} from "../../../API/DataSource";
import PrivacyTipOutlinedIcon from '@mui/icons-material/PrivacyTipOutlined';
import {Popover, Typography} from "@mui/material";
const NewRequest = () => {
    const [Request, setRequest] = useState('');
    const [category, setCategory] = useState('');
    const [sendTo, setSendTo] = useState('');
    const [nationalID, setNational_id] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [currentAction, setCurrentAction] = useState('');

    const AddRequest = async (e) => {
        e.preventDefault();
        if (Request!== "")
      {if (sendTo.endsWith("@fayoum.edu.eg"))
        {
        try {
            const RequestData = {
                nationalID,
                Request,
                sendTo,
                category
            };
            const Add = await PostNewMail(RequestData);
            if (Add.data.includes('validation failed:')) {
                setCurrentAction('Validation Login: Please fill in all the required fields');
            } else {
                setCurrentAction(Add.data);
            }
        } catch {
            setCurrentAction('Something went wrong,Please Full All Fields and Then Check For Duplicated Data!');
        }
        }
        else {
            setCurrentAction("Email Must Be In The Organization")
        }
      }
      else {
          setCurrentAction("Fill Out The Message First")
    }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentAction('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentAction]);

    const handleReset = () => {
        setNational_id('');
        setSendTo('');
        setRequest('');
        setCurrentAction('');
    };

    const { currentColor,UserData } = useStateContext();
    const handleHover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    let faculty = UserData.faculty;
   if( faculty === "Computers & AI")
       faculty = "Computers";
   else if( faculty === "Social Work")
       faculty = "SocialWork";
   else if( faculty === "Dar Al Uloom")
       faculty = "DarAlUloom";
   else if( faculty === "Specific Education")
       faculty = "SpecificEducation";
   else if( faculty === "Early Childhood Education")
       faculty = "EarlyChildhoodEducation";
   else if( faculty === "Nile Basin countries")
       faculty = "NileBasincountries";
   else if( faculty === "Physical Education")
       faculty = "PhysicalEducation";
   else if( faculty === "Institute of Nursing")
       faculty = "InstituteofNursing";

    const facultyData = Emails[faculty];


    const open = Boolean(anchorEl);
    const id = open ? 'hover-menu' : undefined;
    if(UserData.role === "Gust")
    {
        window.location.href = "/Login"
        return null
    }
    else
    return (
        <div className="mt-10" >
            <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl" style={{ color: currentColor }}>Add New Request</h1>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10  bg-white rounded-3xl relative ">
                <button className="absolute top-4 right-4" onClick={handleHover} >
                    <PrivacyTipOutlinedIcon />
                </button>
                <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 4 }}>
                        {facultyData.map((item, index) => (
                            <div key={index} >
                                Name: {item.name} <br />
                                Email: {item.email} <br />
                                Faculty: {item.faculty} <br />
                                <br />
                            </div>
                        ))}
                    </Typography>
                </Popover>
                <Header category="Form" title="Post Request" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="Request" className="font-semibold gap-4">
                            Category:
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 h-12 h-12 bg-white"
                            required
                        >
                            <option value="">Select Category</option>
                            {RequestsCategory.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                        { category === 'Academic Requests' && (
                            <div className="flex flex-col">
                        <label htmlFor="Request" className="font-semibold">
                            Request:
                        </label>
                        <select
                            id="Request"
                            dataSource = {AcademicRequests}
                            value={Request}
                            placeholder="Select Your Request"
                            onChange={(e) => setRequest(e.target.value)}
                            className="border border-gray-300 rounded-md p-2 h-12"
                        >
                            <option value="">Select Request</option>
                            {AcademicRequests.map(option => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                            </div>
                        )}
                        { category === 'Financial and Administrative Requests' && (
                        <div className="flex flex-col">
                            <label htmlFor="Request" className="font-semibold">
                                Request:
                            </label>
                            <select
                                id="Request"
                                value={Request}
                                placeholder="Select Your Request"
                                onChange={(e) => setRequest(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"
                            >
                                <option value="">Select Request</option>
                                {FinancialAdministrativeRequests.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    { category === 'Career and Internship Requests' && (
                        <div className="flex flex-col">
                            <label htmlFor="Request" className="font-semibold">
                                Request:
                            </label>
                            <select
                                id="Request"
                                value={Request}
                                placeholder="Select Your Request"
                                onChange={(e) => setRequest(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"
                            >
                                <option value="">Select Request</option>
                                {CareerandInternshipRequests.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                            { category === 'Health and Well-being Requests' && (
                        <div className="flex flex-col">
                            <label htmlFor="Request" className="font-semibold">
                                Request:
                            </label>
                            <select
                                id="Request"
                                value={Request}
                                placeholder="Select Your Request"
                                onChange={(e) => setRequest(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"
                            >
                                <option value="">Select Request</option>
                                {HealthandWellbeingRequests.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                         { category === 'Student Services Requests' && (
                        <div className="flex flex-col">
                            <label htmlFor="Request" className="font-semibold">
                                Request:
                            </label>
                            <select
                                id="Request"
                                value={Request}
                                placeholder="Select Your Request"
                                onChange={(e) => setRequest(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"
                            >
                                <option value="">Select Request</option>
                                {StudentServicesRequests.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    { category === 'Other Requests' && (
                        <div className="flex flex-col">
                            <label htmlFor="Request" className="font-semibold">
                                Request:
                            </label>
                            <select
                                id="Request"
                                value={Request}
                                placeholder="Select Your Request"
                                onChange={(e) => setRequest(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"
                            >
                                <option value="">Select Request</option>
                                {OtherRequests.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                       
                        { category === "Other" && (
                        <div className="flex flex-col">
                        <label htmlFor="Request" className="font-semibold">
                                    Request:
                                </label>
                            <input
                                id="Request"
                                value={Request}
                                placeholder="Enter The Request"
                                onChange={e => setRequest(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12 h-12"
                                required
                            />
                            </div>
                        )}

                    <div className="flex flex-col">
                        <label htmlFor="sendTo" className="font-semibold">
                            Send To:
                        </label>
                          <input
                                 id="sendTo"
                                 value={sendTo}
                                placeholder="Enter Target Person"
                                onChange={e => setSendTo(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12 h-12"
                                required
                            />
                    </div>
                </div>
                <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-lg pb-2 items-center text-center sm:text-sm md:text-lg lg:text-1xl xl:text-2xl" style={{ color: currentColor }}>
                    {currentAction}
                </h1>
                <div className="flex space-x-10 text-center justify-center items-center mt-4" >
                    <Button
                        color="white"
                        onClick={AddRequest}
                        bgColor={currentColor}
                        text="Post Request"
                        borderRadius="10px"
                    />
                    <Button
                        color="white"
                        onClick={handleReset}
                        bgColor={currentColor}
                        text="Reset"
                        borderRadius="10px"
                    />
                </div>
            </div>
        </div>
    );
};

export default NewRequest;
