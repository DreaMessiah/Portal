import './paylist.scss'
import React, {useState, useEffect, useContext} from 'react';
import NewsNavbar from "../../components/NewsNavbar"
import {Link,useLocation} from "react-router-dom";
import NewsFooter from "../../components/NewsFooter";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";



export const PayList = () => {

    return (
        <div className='thispage'>
            <div className='newspage'>
                <div className='main_path'>
                    <NewsNavbar/>
                    <div className='new_back'>
                        <div className='info_news'>
                            <div className='info between'>
                                <Link className='button' to='/main'>Корпоративный Портал</Link>
                                <Link className='button' to='/paylist'>Расчетный лист</Link>
                                <Link className='button' to='/news'>Телефонный справочник</Link>
                            </div>
                            <div className='polosa'></div>
                            <div className='info'>
                                <p>ФИО: Барахтянский Владимир Алексеевич</p>
                                <p>Должность: Разрабочик ПО</p>
                                <p>Подразделение: Отдел управления инновационной деятельностью</p>
                                <p>Внутренний телефон: 116</p>
                                <p>Стаж работы: 2 года 5 месяцев</p>
                            </div>
                        </div>
                        <div className='rows_news'>

                        </div>
                    </div>
                </div>


            </div>
            <NewsFooter/>
            <div className='backimg'>
                <div className='backcol'></div>
            </div>
        </div>
    )
}