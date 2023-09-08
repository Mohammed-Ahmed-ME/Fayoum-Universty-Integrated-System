import React, { createContext, useContext, useState } from 'react';
import HomeIcon from "@mui/icons-material/Home";

const StateContext = createContext(undefined, undefined);

const Mood = localStorage.getItem('Mood')
if (!Mood){
  localStorage.setItem('Mood', "Light")
}
const Welcome = {
  title: 'Home',
  links: [
    {
      name: 'Welcome',
      icon: <HomeIcon />,
    }
  ]
}
export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#03C9D7');
  const [ThemeMood, setTheme] = useState(Mood);
  const [themeSettings, setThemeSettings] = useState(false);
  const [Role, setRole] = useState("Gust");
  const [SideBar, setSidebar] = useState([Welcome]);
  const [activeMenu, setActiveMenu] = useState(true);
  const [UserData, setUserData] = useState({
    name: 'Gust',
    role: 'Gust',
    faculty: 'Fayoum Universty',
  });
  const [UserRouts, setUserRouts] = useState();


  return (
    <StateContext.Provider value={{setUserRouts,UserRouts,setUserData,UserData,Role , setRole ,SideBar , setSidebar,ThemeMood , currentColor, activeMenu, screenSize, setScreenSize, setActiveMenu, setCurrentColor, setTheme, themeSettings, setThemeSettings }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
