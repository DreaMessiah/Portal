import "./listtask.scss";
import React, {useContext} from "react";
import {DataContext} from "../../context/DataContext";



export const TableListTasks = () => {
    const {list_titletasks} = useContext(DataContext)
    return (
        <div className='table_list'>
            <div className='table_list_cap'></div>
            <div className='table_list_strock'>
                <div className='table_list_strock_datein'></div>
                <div className='table_list_strock_dateto'></div>
                <div className='table_list_strock_title'></div>
                <div className='table_list_strock_icon'></div>
                <div className='table_list_strock_performance'></div>
                <div className='table_list_strock_status'></div>
                <div className='table_list_strock_category'></div>
                <div className='table_list_strock_priority'></div>
                <div className='table_list_strock_edit'></div>
                <div className='table_list_strock_close'></div>
            </div>
        </div>
    )
}