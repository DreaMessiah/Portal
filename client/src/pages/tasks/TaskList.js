import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import TasksService from "../../services/TasksService"
import './styles.scss'

import UserService from "../../services/UserService";
import MultiSelect from "../../components/inputs/MultiSelect";
import {useMessage} from "../../hooks/message.hook";
import PollsService from "../../services/PollsService";
import ModalFiles from "../../components/modalwin/ModalFiles";
import {Link} from "react-router-dom";

function TaskList(){
    const [tasks,setTasks] = useState([])
    return (
        <div className="tasks_block">
            <div className="navigation">
                <div className="navigation_leftpath">
                    <div className="navigation_leftpath_tasks">Задачи<div className="navigation_path--coin">31</div></div>
                    <div className="navigation_leftpath_make">Делаю<div className="navigation_path--coin">22</div></div>
                    <div className="navigation_leftpath_helper">Помогаю<div className="navigation_path--coin">3</div></div>
                    <div className="navigation_leftpath_pass">Поручил<div className="navigation_path--coin">7</div></div>
                    <div className="navigation_leftpath_listen">Наблюдаю<div className="navigation_path--coin">2</div></div>
                    <div className="navigation_leftpath_slash"></div>
                    <div className="navigation_rightpath_projects">Проекты<div className="navigation_path--coin" style={{display: 'none'}}>0%</div></div>
                    <div className="navigation_rightpath_kpi">Эффективность<div className="navigation_path--coin">17%</div></div>
                </div>
                <div className="navigation_rightpath">

                    <div className="navigation_more">Ещё <div className="navigation_more_open">\/</div></div>
                </div>

            </div>

            <div className="titlecap">
                <div className="titlecap_name">
                    <div className="titlecap_name_text">Мои задачи</div>
                    <div className="titlecap_name_star"><i className="fa-solid fa-star"></i></div>
                </div>
                <div className="titlecap_btn_plus_task">
                    <div className="titlecap_btn_plus_task_name">Добавить задачу</div>
                    <div className="titlecap_btn_plus_task_slash"></div>
                    <div className="titlecap_btn_plus_task_open"><i className="fa-solid fa-caret-down"></i></div>
                </div>
                <div className="titlecap_in_work">
                    <input className="titlecap_in_work_search" placeholder="ПОИСК"/>
                </div>
                <div className="titlecap_settbtns">
                    <div className="titlecap_settbtns_settings"><i className="fa-solid fa-gear"></i></div>
                    <div className="titlecap_settbtns_flash"><i className="fa-solid fa-heart"></i></div>
                </div>
            </div>

            <div className="cap_table">
                <div className="cap_table_left">
                    <div className="cap_table_left_list">Список</div>
                    <div className="cap_table_left_time">Сроки</div>
                    <div className="cap_table_left_myplan">Мой план</div>
                    <div className="cap_table_left_calendar">Календарь</div>
                    <div className="cap_table_left_grant">Грант</div>
                    <div className="cap_table_left_inside">Нет задач, требующих оперативной реакции</div>
                </div>
                <div className="cap_table_right">
                    <div className="cap_table_right_jobs"><i className="fa-solid fa-hippo"></i><i className="fa-solid fa-hippo"></i><i className="fa-solid fa-hippo"></i>Боты-Бегемоты</div>
                </div>
            </div>

            <div className='table_list_new'>
                <div className='table_list_cap'></div>
                {tasks.length ? tasks.map( (item,index) => (
                    <div className='table_list_strock' key={index}>
                        <div className='table_list_strock_datein flex_center'>{item.datestart}<br/>{item.timestart}</div>
                        <div className='table_list_strock_dateto flex_center'>{item.dateend}<br/>{item.timeend}</div>
                        <div className='table_list_strock_title flex_center'>{item.title}</div>
                        <div className='table_list_strock_icon flex_center'>
                            <i className={`fa-solid fa-arrow-left`}></i>
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
                        <div className='table_list_strock_priority flex_center'>{item.priority}</div>
                        <Link to="/thistask" className='table_list_strock_edit flex_center'>
                            <i className="fa-solid fa-pen"></i>
                        </Link>
                        <div className='table_list_strock_close flex_center'>
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </div>
                )):null}

            </div>

        </div>
    )
}

export default observer(TaskList)