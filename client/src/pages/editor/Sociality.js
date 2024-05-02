import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "./soc.scss"

function Sociality(){

    const [create, setCreate] = useState(false)

    return (
        <div className="soclist">
            <div className="soclist_title">Список социальных программ</div>
            <div className={'text'}><p>Для создания новой программы нажмите кнопку Создать</p><p>Для редактирования существующей программы, необходимо выбрать программу из списка</p></div>
            <div className="soclist_btns">
                <div className="soclist_upload" onClick={()=>setCreate(true)}>Создать</div>
            </div>
            <div className="soclist_list">
                <div className="soclist_list_line">
                    <div className="soclist_list_line_name nametitle">П/П</div>
                    <div className="soclist_list_line_price title">Дата создания / изменения</div>
                    <div className="soclist_list_line_group title">Наименование</div>
                    <div className="soclist_list_line_cropname title borderrightnone"></div>
                </div>

                    <div className="soclist_list_line bordertopnone">
                        <div className="soclist_list_line_name">1</div>
                        <div className="soclist_list_line_name">12.05.2024</div>
                        <div className="soclist_list_line_name">Проверочная программа</div>
                        <div className="soclist_list_line_name"></div>
                        <div className="soclist_list_line_del"><i className="fa-solid fa-pen-to-square"/></div>
                    </div>

            </div>

            <div className='glass' style={(create)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board"></div>
            </div>
        </div>
    )
}

export default observer(Sociality)