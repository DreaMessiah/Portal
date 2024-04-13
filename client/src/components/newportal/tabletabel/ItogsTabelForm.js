import React, {useContext, useEffect, useState} from "react";
import "./tabel.scss";
import CmsDatePicket from "../../inputs/CmsDatePicket";
import Select from "react-select";
import WriteTabelService from "../../../services/WriteTabelService";



export const ItogsTabelForm = () => {

    const [custmonth, setCustmonth] = useState('')
    const [custyear, setCustyear] = useState('')
    const [tabel, setTabel] = useState([])

    let now = new Date();
    let nowYear = now.getFullYear()
    let nowMonth = now.getMonth()

    const selMonth = [
        {index: 0, value: 0, label: 'январь'},
        {index: 1, value: 1, label: 'февраль'},
        {index: 2, value: 2, label: 'март'},
        {index: 3, value: 3, label: 'апрель'},
        {index: 4, value: 4, label: 'май'},
        {index: 5, value: 5, label: 'июнь'},
        {index: 6, value: 6, label: 'июль'},
        {index: 7, value: 7, label: 'август'},
        {index: 8, value: 8, label: 'сентябрь'},
        {index: 9, value: 9, label: 'октябрь'},
        {index: 10, value: 10, label: 'ноябрь'},
        {index: 11, value: 11, label: 'декабрь'}
    ]

    const selYear = [
        {index: 0, value: 2023, label: '2023'},
        {index: 1, value: 2024, label: '2024'},
        {index: 2, value: 2025, label: '2025'}
    ]

    const getList = async () => {
        if(custmonth === '' || custyear === ''){
            const month = nowMonth
            const year = nowYear
            console.log('нет состояния')
            console.log(month)
            console.log(year)
        } else {
            const month = custmonth
            const year = custyear
            console.log('есть состояние')
            console.log(month)
            console.log(year)
        }
        const gettabel = await WriteTabelService.getItogy()
    }

    const clearFilter = () => {
        setCustmonth('')
        setCustyear('')
    }

    useEffect(()=>{
        getList()
    }, [custmonth, custyear])

    return (
        <div className='itogy_form'>
            <div className="title">Итоговый табель</div>
            <div className="filter">
                <Select placeholder="Выбрать месяц" onChange={(e) => setCustmonth(selMonth[e.index])} value={custmonth} options={selMonth} styles={{container:(baseStyles, state) => ({...baseStyles,width:'250px'})}}/>
                <Select placeholder="Выбрать год" onChange={(e) => setCustyear(selYear[e.index])} value={custyear} options={selYear} styles={{container:(baseStyles, state) => ({...baseStyles,width:'250px'})}}/>
                <div onClick={()=>clearFilter()}>сбросить</div>
            </div>
            <div className="tbl">
            <table>
                <thead>
                <tr>
                    <th>Шифр</th><th>Рас. шифр</th><th>Табельный №</th><th>ФИО</th><th>Должность</th><th>Отдел</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th>
                    <th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th>
                    <th>21</th><th>22</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th><th>28</th><th>29</th><th>30</th><th>31</th><th>Транспорт</th>
                    <th>Ставка</th><th>КТУ участок</th><th>КТУ по СЗ</th><th>Примечание</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>2 автоколонна</td>
                        <td>395</td>
                        <td>2140012749</td>
                        <td>Абабков Владимир Михайлович</td>
                        <td>машинист экскаватора 6 разряда</td>
                        <td>Автоколонна №2</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>

                        <td>Хитачи</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>()</td>

                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}