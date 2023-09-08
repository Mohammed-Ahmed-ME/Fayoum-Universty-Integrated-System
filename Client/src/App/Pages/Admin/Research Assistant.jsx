
import {GetResearchAssistants} from '../../API/API';
import React from 'react';
import { Users} from '../../Components';
import {useStateContext} from "../../../contexts/ContextProvider";
const ResearchAssistants = () => {
    const { UserData } = useStateContext();
    if(UserData.role !== "Full Administrator")
    {
        window.location.href = "/Login"
        return null
    }
    else
        return(<Users GetData={GetResearchAssistants} ShownText="Research Assistants" />)}

export default ResearchAssistants;