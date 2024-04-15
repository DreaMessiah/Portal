import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import AuthService from "../../services/AuthService";
import Navbar from "../../components/OldComponents/old/Navbar";
import BridgeLeftBar from "../../components/OldComponents/leftbar/BridgeLeftBar";
import {DataContext} from "../../context/DataContext";
import WrapButtonsObj from "../../components/OldComponents/old/WrapButtonsObj";
import SearchObj from "../../components/OldComponents/old/SearchObj";
import ChangeObj from "../../components/OldComponents/old/ChangeObj";

import "../../components/OldComponents/listtasks/listtask2.scss";
import NewsFooter from "../../components/OldComponents/old/NewsFooter";
function PeoplesPage(){
    const {mass_create, menu_mass,wrap_buttons} = useContext(DataContext)
    const [users,setUsers] = useState([])
    const rule = 3
    const loading = async () => {
        const response = await AuthService.getusers()
        console.log(response.data.users)
        setUsers(response.data.users)
    }
    useEffect(()=> {
        const promise = loading()
        console.log(promise)
    },[])

    return(
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
                    {users.length ?
                        <div className='table_list'>
                            <div className='table_list_cap'></div>
                            {users.map( (item,index) => (
                                <div className='table_list_strock' key={index}>
                                    <div className='table_list_strock_datein flex_center'>{item.id}</div>
                                    <div className='table_list_strock_dateto flex_center'>{item.tn}</div>
                                    <div className='table_list_strock_title flex_center'>{item.full_name}</div>
                                    <div className='table_list_strock_status flex_center'>{item.login}</div>
                                    <div className='table_list_strock_category flex_center'>{item.phone}</div>
                                    <div className='table_list_strock_priority flex_center'>{item.email}</div>
                                    <div className='table_list_strock_edit flex_center'>
                                        <div className='edit_task_list_icon'></div>
                                    </div>
                                    <div className='table_list_strock_close flex_center'>
                                        <div className='del_task_list_icon'></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : ''}
                </div>
            </div>
        <NewsFooter/>
        </div>
    )
}
export default observer(PeoplesPage)