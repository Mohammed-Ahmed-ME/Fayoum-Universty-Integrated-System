
import {GetTeachingAssistants} from '../../API/API';
import React from 'react';
import {Users} from '../../Components';
import {useStateContext} from "../../../contexts/ContextProvider";
const TeachingAssistant = () =>{
const { UserData } = useStateContext();

if(UserData.role !== "Full Administrator")
{
    window.location.href = "/Login"
    return null
}
else
    return(<Users GetData={GetTeachingAssistants} ShownText="Teaching Assistants" />)}
export default TeachingAssistant;