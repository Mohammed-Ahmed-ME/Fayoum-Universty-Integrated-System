import { GetFullAdministrators } from '../../API/API';
import React from 'react';
import { Users} from '../../Components';
import {useStateContext} from "../../../contexts/ContextProvider";

const FullAdministrators = () => {
    const { UserData } = useStateContext();
    if(UserData.role !== "Full Administrator")
    {
        window.location.href = "/Login"
        return null
    }
    else
        return(<Users GetData={GetFullAdministrators} ShownText="Full Administrators"/>)
}
export default FullAdministrators;