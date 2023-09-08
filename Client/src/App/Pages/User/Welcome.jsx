import React from 'react';
import { useStateContext } from "../../../contexts/ContextProvider";
import {Header} from "../../Components";
const Welcome = () => {
    const { currentColor } = useStateContext();
    return (
        <div className="px-4 mt-10" >
            <h1 className="flex flex-wrap lg:flex-nowrap justify-center text-4xl font-bold pb-4 items-center text-center sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif " style={{color:currentColor}}>
                Welcome to My University's Integrated System!
            </h1>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10  bg-white rounded-3xl ">
                <Header category="Info" title="Welcome" />
                <p className="flex flex-wrap lg:flex-nowrap justify-start text-xl leading-relaxed pb-4 items-center text-left sm:text-md md:text-lg lg:text-1xl xl:text-2xl">
                I am thrilled to introduce you to my graduation project, an innovative system designed to link various aspects of our university together, providing a seamless experience for students, faculty, and staff. Allow me to provide you with an overview of the project and introduce myself.
            </p>
            </div>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10  bg-white rounded-3xl ">
            <Header category="Info" title="About The Project" />
                <p className="flex flex-wrap lg:flex-nowrap justify-start text-xl leading-relaxed pb-4 items-center text-left sm:text-md md:text-lg lg:text-1xl xl:text-2xl">
                The project aims to streamline and optimize the university's operations by integrating different components such as student records, course management, administrative tasks, and more. By implementing this system, I sought to enhance efficiency, improve communication, and facilitate access to essential resources within our university community.
            </p>
            </div>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10  bg-white rounded-3xl ">
                <Header category="Info" title="Introducing Myself" />
            <p className="flex flex-wrap lg:flex-nowrap justify-start text-xl leading-relaxed pb-4 items-center text-left sm:text-md md:text-lg lg:text-1xl xl:text-2xl">
                This project was developed solely by me, Mohammed Ahmed & Dr: Mostafa Rabie. With a passion for technology and a commitment to making a positive impact, I have dedicated myself to creating a reliable and user-friendly system for the entire university community.
            </p>
            <p className="flex flex-wrap lg:flex-nowrap justify-start text-xl leading-relaxed pb-4 items-center text-left sm:text-md md:text-lg lg:text-1xl xl:text-2xl">
                I would like to express my gratitude to the university faculty, staff, and fellow students who have supported me in this endeavor. Your input and feedback have been instrumental in shaping this system, and I hope it will contribute to enhancing the overall university experience for everyone involved.
            </p>
            <p className="flex flex-wrap lg:flex-nowrap justify-start text-xl leading-relaxed pb-4 items-center text-left sm:text-md md:text-lg lg:text-1xl xl:text-2xl">
                I invite you to explore the system, navigate through its different features, and provide me with your valuable feedback. Your insights will help me refine and improve the system even further, ensuring its effectiveness and usability.
            </p>
            <p className="flex flex-wrap lg:flex-nowrap justify-start text-xl leading-relaxed pb-4 items-center text-left sm:text-md md:text-lg lg:text-1xl xl:text-2xl">
                Thank you for visiting my welcome page and being a part of my journey. Together, we can create a more connected and efficient university environment.
            </p>
            </div>
            <div>
                <div className="flex gap-3 flex-wrap justify-center">
                        <div className="mt-1 relative min-w-96" >
                            <figure className="md:flex bg-slate-300 rounded-xl flex-wrap gap-2 p-8 md:p-0 dark:bg-slate-800 m-5">
                                <div className="pt-2 md:p-4 text-center md:text-left space-y-4">
                                    <figcaption className="pl-4 font-medium text-center">
                                        <div className="text-sky-950 dark:text-sky-400 text-xl">By: Mohammed Ahmed</div>
                                    </figcaption>
                                </div>
                            </figure>
                            <figure className="md:flex bg-slate-300 rounded-xl flex-wrap gap-2 p-8 md:p-0 dark:bg-slate-800 m-5">
                                <div className="pt-2 md:p-4 text-center md:text-left space-y-4">
                                    <figcaption className="pl-4 font-medium text-center">
                                        <div className="text-sky-950 dark:text-sky-400 text-xl">Supervised By: Dr: Mostafa Rabie</div>
                                    </figcaption>
                                </div>
                            </figure>
                            <figure className="md:flex bg-slate-300 rounded-xl flex-wrap gap-2 p-8 md:p-0 dark:bg-slate-800 m-5">
                                <div className="pt-2 md:p-4 text-center md:text-left space-y-4">
                                    <figcaption className="pl-4 font-medium text-center">
                                        <div className="text-sky-950 dark:text-sky-400 text-xl">Graduation Year 2023</div>
                                    </figcaption>
                                </div>
                            </figure>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
