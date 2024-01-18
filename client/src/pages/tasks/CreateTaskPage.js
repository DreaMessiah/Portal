import React, {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import Navbar from "../../components/Navbar";
import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";
import WrapButtonsObj from "../../components/WrapButtonsObj";
import BridgeLeftBar from "../../components/leftbar/ BridgeLeftBar";


export default function CreateTaskPage(){
    const {mass_create,menu_mass,wrap_buttons} = useContext(DataContext)
    return (
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right-block'>
                    <div className='top-box'>
                        <div className='left-box'>
                            <WrapButtonsObj mass={wrap_buttons}/>
                            <SearchObj/>
                        </div>
                        <div className='right-box'>
                            <ChangeObj/>
                        </div>
                    </div>

                    <div className='next-box'>
                        <div className='left-box'>

                        </div>
                        <div className='right-box'>
                            <div className='top-box-inside'>
                                <div className='top-box-inside-left'>

                                </div>
                                <div className='top-box-inside-right'>

                                </div>
                            </div>
                            <div className='bottom-box'>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
