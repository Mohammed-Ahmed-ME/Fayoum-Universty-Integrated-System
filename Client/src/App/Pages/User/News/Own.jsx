import React from 'react';
import { OwnNews } from "../../../API/API";
import News from "./News";
import {useStateContext} from "../../../../contexts/ContextProvider";
const Own = () => {
    const {UserData } = useStateContext();
    if(UserData.role === "Gust")
    {
        window.location.href = "/Login"
        return null
    }
    else
        return (<News GetNews={OwnNews} ShownText={"Own News"}/>)}

export default Own;