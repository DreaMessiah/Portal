import "./style.scss"
import {Link} from "react-router-dom";

export const Mainnavbar = () => {
    return (
        <div className="navbar_block">
            <div className="navbar_block_menu">
                <div className="navbar_block_menu_strock">
                    <div className="navbar_block_menu_strock_icon icon_home"></div>
                    <div className="navbar_block_menu_strock_description">Главная</div>
                </div>
                <div className="navbar_block_menu_strock">
                    <div className="navbar_block_menu_strock_icon icon_news"></div>
                    <div className="navbar_block_menu_strock_description">Новости</div>
                </div>
                <div className="navbar_block_menu_strock">
                    <div className="navbar_block_menu_strock_icon icon_com"></div>
                    <div className="navbar_block_menu_strock_description">Сотрудники</div>
                </div>
                <div className="navbar_block_menu_strock">
                    <div className="navbar_block_menu_strock_icon icon_forest"></div>
                    <div className="navbar_block_menu_strock_description">Структура компании</div>
                </div>
                <Link to='/documents' className="navbar_block_menu_strock">
                    <div className="navbar_block_menu_strock_icon icon_doc"></div>
                    <div className="navbar_block_menu_strock_description">Документы</div>
                </Link>
                <Link to='/maintasks' className="navbar_block_menu_strock">
                    <div className="navbar_block_menu_strock_icon icon_task"></div>
                    <div className="navbar_block_menu_strock_description">Задачи и Проекты</div>
                </Link>
                {/*<div className="navbar_block_menu_strock">*/}
                {/*    <div className="navbar_block_menu_strock_icon icon_lk"></div>*/}
                {/*    <div className="navbar_block_menu_strock_description">Личный кабинет</div>*/}
                {/*</div>*/}
                <Link to="/main" className="navbar_block_menu_strock">
                    <div className="navbar_block_menu_strock_icon" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFF', fontSize: '16pt'}}><i className="fa-regular fa-gem"></i></div>
                    <div className="navbar_block_menu_strock_description">Витирина</div>
                </Link>
                <Link to="/newpaylist" className="navbar_block_menu_strock">
                    <div className="navbar_block_menu_strock_icon" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#FFF', fontSize: '16pt'}}><i className="fa-brands fa-google-wallet"></i></div>
                    <div className="navbar_block_menu_strock_description">Расчётка</div>
                </Link>
            </div>
            <div className="navbar_block_dopmenu">
                <div className="navbar_block_dopmenu_list">
                    <div className="navbar_block_dopmenu_list_strock">
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-cake-candles"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Дни рождения</div>
                    </div>
                    <div className="navbar_block_dopmenu_list_strock">
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-toggle-off"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Опросы</div>
                    </div>
                    <div className="navbar_block_dopmenu_list_strock">
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-square-poll-vertical"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Статистика</div>
                    </div>
                    <div className="navbar_block_dopmenu_list_strock">
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-lightbulb"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Банк идей</div>
                    </div>
                    <div className="navbar_block_dopmenu_list_strock">
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-user-plus"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Вакансии</div>
                    </div>
                    <div className="navbar_block_dopmenu_list_strock">
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-brands fa-slack"></i></div>
                        <div className="navbar_block_dopmenu_list_description">О компании</div>
                    </div>
                    <div className="navbar_block_dopmenu_list_strock">
                        <div className="navbar_block_dopmenu_list_icon"><i className="fa-solid fa-thumbtack"></i></div>
                        <div className="navbar_block_dopmenu_list_description">Доска объявлений</div>
                    </div>
                </div>
                <div className="navbar_block_dopmenu_more">Ещё...</div>
            </div>
        </div>
    )
}