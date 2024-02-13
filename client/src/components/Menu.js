import React from "react";
import '../assets/styles/styles.scss'

export const Menu = () => {
    return (
        <ul className="nav_main_menu">
            <li className="nav_main_menu_item">Проекты / Объекты
                <ul>
                    <li>Объекты</li>
                    <li>Сварка</li>
                    <li>Файлы</li>
                </ul>
            </li>
            <li className="nav_main_menu_item">Производственный учет
                <ul>
                    <li>Сварка</li>
                    <li>Звенья / Бригады</li>
                </ul></li>
            <li className="nav_main_menu_item">Документы
                <ul>
                    <li>Документооборот</li>
                    <li>Файловый менеджер</li>
                </ul></li>
            <li className="nav_main_menu_item">Задачи
                <ul>
                    <li>Планировщик задач</li>
                    <li>Совещание</li>
                    <li>Календарь</li>
                </ul></li>
            <li className="nav_main_menu_item">Отчёты</li>
            <li className="nav_main_menu_item">Сотрудники</li>
        </ul>
    )
}