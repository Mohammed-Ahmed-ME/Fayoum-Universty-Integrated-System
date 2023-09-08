import React, {useState, useEffect} from 'react';
import {UpdateUser, GetUser} from "../../API/API";
import {Facultys, Years} from "../../API/DataSource";
import {useStateContext} from "../../../contexts/ContextProvider";
import {Header} from "../../Components";

const EditUser = () => {
    const [name, setName] = useState('"   &   "');
    const [address, setAddress] = useState('"   &   "');
    const [phone, setPhone] = useState('"   &   "');
    const [academicYear, setAcademicYear] = useState('"   &   "');
    const [faculty, setFaculty] = useState('"   &   "');
    const [nationalID, setNationalID] = useState('');
    const [age, setAge] = useState('"   &   "');
    const [currentAction, setCurrentAction] = useState('');
    const Data = {name, address, phone, academicYear, faculty, age, nationalID}
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentAction('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentAction]);
    const GetUserDetails = async (e) => {
        e.preventDefault()
        try {
            const user = await GetUser(nationalID)
            if (user.data) {
                setName(user.data.name);
                setNationalID(user.data.nationalID);
                setAge(user.data.age);
                setFaculty(user.data.faculty);
                setAcademicYear(user.data.academicYear);
                setPhone(user.data.phone);
                setAddress(user.data.address);
            } else {
                setCurrentAction("Cant Find User")
            }
        } catch (err) {
            console.log(err)
            setCurrentAction(err.response)
        }
    }
    const handleReset = () => {
        setName('"   &   "');
        setNationalID('');
        setAge('"   &   "');
        setFaculty('"   &   "');
        setAcademicYear('"   &   "');
        setPhone('"   &   "');
        setAddress('"   &   "');
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

    const { currentColor,UserData } = useStateContext();
    if(UserData.role !== "Full Administrator")
    {
        window.location.href = "/Login"
        return null
    }
    else
    return (
        <div className="mt-10">
            <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl"
                style={{color: currentColor}}>Edit User</h1>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10  bg-white rounded-3xl ">
                <Header category="Form" title="Edit User"/>
                <form onSubmit={GetUserDetails}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {name !== '"   &   "' && (<div className="flex flex-col">
                            <label htmlFor="name" className="font-semibold mb-2">
                                Name:
                            </label>
                            <input
                                id="name"
                                value={name}
                                placeholder="Mohammed Ahmed"
                                onChange={e => setName(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"
                            />
                        </div>)}
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
                        {age !== '"   &   "' && (<div className="flex flex-col">
                            <label htmlFor="age" className="font-semibold mb-2">
                                Age:
                            </label>
                            <input
                                id="age"
                                type="number"
                                value={age}
                                placeholder="User Age ex:18"
                                onChange={e => setAge(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"

                            />
                        </div>)}
                        {faculty !== '"   &   "' && (<div className="flex flex-col">
                            <label htmlFor="faculty" className="font-semibold mb-2">
                                Faculty:
                            </label>
                            <select
                                id="faculty"
                                value={faculty}
                                onChange={e => setFaculty(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"

                            >
                                <option value="">Select Faculty</option>
                                {Facultys.map(option => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>)}
                        {address !== '"   &   "' && (<div className="flex flex-col">
                            <label htmlFor="address" className="font-semibold mb-2">
                                Address:
                            </label>
                            <input
                                id="address"
                                value={address}
                                placeholder="ex: Egypt-Fayoum"
                                onChange={e => setAddress(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12"

                            />
                        </div>)}
                        {phone !== '"   &   "' && (<div className="flex flex-col">
                            <label htmlFor="phone" className="font-semibold mb-2">
                                Phone:
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={phone}
                                placeholder="+201xxxxxxxxx"
                                onChange={e => setPhone(e.target.value)}
                                className="border border-gray-300 rounded-md p-2 h-12 "

                            />
                        </div>)}
                        {academicYear !== '"   &   "' && (
                            <div className="flex flex-col">
                                <label htmlFor="academicYear" className="font-semibold mb-2">
                                    Academic Year:
                                </label>
                                <select
                                    id="academicYear"
                                    value={academicYear}
                                    onChange={e => setAcademicYear(e.target.value)}
                                    className="border border-gray-300 rounded-md p-2 h-12"

                                >
                                    <option value="">Select Academic Year</option>
                                    {Years.map(option => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
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
                            Search For User
                        </button>
                        {name !== '"   &   "' && (<button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleUpdate}
                        >
                            Update User Data
                        </button>)}
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

export default EditUser;
