import {GetAssistantProfessors} from '../../API/API';
import React from 'react';
import {Users} from '../../Components';
import {useStateContext} from "../../../contexts/ContextProvider";

const AssistantProfessors = () => {
    const {UserData} = useStateContext();

    if (UserData.role !== "Full Administrator") {
        window.location.href = "/Login"
        return null
    } else return (<Users GetData={GetAssistantProfessors} ShownText="Assistant Professors"/>)
}
export default AssistantProfessors;