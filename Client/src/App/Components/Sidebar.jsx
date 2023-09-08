import React, {useEffect} from 'react';
import {Link, NavLink} from 'react-router-dom';
import Logo from "../../Images/FYM-University-Logo.ico";
import {useStateContext} from '../../contexts/ContextProvider';
import {AdminPanelSettings as AdminPanelSettingsIcon, AssuredWorkload as AssuredWorkloadIcon,
    AutoFixNormal as AutoFixNormalIcon, BorderColorOutlined as BorderColorOutlinedIcon,
    ControlPointOutlined as ControlPointOutlinedIcon, EditCalendarOutlined as EditCalendarOutlinedIcon,
    EmailOutlined as EmailOutlinedIcon, GroupAdd as GroupAddIcon, Home as HomeIcon, Key as KeyIcon,
    MarkAsUnreadOutlined as MarkAsUnreadOutlinedIcon, MarkEmailUnreadOutlined as MarkEmailUnreadOutlinedIcon,
    NewspaperOutlined as NewspaperOutlinedIcon, Person as PersonIcon, PersonAddAlt1 as PersonAddAlt1Icon,
    PostAddOutlined as PostAddOutlinedIcon, RemoveCircleOutlineOutlined as RemoveCircleOutlineOutlinedIcon,
    School as SchoolIcon, SchoolOutlined as SchoolOutlinedIcon , TravelExplore as TravelExploreIcon
} from "@mui/icons-material";


const Welcome = {
    title: 'Home',
    links: [
        {
            name: 'Welcome',
            icon: <HomeIcon/>,
        }
    ]
}
const Profile = {
    title: 'Profile',
    links: [
        {
            name: 'My Profile',
            icon: <PersonIcon/>
        }
    ]
}
const Quick = {
    title: 'Quick View',
    links: [
        {
            name: 'Quick Overview',
            icon: <AssuredWorkloadIcon/>,
        }
    ]
}
const MailBox = {
    title: 'Mailbox',
    links: [
        {
            name: 'Inbox',
            icon: <MarkEmailUnreadOutlinedIcon/>,
        },
        {
            name: 'Outbox',
            icon: <EmailOutlinedIcon/>,
        },
        {
            name: 'Send',
            icon: <MarkAsUnreadOutlinedIcon/>,
        }
    ]
}
const Info = {
    title: 'Admin Section',
    links: [
        {
            name: 'Full Administrators',
            icon: <AdminPanelSettingsIcon/>,
        },
        {
            name: 'Administrators',
            icon: <AdminPanelSettingsIcon/>,
        },
        {
            name: 'Professors',
            icon: <SchoolIcon/>,
        },
        {
            name: 'Assistant Professors',
            icon: <SchoolIcon/>,
        },
        {
            name: 'Teaching Assistants',
            icon: <SchoolIcon/>,
        },
        {
            name: 'Research Assistants',
            icon: <SchoolIcon/>,
        },
        {
            name: 'Students',
            icon: <SchoolOutlinedIcon/>,
        }
    ]
}
const News = {
    title: 'News Center',
    links: [
        {
            name: 'Global News',
            icon: <NewspaperOutlinedIcon/>,
        }, {
            name: 'Own News',
            icon: <NewspaperOutlinedIcon/>,
        }, {
            name: 'My Posted News',
            icon: <EditCalendarOutlinedIcon/>,
        },
        {
            name: 'Post News',
            icon: <PostAddOutlinedIcon/>,
        }
    ]
}
const ORNews = {
    title: 'News Center',
    links: [
        {
            name: 'Global News',
            icon: <NewspaperOutlinedIcon/>,
        }, {
            name: 'Own News',
            icon: <NewspaperOutlinedIcon/>,
        }
    ]
}
const New = {
    title: 'Adding Section',
    links: [
        {
            name: 'New User',
            icon: <PersonAddAlt1Icon/>,
        },
        {
            name: 'New Users',
            icon: <GroupAddIcon/>,
        }
    ]
}
const Edit = {
    title: 'Edit Section',
    links: [
        {
            name: 'Get User Info',
            icon: <PersonIcon/>,
        }, {
            name: 'Edit User',
            icon: <AutoFixNormalIcon/>,
        },
        {
            name: 'Reset User Password',
            icon: <KeyIcon/>,
        }
    ]
}
const Subject = {
    title: 'Subjects Section',
    links: [
        {
            name: 'Add Student Subject',
            icon: <ControlPointOutlinedIcon/>,
        },
        {
            name: 'Remove Student Subject',
            icon: <RemoveCircleOutlineOutlinedIcon/>,
        },
        {
            name: 'Edit Student Subject',
            icon: <BorderColorOutlinedIcon/>,
        }
    ]
}
const ProfSubject = {
    title: 'Subjects Section',
    links: [
        {
            name: 'Edit Student Subject',
            icon: <BorderColorOutlinedIcon/>,
        }
    ]
}
const Resp = {
    title: 'Hospital Options',
    links:[
        {
            name: 'Find Request',
            icon:<TravelExploreIcon/>
        },{
            name: 'Book Appointment',
            icon:<TravelExploreIcon/>
        },
        {
            name: 'Add Report',
            icon:<TravelExploreIcon/>
        },{
            name: 'All Appointments',
            icon:<TravelExploreIcon/>
        },
    ]
}


const Sidebar = () => {
    const {currentColor, activeMenu, setActiveMenu, screenSize, Role, SideBar, setSidebar} = useStateContext();
    useEffect(() => {
        if (Role === 'Full Administrator') {
            setSidebar([Welcome, Profile, Quick, MailBox, News, Info, New, Subject, Edit]);
        } else if (Role === 'Administrator') {
            setSidebar([Welcome, Profile, MailBox, News, Subject, Edit]);
        } else if (Role === 'Professor' || Role === 'Assistant Professor') {
            setSidebar([Welcome, Profile, MailBox, News, ProfSubject]);
        } else if (Role === 'Student' || Role === 'Research Assistant' || Role === 'Teaching Assistant') {
            setSidebar([Welcome, Profile, MailBox, ORNews]);
        }
        else if (Role === 'Receptionist') {
            setSidebar([Welcome, Profile,Resp]);
        }
    }, [Role, setSidebar]);

    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
    return (
        <div className="   md:overflow-hidden overflow-auto md:hover:overflow-auto  dark:bg-slate-80  mt-16 z-50"
             style={{height: "90vh"}}>
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center">
                        <Link to="/" onClick={handleCloseSideBar}
                              className="items-center gap-3 ml-3 mt-4 flex text-2xl font-extrabold tracking-tight dark:text-white text-slate-900">
                            <img src={Logo} alt="Logo" style={{width: 45, height: 50}}/><span>Fayoum University</span>
                        </Link>
                    </div>
                    <div className="mt-10">
                        {SideBar.map((item, index) => (
                            <div key={index}>
                                <p className="text-black dark:text-gray-400 m-3 mt-4 pl-5 ">
                                    {item.title}
                                </p>
                                {item.links.map((link, linkIndex) => (
                                    <NavLink
                                        key={linkIndex}
                                        to={`/${link.name}`}
                                        onClick={handleCloseSideBar}
                                        style={({isActive}) => ({
                                            backgroundColor: isActive ? currentColor : '',
                                        })}
                                        className={({isActive}) => (isActive ? activeLink : normalLink)}
                                    >
                                        {link.icon}
                                        <span className="capitalize  ">{link.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};


export default Sidebar;
