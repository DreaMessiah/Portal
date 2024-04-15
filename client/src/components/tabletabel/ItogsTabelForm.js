import React, {useContext, useEffect, useState} from "react";
import "./tabel.scss";
import CmsDatePicket from "../inputs/CmsDatePicket";
import Select from "react-select";
import WriteTabelService from "../../services/WriteTabelService";
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import {Context} from "../../index";



export const ItogsTabelForm = () => {

    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];

    const [custmonth, setCustmonth] = useState('')
    const [custyear, setCustyear] = useState('')
    const [tabel, setTabel] = useState([])
    const [t13, setT13] = useState([])

    const [list, setList] = useState([])

    let now = new Date();
    let nowYear = now.getFullYear()
    let nowMonth = now.getMonth()

    const message = useMessage()

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
    const  {store} = useContext(Context)
    const inn = store.user.inn
    let month
    let year
    const makeList = () => {
        let pusharr = []
        if(tabel.length > 0 && t13.length > 0) {
            message('готово')

            tabel.forEach(man => {
                if(man.tn !== ''){
                    t13.forEach(strock => {
                        if(man.tn === strock.tn ){
                            man.d1 = strock.d1;man.d2 = strock.d2;man.d3 = strock.d3;man.d4 = strock.d4;man.d5 = strock.d5;man.d6 = strock.d6;man.d7 = strock.d7;man.d8 = strock.d8;man.d9 = strock.d9;man.d10 = strock.d10;man.d11 = strock.d11;man.d12 = strock.d12;man.d13 = strock.d13;man.d14 = strock.d14;man.d15 = strock.d15;man.d16 = strock.d16;man.d17 = strock.d17;man.d18 = strock.d18;man.d19 = strock.d19;man.d20 = strock.d20;man.d21 = strock.d21;man.d22 = strock.d22;man.d23 = strock.d23;man.d24 = strock.d24;man.d25 = strock.d25;man.d26 = strock.d26;man.d27 = strock.d27;man.d28 = strock.d28;man.d29 = strock.d29;man.d30 = strock.d30;man.d31 = strock.d31;
                        }
                    })
                }
                pusharr.push(man)
            })
        } else {
            message('проверьте т13 (не найден т13 или неполностью выбран период)')
            tabel.forEach(man => {
                man.d1 = '';man.d2 = '';man.d3 = '';man.d4 = '';man.d5 = '';man.d6 = '';man.d7 = '';man.d8 = '';man.d9 = '';man.d10 = '';man.d11 = '';man.d12 = '';man.d13 = '';man.d14 = '';man.d15 = '';man.d16 = '';man.d17 = '';man.d18 = '';man.d19 = '';man.d20 = '';man.d21 = '';man.d22 = '';man.d23 = '';man.d24 = '';man.d25 = '';man.d26 = '';man.d27 = '';man.d28 = '';man.d29 = '';man.d30 = '';man.d31 = '';
                pusharr.push(man)
            })
        }
        console.log(pusharr)
        setList(pusharr)
    }

    const getList = async () => {
        try{


            if(custmonth === '' || custyear === ''){
                month = nowMonth
                year = nowYear
                console.log('нет состояния')
                console.log(month)
                console.log(year)
            } else {
                month = custmonth.value
                year = custyear.value
                console.log('есть состояние')
                console.log(month)
                console.log(year)
                message('Итоговый табель за '+months[month]+' '+year)
            }

            const getnamemonth = months[month]

            const gettabel = await WriteTabelService.getItogy({month, year})
            console.log(gettabel.data)
            year = year+''
            const listMan = await ObjsService.getT13({inn, month: getnamemonth, year})
            console.log(listMan.data)
            setT13(listMan.data)
            setTabel(gettabel.data)
        }catch{

        }


    }

    const clearFilter = () => {
        setCustmonth('')
        setCustyear('')
    }

    useEffect(()=>{
        getList()
    }, [custmonth, custyear])

    useEffect(()=>{
        makeList()
    }, [tabel, t13])

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
                <thead className="head">
                <tr>
                    <th>Шифр</th><th>Рас. шифр</th><th>Табельный №</th><th>ФИО</th><th>Должность</th><th>Отдел</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th>
                    <th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th><th>16</th><th>17</th><th>18</th><th>19</th><th>20</th>
                    <th>21</th><th>22</th><th>23</th><th>24</th><th>25</th><th>26</th><th>27</th><th>28</th><th>29</th><th>30</th><th>31</th><th>Транспорт</th>
                    <th>Ставка</th><th>КТУ участок</th><th>КТУ по СЗ</th><th>Примечание</th>
                </tr>
                </thead>
                <tbody>
                {list.map((man, index)=>(
                    <tr key={index}>
                        <td>{man.shifr}</td>
                        <td>{man.ras}</td>
                        <td>{man.tn}</td>
                        <td>{man.name}</td>
                        <td>{man.developer}</td>
                        <td>{man.branch}</td>
                        <td>{(man.d1 !== '')?man.d1:man.m1}</td>
                        <td>{(man.d2 !== '')?man.d2:man.m2}</td>
                        <td>{(man.d3 !== '')?man.d3:man.m3}</td>
                        <td>{(man.d4 !== '')?man.d4:man.m4}</td>
                        <td>{(man.d5 !== '')?man.d5:man.m5}</td>
                        <td>{(man.d6 !== '')?man.d6:man.m6}</td>
                        <td>{(man.d7 !== '')?man.d7:man.m7}</td>
                        <td>{(man.d8 !== '')?man.d8:man.m8}</td>
                        <td>{(man.d9 !== '')?man.d9:man.m9}</td>
                        <td>{(man.d10 !== '')?man.d10:man.m10}</td>
                        <td>{(man.d11 !== '')?man.d11:man.m11}</td>
                        <td>{(man.d12 !== '')?man.d12:man.m12}</td>
                        <td>{(man.d13 !== '')?man.d13:man.m13}</td>
                        <td>{(man.d14 !== '')?man.d14:man.m14}</td>
                        <td>{(man.d15 !== '')?man.d15:man.m15}</td>
                        <td>{(man.d16 !== '')?man.d16:man.m16}</td>
                        <td>{(man.d17 !== '')?man.d17:man.m17}</td>
                        <td>{(man.d18 !== '')?man.d18:man.m18}</td>
                        <td>{(man.d19 !== '')?man.d19:man.m19}</td>
                        <td>{(man.d20 !== '')?man.d1:man.m20}</td>
                        <td>{(man.d21 !== '')?man.d21:man.m21}</td>
                        <td>{(man.d22 !== '')?man.d22:man.m22}</td>
                        <td>{(man.d23 !== '')?man.d23:man.m23}</td>
                        <td>{(man.d24 !== '')?man.d24:man.m24}</td>
                        <td>{(man.d25 !== '')?man.d25:man.m25}</td>
                        <td>{(man.d26 !== '')?man.d26:man.m26}</td>
                        <td>{(man.d27 !== '')?man.d27:man.m27}</td>
                        <td>{(man.d28 !== '')?man.d28:man.m28}</td>
                        <td>{(man.d29 !== '')?man.d29:man.m29}</td>
                        <td>{(man.d30 !== '')?man.d30:man.m30}</td>
                        <td>{(man.d31 !== '')?man.d31:man.m31}</td>

                        <td>{man.transport}</td>
                        <td>{man.price}</td>
                        <td>{man.ktu}</td>
                        <td>{man.m31}</td>
                        <td>()</td>

                    </tr>
                ))}

                </tbody>
            </table>
            </div>
        </div>
    )
}