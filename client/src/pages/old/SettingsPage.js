import React, {useEffect, useRef} from "react";
import Navbar from "../../components/OldComponents/old/Navbar";
import DocumentWay from "../../components/OldComponents/old/DocumentWay";
import LeftIconsObj from "../../components/OldComponents/leftbar/LeftIconsObj";

export default function SettingsPage(){
    return (
        <div className=''>
            <Navbar/>
            <div className='container'>
                <LeftIconsObj/>
            </div>
        </div>
    );
};
