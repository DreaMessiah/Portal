import React from "react"
import {MainHeader} from "../../components/header/Mainheader"
import {Mainnavbar} from "../../components/navbar/Mainnavbar"
import Messager from "./Messager";

const MessagerLanding = () => {
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <div className="workpage_block">
                    <Messager />
                </div>
            </div>
        </div>
    )
}

export default MessagerLanding