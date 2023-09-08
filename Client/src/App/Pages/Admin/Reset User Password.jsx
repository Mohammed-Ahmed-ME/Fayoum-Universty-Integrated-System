import React, {useState, useEffect} from 'react';
import {UpdateUser} from "../../API/API";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Header} from "../../Components";

const ResetUserPassword = () => {
    const [nationalID, setNationalID] = useState('');
    const [password, setPassword] = useState('');
    const [currentAction, setCurrentAction] = useState('');
    const Data = { password, nationalID}
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentAction('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentAction]);
    const handleReset = () => {
        setNationalID('');
        setPassword('');
        setCurrentAction('');
    };
    const handleUpdate = (e) => {
        e.preventDefault()
        try {
            UpdateUser(Data).then((Data) => {
                setCurrentAction(Data.data)
            }).catch(() => {
                setCurrentAction("Something Wrong happened Try Again Later")
            })
        }catch (error){
            setCurrentAction("Something Wrong happened Try Again Later")
        }

    }

    const {currentColor} = useStateContext();

    return (
        <div className="mt-10">
            <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl"
                style={{color: currentColor}}>Reset Password</h1>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10  bg-white rounded-3xl ">
                <Header category="Form" title="Reset User"/>
                <form onSubmit={handleUpdate}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="nationalID" className="font-semibold mb-2">
                                National ID:
                            </label>
                            <input
                                type="number"
                                id="nationalID"
                                value={nationalID}
                                placeholder="3xxxxxx23xxxx"
                                onChange={e => setNationalID(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"
                                required

                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="password" className="font-semibold mb-2">
                                New Password:
                            </label>
                            <input
                                id="password"
                                type="text"
                                value={password}
                                placeholder="Enter New Password "
                                onChange={e => setPassword(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"

                            />
                        </div>
                    </div>
                    {currentAction && (
                        <div className="mt-8 p-2 rounded-md bg-red-200 text-red-700 font-medium text-center">
                            {currentAction}
                        </div>
                    )}
                    <div className="flex justify-center mt-10 space-x-5">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Reset User Password
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

export default ResetUserPassword;
