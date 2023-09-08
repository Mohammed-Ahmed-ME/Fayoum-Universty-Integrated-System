import React, {useEffect} from 'react';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import {useStateContext} from '../../../contexts/ContextProvider';

const ThemeSettings = () => {

    const themeColors = [
        {
            name: 'blue-theme',
            color: '#1A97F5',
        },
        {
            name: 'purple-theme',
            color: '#7352FF',
        },
        {
            color: '#FB9678',
            name: 'orange-theme',
        },
        {
            color: '#000',
            name: 'black-theme',
        },
        {
            color: '#fff',
            name: 'white-theme',
        },{
            name: 'gray-theme',
            color: '#708090',
        }, {
            name: 'steelblue-theme',
            color: '#4682B4',
        },{
            name: 'green-theme',
            color: '#008000',
        },
        {
            name: 'olive-theme',
            color: '#808000',
        },
        {
            name: 'teal-theme',
            color: '#009688',
        },
        {
            name: 'purple-theme',
            color: '#3366CC',
        },
        {
            name: 'red-theme',
            color: '#673AB7',
        },

        {
            name: 'cyan-theme',
            color: '#00FFFF',
        },
        {
            name: 'darkorange-theme',
            color: '#FF8C00',
        },
        {
            name: 'deeppink-theme',
            color: '#FF1493',
        },




    ];
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setThemeSettings(false)
            }
        }
        document.addEventListener('keydown', handleEscape);
    })


    const { setCurrentColor, currentColor,  setThemeSettings,ThemeMood,setTheme} = useStateContext();
    const setColor = (color) => {
        if (color=== '#fff' && ThemeMood === "Light") {
            setTheme("Dark");
            localStorage.setItem('Mood', "Dark");
            setCurrentColor(color);
            localStorage.setItem('colorMode', color);
        }
        else if (color=== '#000' && ThemeMood === "Dark") {
            setTheme("Light");
            localStorage.setItem('Mood', "Light");
            setCurrentColor(color);
            localStorage.setItem('colorMode', color);
        }
        else {
            setCurrentColor(color);
            localStorage.setItem('colorMode', color);
        }
    }
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 ">
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg w-96 dark:text-white">
                <div className="flex justify-between items-center p-4 ml-4">

                    <p className="font-semibold text-lg">Settings</p>

                    <button
                        type="button"
                        onClick={() => setThemeSettings(false)}
                        style={{color: 'rgb(153, 171, 180)', borderRadius: '50%'}}
                        className="text-xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                        <HighlightOffOutlinedIcon sx={{fontSize: 35}}/>
                    </button>
                </div>
                <div className="p-4 border-t-1 border-color ml-4">
                    <p className="font-semibold text-sm text-left ">Theme Colors</p>
                    <div className="flex flex-wrap gap-3 ">
                        {themeColors.map((item, index) => (
                            <div
                                className="relative mt-2 cursor-pointer flex gap-5 items-center"
                                key={index}
                            >
                                <button
                                    type="button"
                                    className="border-slate-700 border-2 h-10 w-10 rounded-full cursor-pointer flex items-center justify-center"
                                    style={{backgroundColor: item.color}}
                                    onClick={() => setColor(item.color)}
                                >
      <span className="MuiIcon text-white text-2xl" style={{display: item.color === currentColor ? 'block' : 'none'}}>
        <DownloadDoneOutlinedIcon/>
      </span>
                                </button>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>);
};

export default ThemeSettings;






