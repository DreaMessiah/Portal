import "./style.scss"
import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../context/DataContext";
import {Context} from "../../index";
import MessagesService from "../../services/MessagesService";

export const Mainnavbar = () => {
    const [newmess, setNewmess] = useState(0)
    const {selectedMenu,setSelectedMenu} = useContext(DataContext)
    const {store} = useContext(Context)
    const rule = store.user.unit
    const my_tn = store.user.tn

    const searchMess = async () => {
        try{
            const havenewmess = await MessagesService.searchMess({tn: my_tn})
            setNewmess(havenewmess.data.length)
        }catch(e){
            console.log(e)
        }
    }


    useEffect(()=>{
        searchMess()
    }, [])
    return (
        <div className="navbar_block">
            <div className="navbar_block_menu">
                <Link to='/' onClick={(e) => setSelectedMenu(1)} className={`navbar_block_menu_strock ${selectedMenu===1 && 'selected'}`}>
                    <div className="navbar_block_menu_strock_icon icon_home"></div>
                    <div className="navbar_block_menu_strock_description">Главная</div>
                </Link>
                <Link to='/alllistnews' onClick={(e) => setSelectedMenu(2)} className={`navbar_block_menu_strock ${selectedMenu===2 && 'selected'}`}>
                    <div className="navbar_block_menu_strock_icon icon_news"></div>
                    <div className="navbar_block_menu_strock_description">Новости</div>
                </Link>
                {/*{store.user.unit !== 0 &&*/}
                    <Link to="/messages" onClick={(e) => setSelectedMenu(3)}
                          className={`navbar_block_menu_strock ${selectedMenu === 3 && 'selected'}`}>
                        <div className="navbar_block_menu_strock_icon icon" style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: '#FFF',
                            fontSize: '16pt'
                        }}><i className="fa-regular fa-comment"></i><div className="messindicate" style={(newmess > 0)?{display: 'flex'}:{display: 'none'}}></div> </div>
                        <div className="navbar_block_menu_strock_description">Сообщения</div>
                    </Link>
                {/*}*/}
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
            </div>
            <div className={`navbar_block_dopmenu`}>
                <div className={`navbar_block_dopmenu_list`}>
                    <a href={`/#happybirthday`} className={`navbar_block_dopmenu_list_strock`}>
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-cake-candles"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Дни рождения</div>
                    </a>
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
                    {(rule === 99 || rule === 3 || store.user.account === 'superadmin') &&
                    <Link to={'/createnews'} className={`navbar_block_dopmenu_list_strock`}>
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-thumbtack"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Добавить новость</div>
                    </Link>
                    }
                    <Link to='/kids-contest' className={`navbar_block_dopmenu_list_strock`}>
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-trophy"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Конкурс</div>
                    </Link>
                    <Link style={(rule === 1 || rule === 2 || rule === 3 || rule === 5 || rule === 7 || store.user.account === 'superadmin')?{display: 'flex'}:{display: 'none'}} to='/objectsportal' className={`navbar_block_dopmenu_list_strock`}>
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-object-ungroup"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Объекты</div>
                    </Link>
                    <Link style={(rule === 5 || store.user.account === 'superadmin')?{display: 'flex'}:{display: 'none'}} to='/weldingmenu' className={`navbar_block_dopmenu_list_strock`}>
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-wand-magic-sparkles"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Сварщик</div>
                    </Link>
                    <Link style={(rule === 3 || rule === 7 || store.user.account === 'superadmin')?{display: 'flex'}:{display: 'none'}} to='/economist' className={`navbar_block_dopmenu_list_strock`}>
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-coins"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Экономист</div>
                    </Link>
                    <Link style={(rule === 3 || rule === 4 || rule === 7 || store.user.account === 'superadmin')?{display: 'flex'}:{display: 'none'}} to='/hr' className={`navbar_block_dopmenu_list_strock`}>
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-person-circle-plus"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Кадры</div>
                    </Link>
                    <Link style={(rule === 99 || store.user.account === 'superadmin')?{display: 'flex'}:{display: 'none'}} to='/editor' className={`navbar_block_dopmenu_list_strock`}>
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-user-pen"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Редактор</div>
                    </Link>
                    <Link style={(rule === 100 || store.user.account === 'superadmin')?{display: 'flex'}:{display: 'none'}} to='/statementsmenu' className={`navbar_block_dopmenu_list_strock`}>
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-receipt"/></div>
                        <div className="navbar_block_dopmenu_list_description">Заявления</div>
                    </Link>
                </div>

                {/*<div className="navbar_block_dopmenu_more">Ещё...</div>*/}
            </div>
        </div>
    )
}