import React from 'react';
import {useStateContext} from "../../../contexts/ContextProvider";
// import Name from "../../../Images/Name.png";

const Footer = () => {
    const { currentColor} = useStateContext();

   return (
        <div className="flex flex-col items-center overflow-hidden">
            <p className="dark:text-gray-200 text-gray-700 text-center mt-20" style={{ color: currentColor }}>
                © 2023 All Rights Reserved By: Mohammed Ahmed
            </p>
            {/*<button className="flex items-center justify-center my-4 focus:outline-none m-20" >*/}
            {/*    <img src={Name} alt="Programmer Logo" className="h-16" />*/}
            {/*</button>*/}
        </div>
    );
};

export default Footer;
