import React, {useContext} from "react";
import { DataContext } from '../../context/DataContext';
import Navbar from "../../components/Navbar";
import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";
import BridgeLeftBar from "../../components/leftbar/ BridgeLeftBar";
import ListObjs from "../../components/welding/mainpage/ListObjs";

export default function ObjectsPage(){
    const { mass_create, menu_mass,objs} = useContext(DataContext)
    return (
        <div className='container'>
            <Navbar/>
            <div id='ObjectPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right-block'>
                    <div className='top-box'>
                        <div className='left-box'>
                            <div className='button'><p>Создать обьект</p> <i className='fa-regular fa-plus'></i></div>
                            <SearchObj/>
                        </div>
                        <div className='right-box'>
                            <ChangeObj/>
                        </div>
                    </div>

                    <div className='next-box'>
                        <ListObjs mass={objs}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
