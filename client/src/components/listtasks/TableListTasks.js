import "./listtask.scss";
import React, {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import {Link} from "react-router-dom";



export const TableListTasks = () => {
    const {list_titletasks} = useContext(DataContext)

    const inOrOut = rev => {
        let style = 'intoIcon';
        if(rev === '1'){
            style = 'outIcon';
        }
        return style;
    }

    const prioryStatus = num => {
        num = parseInt(num);
        switch (num) {
            case 1:
                return 'Высокий';
            case 2:
                return 'Средний';
            case 3:
                return 'Высокий';
            default:
                return 'Ознакомление'
        }
    }

    return (

        <div className='table_list'>
            <div className='table_list_cap'></div>
            {list_titletasks.map( (item,index) => (
                <div className='table_list_strock' key={index}>
                    <div className='table_list_strock_datein flex_center'>{item.datestart}<br/>{item.timestart}</div>
                    <div className='table_list_strock_dateto flex_center'>{item.dateend}<br/>{item.timeend}</div>
                    <div className='table_list_strock_title flex_center'>{item.title}</div>
                    <div className='table_list_strock_icon flex_center'>
                        <div className={inOrOut(item.navigation)}></div>
                    </div>
                    <div className='table_list_strock_performance flex_center'>
                        <div className='table_list_strock_p_indicate flex_center'>
                            <div className='table_list_strock_p_indicate_bluegreen'>
                                <div className='table_list_strock_p_indicate_bg_indicate flex_center' style={{width: item.percent + '%'}}>
                                </div>
                            </div>
                        </div>
                        <div className='table_list_strock_p_percent flex_center'>{item.percent}%</div>
                        <div className='table_list_strock_p_time flex_center'>{item.time[0]}ч. {item.time[1]}мин.</div>
                    </div>
                    <div className='table_list_strock_status flex_center'>{item.status}</div>
                    <div className='table_list_strock_category flex_center'>{item.group}</div>
                    <div className='table_list_strock_priority flex_center'>{prioryStatus(item.priority)}</div>
                    <div className='table_list_strock_edit flex_center'>
                        <div className='edit_task_list_icon'></div>
                    </div>
                    <div className='table_list_strock_close flex_center'>
                        <div className='del_task_list_icon'></div>
                    </div>
                </div>
            ))}

        </div>
    )
}