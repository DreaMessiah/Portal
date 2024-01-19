import "./listtask.scss";
import React, {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import WrapButtonsObj from "../WrapButtonsObj";
import SearchObj from "../SearchObj";
import ChangeObj from "../ChangeObj";
import {TableListTasks} from "./TableListTasks";



export const TableTasks = () => {
    const {wrap_buttons} = useContext(DataContext)
    return (
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
                <TableListTasks />


            </div>
    )
}