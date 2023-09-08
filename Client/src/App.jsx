import React, {useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {
    AddMany,
    Administrator,
    AssistantProfessor,
    FullAdministrators,
    Home,
    Login,
    NewUser,
    Professor,
    ResearchAssistant,
    Students,
    TeachingAssistant,
    UserProfile,
    AddNewRequest,
    Inbox,
    Outbox,
    AddNewNews,
    Own,
    Global,
    Posted,
    AddSubject,
    RemoveSubject,
    EditSubject,
    EditUser,
    ResetUserPassword,
    GetUserDetail, GetRequest
} from './App/Pages';
import './App.css';
import {useStateContext} from './contexts/ContextProvider';
import MainLayout from './App/Components/Fixed/MainLayout';
import Welcome from './App/Pages/User/Welcome';
import Error from './App/Pages/404';
import BookAppointment from "./App/Pages/Receptionist/Book Appointment";


let Routs = [{ path: '/',  element: <Welcome />   },
    { path: '/Welcome', element: <Welcome/> } ,
    { path: '/Quick Overview', element: <Home/> },
    { path: '/Full Administrators', element: <FullAdministrators/> },
    { path: '/Administrators', element: <Administrator/>, },
    { path: '/Assistant Professors', element: <AssistantProfessor/> },
    { path: '/Professors', element: <Professor/>},
    { path: '/Teaching Assistants', element: <TeachingAssistant /> },
    { path: '/Research Assistants', element: <ResearchAssistant /> },
    { path: '/New User', element: <NewUser /> },
    { path: '/New Users', element: <AddMany /> },
    { path: '/students', element: <Students/> },
    { path: '/My Profile', element: <UserProfile /> },
    { path: '/Send', element: <AddNewRequest /> },
    { path: '/Inbox', element: <Inbox /> },
    { path: '/Outbox', element: <Outbox /> },
    { path: '/Global News', element: <Global /> },
    { path: '/Own News', element: <Own /> },
    { path: '/My Posted News', element: <Posted /> },
    { path: '/Post News', element: <AddNewNews /> },
    { path: '/Add Student Subject', element: <AddSubject /> },
    { path: '/Remove Student Subject', element: <RemoveSubject /> },
    { path: '/Edit Student Subject', element: <EditSubject /> },
    { path: '/Edit User', element: <EditUser /> },
    { path: '/Reset User Password', element: <ResetUserPassword /> },
    { path: '/Find Request', element: <GetRequest /> },
    { path: '/Book Appointment', element: <BookAppointment /> },
    { path: '/All Appointments', element: <GetRequest /> },
    { path: '/Add Report', element: <GetRequest /> },
    { path: '/Get User Info', element: <GetUserDetail /> },]
const App =  () => {
    const { setCurrentColor} = useStateContext();
    useEffect(() => {


        const CurrentThemeColor = localStorage.getItem('colorMode');
        if (CurrentThemeColor ) {
            setCurrentColor(CurrentThemeColor);
        }
        return () => {
        };
    }, [setCurrentColor]);

    let routes = [
        {
            path: '/',
            element: <MainLayout/>,
            errorElement: <Error/>,
            children: Routs,
        },
        {
            path: '/Login',
            element: <Login/>,
        },
    ];
    const router = createBrowserRouter(routes);
    return <RouterProvider router={router}/>;
};




export default App;




