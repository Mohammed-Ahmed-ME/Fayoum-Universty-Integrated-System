import React from 'react';
import { GlobalNews } from "../../../API/API";
import News from "./News";
import {useStateContext} from "../../../../contexts/ContextProvider";
const Global = () => {
    const {UserData } = useStateContext();
    if(UserData.role === "Gust")
    {
        window.location.href = "/Login"
        return null
    }
    else
        return (
    <News GetNews={GlobalNews} ShownText="Global News"/>)
}
export default Global;