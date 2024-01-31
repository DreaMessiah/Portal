import './paylist.scss'
import React, {useState, useEffect, useContext} from 'react';
import NewsNavbar from "../../components/NewsNavbar"
import {Link,useLocation} from "react-router-dom";
import NewsFooter from "../../components/NewsFooter";
import Select from 'react-select'


export const PayList = () => {
    const toBack = () => {
        window.history.back()
    }

    const optionsMonth = [
        { value: '1', label: 'январь' },
        { value: '2', label: 'февраль' },
        { value: '3', label: 'март' },
        { value: '4', label: 'апрель' },
        { value: '5', label: 'май' },
        { value: '6', label: 'июнь' },
        { value: '7', label: 'июль' },
        { value: '8', label: 'август' },
        { value: '9', label: 'сентябрь' },
        { value: '10', label: 'октябрь' },
        { value: '11', label: 'ноябрь' },
        { value: '12', label: 'декабрь' }
    ]

    const optionsYear = [
        { value: '1', label: '2024' },
        { value: '2', label: '2025' },
        { value: '3', label: '2026' }
    ]
    return (
        <div className='thispage'>
            <div className='newspage'>
                <div className='main_path'>
                    <NewsNavbar/>
                    <div className='new_back'>
                        <div className='info_news'>
                            <div className='info between'>
                                <Link className='toback' onClick={()=>toBack()}>НАЗАД</Link>
                                <div className="select_block">
                                    <div className="select_block_title">МЕСЯЦ</div>
                                    <Select className='select' options={optionsMonth}/>
                                </div>

                                <div className="select_block">
                                    <div className="select_block_title">ГОД</div>
                                    <Select className='select' options={optionsYear}/>
                                </div>
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
                        <div className='info_news'>
                            <div className='info'>

                            </div>
                            <div className='polosa'></div>

                            <div className='info between'>
                                <div className='payslip_right'>
                                    <p>ФИО: Барахтянский Владимир Алексеевич</p>
                                    <p>Должность: Разрабочик ПО</p>
                                    <p>Подразделение: Отдел управления инновационной деятельностью</p>
                                    <p>Внутренний телефон: 116</p>
                                    <p>Стаж работы: 2 года 5 месяцев</p>
                                </div>

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