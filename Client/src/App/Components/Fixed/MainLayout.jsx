import { Navbar, Footer, Sidebar, ThemeSettings } from '../index';
import {Outlet} from 'react-router-dom'
import {useStateContext} from "../../../contexts/ContextProvider";
import  {Weather,Time} from "./Weather&Time";
import React from "react";
const MainLayout = () => {
const Mood = localStorage.getItem('Mood')
    const { activeMenu, themeSettings } = useStateContext();
    return (
        <div className={Mood === 'Dark' ? 'dark' : ''} >
            <div className="flex relative dark:bg-slate-900 overflow-x-auto" >
                {activeMenu ? (
                    <div className="w-72 fixed sidebar dark:bg-slate-900 bg-white min-h-screen ">
                        <Sidebar />
                    </div>
                ) : (
                    <div className="w-0 dark:bg-slate-900 min-h-screen " >
                        <Sidebar />
                    </div>
                )}
                <div
                    className={
                        activeMenu
                            ? 'dark:bg-slate-900 bg-main-bg min-h-screen md:ml-72 w-full'
                            : 'bg-main-bg dark:bg-slate-900 w-full min-h-screen flex-2'
                    }
                >
                    <div className="fixed md:static bg-main-bg dark:bg-slate-900 navbar w-full" >
                        <Navbar />
                    </div>
                    <div className="flex md:static  pt-6 pl-10 pr-10 w-full justify-between pb-4 mt-10">
                        <div className="flex items-center">
                            <Time />
                        </div>
                        <div className="flex items-center">
                            <Weather/>
                        </div>
                    </div>
                    <div className="dark:bg-slate-900" >
                        {themeSettings && <ThemeSettings />}
                        <Outlet/>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
