import {Link} from "react-router-dom";
import React, {useState} from 'react';
import {useContext} from "react";
import {Context} from "../../index";
import "./style.scss"
import {ModalBigWin} from "../modalwin/ModaBiglWin";
import {QuestionDirector} from "./QuestionDirector";
import {ModalWin} from "../modalwin/ModalWin";
import ModalFiles from "../modalwin/ModalFiles";
import {Mainnavbar} from "../navbar/Mainnavbar";
import {DataContext} from "../../context/DataContext";

export const MainHeader = () => {
    const {store} = useContext(Context)
    const [active, setActive] = useState(false)
    const [burger, setBurger] = useState(false)
    const {selectedMenu,setSelectedMenu} = useContext(DataContext)
    const rule = store.user.unit
    const screenWidth = window.innerWidth;
    let widther = '40vh'
    if(screenWidth < 550){
        widther = '60vh'
    }

    const stopbody = back => {
        const body = document.querySelector('.workpage_block')

        if(back === true){
            body.style.position = 'fixed'
            body.style.top = '0px'
        } else {
            body.style.position = 'relative'
            body.style.top = 'auto'
        }
    }

    return (
        <div className="head_block">
            <div className="menu_burger" style={(burger)?{display: 'flex'}:{display: 'none'}}>
                    <Link to='/new_lk' onClick={(e) => {setSelectedMenu(1); setBurger(false);}} className={`navbar_block_menu_strock ${selectedMenu===1 && 'selected'}`}>
                       <div className="navbar_block_menu_strock_description">Личный кабинет</div>
                    </Link>
                    <Link to='/' onClick={(e) => {setSelectedMenu(1); setBurger(false);}} className={`navbar_block_menu_strock ${selectedMenu===1 && 'selected'}`}>
                        <div className="navbar_block_menu_strock_icon icon_home"></div>
                        <div className="navbar_block_menu_strock_description">Главная</div>
                    </Link>
                    <Link to='/alllistnews' onClick={(e) => setSelectedMenu(2)} className={`navbar_block_menu_strock ${selectedMenu===2 && 'selected'}`}>
                        <div className="navbar_block_menu_strock_icon icon_news"></div>
                        <div className="navbar_block_menu_strock_description">Новости</div>
                    </Link>
                    {store.user.unit !== 0 &&
                        <Link to="/messages" onClick={(e) => setSelectedMenu(3)}
                              className={`navbar_block_menu_strock ${selectedMenu === 3 && 'selected'}`}>
                            <div className="navbar_block_menu_strock_icon icon" style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                color: '#FFF',
                                fontSize: '16pt'
                            }}><i className="fa-regular fa-comment"></i></div>
                            <div className="navbar_block_menu_strock_description">Сообщения</div>
                        </Link>
                    }
                    <Link to="/structure" onClick={(e) => setSelectedMenu(4)} className={`navbar_block_menu_strock ${selectedMenu===4 && 'selected'}`}>
                        <div className="navbar_block_menu_strock_icon icon_forest"></div>
                        <div className="navbar_block_menu_strock_description">Структура компании</div>
                    </Link>
                    <Link onClick={(e) => setSelectedMenu(5)} to='/documents' className={`navbar_block_menu_strock ${selectedMenu===5 && 'selected'}`}>
                        <div className="navbar_block_menu_strock_icon icon_doc"></div>
                        <div className="navbar_block_menu_strock_description">Документы</div>
                    </Link>
                    {/*<Link onClick={(e) => setSelectedMenu(6)} to='/maintasks' className={`navbar_block_menu_strock ${selectedMenu===6 && 'selected'}`}>*/}
                    {/*    <div className="navbar_block_menu_strock_icon icon_task"></div>*/}
                    {/*    <div className="navbar_block_menu_strock_description">Задачи и Проекты</div>*/}
                    {/*</Link>*/}
                    {/*<div className="navbar_block_menu_strock">*/}
                    {/*    <div className="navbar_block_menu_strock_icon icon_lk"></div>*/}
                    {/*    <div className="navbar_block_menu_strock_description">Личный кабинет</div>*/}
                    {/*</div>*/}
                    {/*<Link onClick={(e) => setSelectedMenu(7)} to="/main" className={`navbar_block_menu_strock ${selectedMenu===7 && 'selected'}`}>*/}
                    {/*    <div className="navbar_block_menu_strock_icon" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFF', fontSize: '16pt'}}><i className="fa-regular fa-gem"></i></div>*/}
                    {/*    <div className="navbar_block_menu_strock_description">Витирина</div>*/}
                    {/*</Link>*/}
                    <Link onClick={(e) => setSelectedMenu(8)} to="/newpaylist" className={`navbar_block_menu_strock ${selectedMenu===8 && 'selected'}`}>
                        <div className="navbar_block_menu_strock_icon" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFF', fontSize: '16pt'}}><i className="fa-brands fa-google-wallet"></i></div>
                        <div className="navbar_block_menu_strock_description">Расчётка</div>
                    </Link>
                    <div className={`navbar_block_dopmenu_list`}>
                        {/*<a  href={`/#happybirthday`}  className={`navbar_block_dopmenu_list_strock`}>*/}
                        {/*    <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-cake-candles"></i></div>*/}
                        {/*    <div className="navbar_block_dopmenu_list_description">Дни рождения</div>*/}
                        {/*</a>*/}
                        <Link to='/polls' className={`navbar_block_dopmenu_list_strock`}>
                            <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-toggle-off"></i></div>
                            <div className="navbar_block_dopmenu_list_description">Опросы</div>
                        </Link>
                        {/*<div className={`navbar_block_dopmenu_list_strock`}>*/}
                        {/*    <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-square-poll-vertical"></i></div>*/}
                        {/*    <div className="navbar_block_dopmenu_list_description">Статистика</div>*/}
                        {/*</div>*/}
                        {/*<div className={`navbar_block_dopmenu_list_strock`}>*/}
                        {/*    <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-lightbulb"></i></div>*/}
                        {/*    <div className="navbar_block_dopmenu_list_description">Банк идей</div>*/}
                        {/*</div>*/}
                        {/*<div className={`navbar_block_dopmenu_list_strock`}>*/}
                        {/*    <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-user-plus"></i></div>*/}
                        {/*    <div className="navbar_block_dopmenu_list_description">Вакансии</div>*/}
                        {/*</div>*/}
                        <Link to={'/statements'} className={`navbar_block_dopmenu_list_strock`}>
                            <div className="navbar_block_dopmenu_list_icon"><i className="fa-brands fa-slack"></i></div>
                            <div className="navbar_block_dopmenu_list_description">Бланки заявлений</div>
                        </Link>
                        {rule === 3 &&
                            <Link to={'/createnews'} className={`navbar_block_dopmenu_list_strock`}>
                                <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-thumbtack"></i></div>
                                <div className="navbar_block_dopmenu_list_description">Добавить новость</div>
                            </Link>
                        }
                        <Link to='/kids-contest' className={`navbar_block_dopmenu_list_strock`}>
                            <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-trophy"/></div>
                            <div className="navbar_block_dopmenu_list_description">Конкурс</div>
                        </Link>
                        <Link style={(rule !== 0)?{display: 'flex'}:{display: 'none'}} to='/objectsportal' className={`navbar_block_dopmenu_list_strock`}>
                            <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-object-ungroup"></i></div>
                            <div className="navbar_block_dopmenu_list_description">Объекты</div>
                        </Link>
                        <Link style={(rule === 5)?{display: 'flex'}:{display: 'none'}} to='/weldingsett' className={`navbar_block_dopmenu_list_strock`}>
                            <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                            <div className="navbar_block_dopmenu_list_description">Сварщик</div>
                        </Link>
                        <Link style={(rule === 3)?{display: 'flex'}:{display: 'none'}} to='/economist' className={`navbar_block_dopmenu_list_strock`}>
                            <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-coins"></i></div>
                            <div className="navbar_block_dopmenu_list_description">Экономист</div>
                        </Link>
                        <Link style={(rule === 3 || rule === 4)?{display: 'flex'}:{display: 'none'}} to='/hr' className={`navbar_block_dopmenu_list_strock`}>
                            <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-person-circle-plus"></i></div>
                            <div className="navbar_block_dopmenu_list_description">Кадры</div>
                        </Link>

                        <div onClick={() => store.logout()} className={`navbar_block_dopmenu_list_strock`}>
                            <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-right-from-bracket"></i></div>
                            <div className="navbar_block_dopmenu_list_description">Выйти</div>
                        </div>
                        {/*<Link to='/objectsportal' className={`navbar_block_dopmenu_list_strock`}>*/}
                        {/*    <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-children"></i></div>*/}
                        {/*    <div className="navbar_block_dopmenu_list_description">Объекты</div>*/}
                        {/*</Link>*/}

                    </div>
                    {/*<div className="navbar_block_dopmenu_more">Ещё...</div>*/}
            </div>
            <Link to="/" className="head_block_logo">Сургутское РСУ</Link>
            {/*<div className="head_block_search">*/}
            {/*    <input className="head_block_search_input" placeholder="Поиск..."></input>*/}
            {/*    <div className="head_block_search_btn"></div>*/}
            {/*</div>*/}
            <div className="head_block_right">
                {/*<div className="head_block_callback">Обратная связь</div>*/}
                <Link to="/new_lk" className="head_block_lk">
                    <div style={{backgroundImage:`url(/files/profile/${store.user.avatar})`}} className="head_block_lk_photo"></div>
                    <div className="head_block_lk_name">{store.user.full_name}</div>
                </Link>
                <div className="head_block_burger" onClick={()=>{setBurger(!burger); stopbody(!burger)}}><i className="fa-solid fa-bars"/></div>
                <div className="head_block_callback" onClick={() => store.logout()}>Выйти</div>
                <div className="head_block_questions" onClick={()=>setActive(true)}>?</div>
                <ModalFiles heigth={widther} data={<QuestionDirector setActive={setActive} />} active={active} setActive={setActive}/>
            </div>
        </div>
    )
}
