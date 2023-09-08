import {GetStudents} from '../../API/API';
import React from 'react';
import { Users} from '../../Components';
import {useStateContext} from "../../../contexts/ContextProvider";
const Students = () =>{const { UserData } = useStateContext();

    if(UserData.role !== "Full Administrator")
    {
        window.location.href = "/Login"
        return null
    }
else
return (<Users GetData={GetStudents} ShownText={"Students"} />)}

export default Students;