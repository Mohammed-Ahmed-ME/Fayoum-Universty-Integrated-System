import React, {useEffect} from 'react';
import {useStateContext} from '../../contexts/ContextProvider';
import {GetMe, UserLogout} from '../API/API';
import {Link} from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import avatar from '../../Images/avatar.jpg';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import SvgIcon from "@mui/material/SvgIcon";

const NavButton = ({title, customFunc, icon, color, dotColor}) => {
    return (
        <div>
            <button
                type="button"
                onClick={() => customFunc()}
                style={{color}}
                className="relative text-xl rounded-full p-1 hover:bg-light-gray"
            >
          <span
              style={{background: dotColor}}
              className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
          />
                {icon}
            </button>
        </div>
    );
};

const Navbar = () => {
    const {
        currentColor,
        activeMenu,
        setActiveMenu,
        setScreenSize,
        setTheme,
        screenSize,
        setThemeSettings,
        ThemeMood,
        setRole,
        setUserData,
        UserData
    } = useStateContext();

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
        window.addEventListener('resize', handleResize);
        handleResize()
        return () => window.removeEventListener('resize', handleResize);
    });

    useEffect(() => {

        GetMe()
            .then(async (User) => {
                await setRole(User.data.role);
                await setUserData(User.data);
            })
            .catch((error) => {
                console.log("Error Fetching Data:", error);
            });
    }, [setRole, setUserData]);


    useEffect(() => {
        if (screenSize <= 900) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize, setActiveMenu]);


    const handleClickMood = () => {
        const newTheme = ThemeMood === "Light" ? "Dark" : "Light";
        setTheme(newTheme);
        localStorage.setItem("Mood", newTheme);
    };

    const LogOut = async () => {
        const token = localStorage.getItem('token');
        try {
            if (token) {
                await UserLogout().then(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('Role');
                    window.location.href = '/login';
                });
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('Role');
                window.location.href = '/login';
            }
        } catch (e) {
            localStorage.removeItem('token');
            localStorage.removeItem('Role');
            window.location.href = '/login';
        }
    };

    const handleActiveMenu = () => setActiveMenu(!activeMenu);

    const imgSrc = UserData && UserData.img ? 'data:image/jpg;base64,' + UserData.img : avatar;
    return (
        <>
            <nav className=" fixed top-0 left-0 right-0 z-10 bg-opacity-50  backdrop-blur  ">
                <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
                    <NavButton
                        title="Menu"
                        customFunc={handleActiveMenu}
                        color={currentColor}
                        icon={<WidgetsOutlinedIcon sx={{fontSize: 30}}/>}
                    />
                    <div className="flex">
                        <Link to={UserData.role !== "Gust" ? '/My Profile' : '/Login'}>
                            <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                                <img className="rounded-full w-8 h-8 border-2" src={imgSrc} alt="user-profile"/>
                                <p style={{color: currentColor}}>
                                    <span className="font-bold text-xl">Hi,</span>{' '}
                                    {UserData && UserData.name && (
                                        <span className="font-bold ml-1 text-lg">{UserData.name}</span>
                                    )}
                                </p>
                            </div>
                        </Link>


                        <div
                            className="flex items-center justify-center cursor-pointer mt-1 hover:bg-gray-400 rounded-lg w-8 h-8 border-1 ml-2 border-blue-500">
                            <button style={{color: currentColor}} onClick={() => handleClickMood()}>
                                {ThemeMood === "Light" ? <LightModeOutlinedIcon/> : <DarkModeOutlinedIcon/>}
                            </button>
                        </div>
                        <div
                            className="flex items-center justify-center cursor-pointer mt-1 hover:bg-gray-400 rounded-lg w-8 h-8 border-1 ml-2 border-blue-500">
                            <button style={{color: currentColor}} onClick={() => setThemeSettings(true)}>
                                <SvgSettingIcon sx={{fontSize: 40}}/>
                            </button>
                        </div>

                        <div
                            className="flex items-center justify-center cursor-pointer mt-1 hover:bg-gray-400 rounded-lg w-8 h-8 border-1 border-blue-500 ml-2">
                            <button onClick={LogOut} style={{color: currentColor}}>
                                <LogoutIcon/>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;

const SvgSettingIcon = () => {
    return (
        <SvgIcon sx={{fontSize: 30}}>
            <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
                />
            </svg>
        </SvgIcon>
    );
}
