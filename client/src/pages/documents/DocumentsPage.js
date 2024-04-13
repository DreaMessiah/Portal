import React, {useContext, useEffect, useState} from "react";

import Navbar from "../../components/old/Navbar";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import {DataContext} from "../../context/DataContext";
import WrapButtonsObj from "../../components/old/WrapButtonsObj";
import SearchObj from "../../components/old/SearchObj";
import ChangeObj from "../../components/old/ChangeObj";
import "../../components/listtasks/listtask3.scss";
import NewsFooter from "../../components/old/NewsFooter";
import {Context} from "../../index";
import FileManager from "./fileManager";


function DocumentsPage(){
    const {mass_create, menu_mass,wrap_buttons} = useContext(DataContext)
    return(
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage'>
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right-block' >
                    <div className='top-box'>
                        <div className='left-box'>
                            <WrapButtonsObj mass={wrap_buttons}/>
                            <SearchObj/>
                        </div>
                        <div className='right-box'>
                            <ChangeObj/>
                        </div>
                    </div>
                    <FileManager/>
                </div>
            </div>
            <NewsFooter/>

        </div>
    )
}
export default DocumentsPage