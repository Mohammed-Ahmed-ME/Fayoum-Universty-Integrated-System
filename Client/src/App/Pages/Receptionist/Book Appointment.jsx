import React, { useState, useEffect } from 'react';
import { NewUser } from "../../API/API";
import { Facultys, Genders, Nationalities, Roles, Years } from "../../API/DataSource";
import { useStateContext } from "../../../contexts/ContextProvider";
import { Header } from "../../Components";

const BookAppointement = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nationality, setNationality] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [academicYear, setAcademicYear] = useState('None');
    const [role, setRole] = useState('');
    const [faculty, setFaculty] = useState('');
    const [nationalID, setNationalID] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [currentAction, setCurrentAction] = useState('');

    const AddUser = async (e) => {
        e.preventDefault();
        if (role !== "Student") {
            setAcademicYear("None");
        }
        if (nationalID.length < 14) {
            setCurrentAction('National ID Must Have at Least 14 Digits');
            return;
        }

        try {
            const user = {
                name,
                nationalID,
                email,
                gender,
                password,
                nationality,
                age,
                address,
                phone,
                academicYear,
                faculty,
                role
            };

            const response = await NewUser(user);
            setCurrentAction(response.data);
        } catch {
            setCurrentAction('Server is not available');
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentAction('');
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentAction]);

    const handleReset = () => {
        setName('');
        setNationalID('');
        setAge('');
        setGender('');
        setFaculty('');
        setAcademicYear('');
        setPhone('');
        setAddress('');
        setNationality('');
        setPassword('');
        setEmail('');
        setCurrentAction('');
        setRole('');
    };

    const { currentColor } = useStateContext();
        return (
            <div className="mt-10">
                <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-3xl font-bold pb-4 items-center text-center sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl" style={{ color: currentColor }}>Book Appointment</h1>
                <div className="m-2 md:m-10 mt-24 p-2 md:p-5   rounded-3xl" style={{ backgroundColor: currentColor }}>
                    <div   className="bg-white p-5 rounded-xl"              >
                        <Header category="Form" title="Add One" />
                        <form onSubmit={AddUser}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="font-semibold mb-2">
                                        Name:
                                    </label>
                                    <input
                                        id="name"
                                        value={name}
                                        placeholder="Mohammed Ahmed"
                                        onChange={e => setName(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 h-12"
                                        required
                                    />
                                </div>
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
                                    <label htmlFor="email" className="font-semibold mb-2">
                                        Email:
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email }
                                        placeholder="example@fayom.edu.eg"
                                        onChange={e => setEmail(e.target.value )}
                                        className="border border-gray-300 rounded-md p-2 h-12"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="nationality" className="font-semibold mb-2">
                                        Nationality:
                                    </label>
                                    <select
                                        id="nationality"
                                        value={nationality}
                                        onChange={e => setNationality(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 h-12"
                                        required
                                    >
                                        <option value="">Select Nationality</option>
                                        {Nationalities.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col">
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
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="faculty" className="font-semibold mb-2">
                                        Faculty:
                                    </label>
                                    <select
                                        id="faculty"
                                        value={faculty}
                                        onChange={e => setFaculty(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 h-12"
                                        required
                                    >
                                        <option value="">Select Faculty</option>
                                        {Facultys.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="role" className="font-semibold mb-2">
                                        Role:
                                    </label>
                                    <select
                                        id="role"
                                        value={role}
                                        onChange={e => setRole(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 h-12"
                                        required
                                    >
                                        <option value="">User Role</option>
                                        {Roles.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="address" className="font-semibold mb-2">
                                        Address:
                                    </label>
                                    <input
                                        id="address"
                                        value={address}
                                        placeholder="ex: Egypt-Fayoum"
                                        onChange={e => setAddress(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 h-12"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="gender" className="font-semibold mb-2">
                                        Gender:
                                    </label>
                                    <select
                                        id="gender"
                                        value={gender}
                                        onChange={e => setGender(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 h-12"
                                        required
                                    >
                                        <option value="">Gender</option>
                                        {Genders.map(option => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="phone" className="font-semibold mb-2">
                                        Phone:
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        placeholder="+201xxxxxxxxx"
                                        onChange={e => setPhone(e.target.value)}
                                        className="border border-gray-300 rounded-md p-2 h-12"
                                        required
                                    />
                                </div>
                                {role === "Student" && (
                                    <div className="flex flex-col">
                                        <label htmlFor="academicYear" className="font-semibold mb-2">
                                            Academic Year:
                                        </label>
                                        <select
                                            id="academicYear"
                                            value={academicYear}
                                            onChange={e => setAcademicYear(e.target.value)}
                                            className="border border-gray-300 rounded-md p-2 h-12"
                                            required
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
                                    style={{backgroundColor:currentColor}}
                                    className=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    style={{backgroundColor:currentColor}}
                                    onClick={handleReset}
                                    className=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Reset Form
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
};

export default BookAppointement;
