import React, {useContext} from "react";
import Navbar from "../../components/old/Navbar";
import Createobj from "../../components/leftbar/CreateObj";
import LeftMenuObj from "../../components/leftbar/LeftMenuObj";
import {Viewobj} from "../../components/welding/yearmounth/Viewobj";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import {DataContext} from "../../context/DataContext";

export const Yearwelding = () => {
    const {mass_create,menu_mass} = useContext(DataContext)

    return (
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <Viewobj/>
            </div>
        </div>
    )
}
