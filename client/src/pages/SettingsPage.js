import React, {useEffect, useRef} from "react";
import Navbar from "../components/Navbar";
import DocumentWay from "../components/DocumentWay";
import LeftIconsObj from "../components/leftbar/LeftIconsObj";

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
