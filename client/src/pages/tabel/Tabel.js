import React, {useContext} from "react";
import Navbar from "../../components/old/Navbar";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import {DataContext} from "../../context/DataContext";
import { TabelMY } from "../../components/tabletabel/TabelMY";



export const TabelObj = () => {
    const {mass_create, menu_mass} = useContext(DataContext)

    // const params = new URLSearchParams(window.location.search).get(
    //     "id",
    //     "mounth",
    //     "year"
    // );

    return (
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <TabelMY />
            </div>
        </div>
    )
}
