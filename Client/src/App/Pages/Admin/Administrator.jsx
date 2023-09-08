import {GetAdministrators} from '../../API/API';
import React from 'react';
import { Users} from '../../Components';
import {useStateContext} from "../../../contexts/ContextProvider";

const Administrators = () =>{
    const { UserData } = useStateContext();
    if(UserData.role !== "Full Administrator") {
        window.location.href = "/Login"
        return null
    }
   else
    return(
        <Users GetData={GetAdministrators} ShownText="Administrators"  />
    )}

export default Administrators;