import MailLockIcon from '@mui/icons-material/MailLock';
import PasswordIcon from '@mui/icons-material/Password';
import "./Login.css";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {PORT} from "../../API/API";
import image1 from "../../../Images/1.png"
import image2 from "../../../Images/2.png"
import image3 from "../../../Images/3.png"
import image4 from "../../../Images/4.png"
import image5 from "../../../Images/5.png"
import image6 from "../../../Images/6.png"
import Logo from "../../../Images/FYM-University-Logo.ico"
import Name from "../../../Images/Name.png"
import FCI from "../../../Images/FCI.png"

function Login() {
    const [currentAction, setCurrentAction] = useState("");
    const [backgroundImage, setBackgroundImage] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentAction("");
        }, 5000);
        return () => clearTimeout(timer);
    }, [currentAction]);
    useEffect(() => {
        const images = [image1, image2, image3, image4, image5, image6,];

        const randomImage = images[Math.floor(Math.random() * images.length)];
        setBackgroundImage(randomImage);
    }, []);
    const CheckAuth = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        try {
            const response = await axios({
                method: "POST", url: PORT + "/Login/User", headers: {
                    "Content-Type": "application/json; charset=utf-8",
                }, data: {
                    email: email, password: password,
                },
            });
            const token = response.data.token;
            const Role = response.data.Role;
            localStorage.setItem("Role", Role)
            localStorage.setItem('token', token);
            console.log(token);
            window.location.href = "/"
        } catch (e) {
            if (typeof e.response === 'object') setCurrentAction("Invalid Email or Password !!");

            else {
                setCurrentAction("Server Is Not Available! ")
            }
        }
    };
    return (<section className="bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${backgroundImage})`}}>
            <img src={Logo} alt="Universty Logo" className="absolute top-5 left-4 w-22 h-20"/>
             <img src={FCI} alt="Programmer Logo" className="absolute top-5 right-4 w-22 h-20 "/>
            <div className="login-box effect-holder dropdown-style">
                <form onSubmit={CheckAuth}>
                    <h2 className="color-text-h2">Fayoum University</h2>
                    <h2>Login</h2>
                    <div className="input-box">
                        <MailLockIcon className="icon"/>
                        <input type="email" name="email" required/>
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <PasswordIcon className="icon"/>
                        <input type="password" name="password" required/>
                        <label>Password</label>
                    </div>
                    <h3 className="flex flex-wrap lg:flex-nowrap justify-center text-lg pb-2 items-center text-center sm:text-xl md:text-xl lg:text-xl xl:text-xl text-red-500">
                        {currentAction}
                    </h3>
                    <button className="LoginButton" type="submit">
                        Login
                    </button>
                    <p className="P-style"> Have a Problem ? <span> Contact to Your Administrator</span></p>
                </form>

            </div>
            <img src={Name} alt="Programmer Logo" className="absolute bottom-5  " style={{width: '450px'}}/>

        </section>);
}

export default Login;
