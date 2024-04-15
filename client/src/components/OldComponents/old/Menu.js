import React from "react";
import '../../../assets/styles/styles.scss'
import {Link} from "react-router-dom";

export const Menu = () => {
    return (
        <ul className="nav_main_menu">
            <li className="nav_main_menu_item"><Link to='/main'>Проекты / Объекты</Link>
                <ul>
                    <li><Link to='/objects'>Объекты</Link></li>
                    <li><Link to='/welding'>Сварка</Link></li>
                    <li><Link to='/documents'>Файлы</Link></li>
                </ul>
            </li>
            <li className="nav_main_menu_item">Производственный учет
                <ul>
                    <li><Link to='/welding'>Сварка</Link></li>
                    <li><Link to='/welding'>Звенья / Бригады</Link></li>
                </ul></li>
            <li className="nav_main_menu_item"><Link to='/documents'>Документы</Link>
                <ul>
                    <li><Link to='/documents'>Документооборот</Link></li>
                    <li><Link to='/documents'>Файловый менеджер</Link></li>
                </ul></li>
            <li className="nav_main_menu_item"><Link to='/docpasslist'>Задачи</Link>
                <ul>
                    <li><Link to='/docpasslist'>Планировщик задач</Link></li>
                    <li><Link to='/tasks'>Совещание</Link></li>
                    <li><Link to='/main'>Календарь</Link></li>
                </ul></li>
            <li className="nav_main_menu_item">Отчёты</li>
            <li className="nav_main_menu_item"><Link to='/peoples'>Сотрудники</Link></li>
        </ul>
    )
}