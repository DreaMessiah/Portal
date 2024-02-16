import React, {useContext, useEffect, useState} from "react";
import {Link,useLocation} from 'react-router-dom';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Navbar from "../../components/Navbar";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";

function DocumentsPage(){

    const {store} = useContext(Context)
    return (
        <div className='container'>
            <Navbar/>
        </div>
    )
}
export default observer(DocumentsPage)