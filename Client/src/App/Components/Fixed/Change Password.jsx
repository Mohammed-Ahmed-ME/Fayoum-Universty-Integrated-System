import React, {useEffect, useRef, useState} from 'react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import {Button} from '../index';
import PasswordIcon from "@mui/icons-material/Password";
import {UpdateUserPassword} from "../../API/API";

const ChangePassword = ({onClose}) => {
    const [response, setResponse] = useState("");
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setResponse('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [response]);

    const handleUpdatePassword = async () => {
        const oldPassword = oldPasswordRef.current.value;
        const newPassword = newPasswordRef.current.value;
        const res = await UpdateUserPassword(oldPassword, newPassword);
        setResponse(res);
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg dark:text-gray-200">Change Password</p>
                    <Button
                        onClick={handleCancel}
                        icon={<HighlightOffOutlinedIcon sx={{fontSize: 35}}/>}
                        color="rgb(153, 171, 180)"
                        bgHoverColor="light-gray"
                        size="xl"
                        borderRadius="50%"
                    />
                </div>
                <form>
                    <div>
                        <div
                            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
                            <div style={{color: 'rgb(0, 194, 146)'}}
                                 className="text-xl rounded-lg p-3 hover:bg-light-gray mt-1">
                                <PasswordIcon/>
                            </div>
                            <div>
                                <p className="font-semibold dark:text-white">Enter The Old Password</p>
                                <input id="old" ref={oldPasswordRef}
                                       className="text-black text-lg h-8 w-full bg-gray-20 rounded-lg p-2 bg-gray-300"/>
                            </div>
                        </div>
                        <div
                            className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer dark:hover:bg-[#42464D]">
                            <div style={{color: 'rgb(0, 194, 146)'}}
                                 className="text-xl rounded-lg p-3 mt-1 hover:bg-light-gray">
                                <PasswordIcon/>
                            </div>
                            <div>
                                <p className="font-semibold dark:text-white">Enter The New Password</p>
                                <input id="new" ref={newPasswordRef}
                                       className="text-black text-lg h-8 w-full bg-gray-20 rounded-lg p-2 bg-gray-300"/>
                            </div>
                        </div>
                    </div>
                    <p>{response}</p>
                    <div className="mt-5 bg-blue-600 rounded-lg">
                        <Button
                            color="white"
                            text="Update"
                            borderRadius="10px"
                            width="full"
                            onClick={handleUpdatePassword}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;
