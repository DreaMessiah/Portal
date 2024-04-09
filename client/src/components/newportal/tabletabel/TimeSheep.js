import React, {useContext, useEffect, useState} from "react";
import "../welding/tabelwelding/tabelform.scss";
import "../welding/tabelwelding/tabviewwork1920.scss";
import "../welding/tabelwelding/tabviewwork1550.scss";
import "../welding/tabelwelding/tabviewwork1080.scss";
import {Link, useLocation} from "react-router-dom";
import {TimeSheepList} from "./TimeSheepList";
import {useMonth} from "../../../hooks/month.hook";
import ObjsService from "../../../services/ObjsService";
import {Context} from "../../../index";
import Select from "react-select";
import {DataContext} from "../../../context/DataContext";
import WriteTabelService from "../../../services/WriteTabelService";



export const TimeSheepPortal = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let getId = searchParams.get('id');
    let getShifr = searchParams.get('shifr');
    let getMonth = searchParams.get('month');
    let getYear = searchParams.get('year');
    const  {store} = useContext(Context)
    const inn = store.user.inn
    console.log(inn)
    const login = store.user.login
    //let tabelView = []
    let tabelMans = []

    const pushMonth = useMonth()
    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    const [listObjs, setListObjs] = useState([])
    const [listMans, setListMans] = useState([])
    const [thisMans, setThisMans] = useState([])

    console.log(getId)
    console.log(getMonth)
    console.log(getYear)

    let month = +getMonth
    let year = getYear
    console.log(month)
    console.log(year)

    const irr = (event) => {

    }
    const {table_tabel} = useContext(DataContext)
    const [listPeoples, setListPeoples] = useState([])
    const options = [{value:1, label: 'GD'},{value:1, label: '4'},{value:1, label: '1'},{value:1, label: '3'},{value:1, label: '2'}]

    const stylesday = {
        option: (baseStyles, state) => ({
            ...baseStyles,
            color: '#000',
            backgroundColor: '#FFF',
            fontFamily:'Montserrat, sans-serif',
            textTransform:'uppercase',
            fontSize:'0.7rem',
            fontWeight:'600',
            padding: '0px'

        }),
        control: (baseStyles, state) => ({
            // ...baseStyles,
            backgroundColor: '#FFF',
            borderWidth:'0px',
            borderRadius:'0',
            borderColor:'rgba(180, 180, 180, 1)',
            height:'40px',
            width:'40px',
            outline: 'none',
            appearance:'none',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            padding: '0px',
            margin: '0px',
            div: {
                fontFamily:'Montserrat, sans-serif',
                textTransform:'uppercase',
                fontSize:'0.7rem',
                fontWeight:'600',
                color: '#000 !important', // Устанавливаем цвет текста внутри input
            },
            ':hover': {
                borderColor:'rgba(180, 180, 180, 1)',  // Замените цветом, который вы хотите видеть при наведении
            },
            ':focus-within': {
                color:'rgba(180, 180, 180, 1)',
                outline: 'none',
                boxShadow: 'none',
            }
        }),

        indicatorsContainer:(baseStyles, state) => ({
            display:'none',
        }),
    }
    const listMansOfTabel = async (e) => {
        let month = pushMonth(getMonth)
        let year = getYear
        let shifre = getShifr
        const listTable = await ObjsService.listTabelMans({inn, shifre, month, year})
        setListPeoples(listTable.data)
        // setListObjs(viewList.data)
        console.log(listTable.data)
    }


    const getMyObj = (num, param) => {
        let getParam
        listObjs.forEach(obj => {
            if(obj.id === parseInt(num)){
                getParam = obj[param]
            }
        })
        return getParam
    }


    const viewAllObjs = async (e) => {

        const viewList = await ObjsService.getObjs({inn})
        setListObjs(viewList.data)
        console.log(viewList.data)
    }


    const t13List = async (e) => {
        let newArr
        try {
            month = 'январь'
            console.log(month)
            const listMan = await ObjsService.getT13({inn, month, year})
            let i = 0
            console.log(listMan.data)
            if (listMan.data.length !== 0){

                listMan.data.forEach(man => {
                    man.label = man.name + '  ' + man.developer
                    man.value = man.tn
                    man.index = i
                    i++
                })
                setListMans(listMan.data)
            } else {
                month = months[month - 1];
                try{
                    const listMan = await ObjsService.getT13({inn, month, year})
                    listMan.data.forEach(man => {
                        man.label = man.name + '  ' + man.developer
                        man.value = man.tn
                        man.index = i
                        i++
                    })
                    setListMans(listMan.data)
                } catch {

                }

            }


            // console.log(listMans)
        } catch {
            alert('ебобо скрипт проверь')
        }
    }

    const plusMan = async () => {
        console.log(thisMans)
        const man = thisMans
        man.month = months[+getMonth]
        man.year = getYear
        man.shifr = getMyObj(getShifr, 'shifr')
        man.objid = getShifr
        try{
            const createLineMan = await WriteTabelService.plusMan({man})
            if(createLineMan.data){listMansOfTabel()}
        }catch(e){
            console.log(e.error)
        }
    }

    const editDay = async (day, val, idline) => {
        console.log('день: '+day)
        console.log('часов: '+val)
        console.log('id строки: '+idline)
        const editDays = await WriteTabelService.editDay({day, val, idline})
    }

    useEffect(() => {
        viewAllObjs()
        t13List()
        listMansOfTabel()
    }, [])

    return (
        <div className='right-block-tabwelding'>
            <div className="tabwelding_header">
                <div className="tabwelding_header_upper">
                    <Link to={`/tabelportal?id=${getShifr}`} className="tabwelding_header_upper_backbtn">Назад</Link>
                    <div className="tabwelding_header_upper_title"><span>{getMyObj(getShifr, 'shifr')}</span> {pushMonth(getMonth)} {getYear}</div>
                    <div className="tabwelding_header_upper_controlbtn">Контроль</div>
                </div>
                <div className="tabwelding_header_newcrewblock">
                    <Select className='select' onChange={(e) => setThisMans(listMans[e.index])} value={thisMans} options={listMans}/>
                    <div className="tabwelding_header_newcrewblock_plusbtn" onClick={()=>plusMan()}>Добавить сотрудника</div>
                    {/*<div className="tabwelding_header_newcrewblock_plusbtn" onClick={() => setCrew(!crew)}>Добавить звено</div>*/}
                </div>
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tab_tabel">
                <div className="tab_tabel_tabelman ">
                    {listPeoples.map((man, index) => (
                        <div key={index} className="tab_tabel_tabelman_strock">
                            <div className="tab_tabel_tabelman_strock_num">{index + 1}</div>
                            <div className="tab_tabel_tabelman_strock_fio">
                                <div className="tab_tabel_tabelman_strock_fio_name">{man.name}</div>
                                <div className="tab_tabel_tabelman_strock_fio_dev">{man.developer}</div>
                            </div>
                            <div className="tab_tabel_tabelman_strock_calendar">
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">1</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b border-b no-left-border_sel" onChange={(e)=>editDay('m1', e.target.value, man.id)}>
                                            <option>{man.m1}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7,2</option>
                                            <option>4</option>
                                            <option></option>
                                        </select>
                                        {/*<Select styles={stylesday} options={options} value={man.m1} placeholder=''/>*/}
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b no-left-border" onChange={irr} defaultValue={man.m1}></input>*/}
                                    </div>

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">16</div>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b no-left-border" onChange={irr} defaultValue={man.m16}></input>*/}
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b border-b no-left-border_sel" onChange={(e)=>editDay('m16', e.target.value, man.id)}>
                                            <option>{man.m16}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">2</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m2', e.target.value, man.id)}>
                                            <option>{man.m2}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m2}></input>*/}
                                    </div>

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">17</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m17', e.target.value, man.id)}>
                                            <option>{man.m17}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m17}></input>*/}
                                    </div>
                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">3</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m3', e.target.value, man.id)}>
                                            <option>{man.m3}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m3}></input>*/}
                                    </div>

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">18</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m18', e.target.value, man.id)}>
                                            <option>{man.m18}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m18}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">4</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m4', e.target.value, man.id)}>
                                            <option>{man.m4}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m4}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">19</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m19', e.target.value, man.id)}>
                                            <option>{man.m19}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m19}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">5</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m5', e.target.value, man.id)}>
                                            <option>{man.m5}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m5}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">20</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m20', e.target.value, man.id)}>
                                            <option>{man.m20}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m20}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">6</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m6', e.target.value, man.id)}>
                                            <option>{man.m6}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m6}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">21</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m21', e.target.value, man.id)}>
                                            <option>{man.m21}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m21}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">7</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m7', e.target.value, man.id)}>
                                            <option>{man.m7}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m7}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">22</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m22', e.target.value, man.id)}>
                                            <option>{man.m22}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m22}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">8</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m8', e.target.value, man.id)}>
                                            <option>{man.m8}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m8}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">23</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m23', e.target.value, man.id)}>
                                            <option>{man.m23}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m23}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">9</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m9', e.target.value, man.id)}>
                                            <option>{man.m9}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m9}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">24</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m24', e.target.value, man.id)}>
                                            <option>{man.m24}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m24}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">10</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m10', e.target.value, man.id)}>
                                            <option>{man.m10}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m10}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">25</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m25', e.target.value, man.id)}>
                                            <option>{man.m25}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m25}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">11</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m11', e.target.value, man.id)}>
                                            <option>{man.m11}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m11}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">26</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m26', e.target.value, man.id)}>
                                            <option>{man.m26}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m26}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">12</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m12', e.target.value, man.id)}>
                                            <option>{man.m12}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m12}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">27</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m27', e.target.value, man.id)}>
                                            <option>{man.m27}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m27}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">13</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m13', e.target.value, man.id)}>
                                            <option>{man.m13}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m13}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">28</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m28', e.target.value, man.id)}>
                                            <option>{man.m28}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m28}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">14</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m14', e.target.value, man.id)}>
                                            <option>{man.m14}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m14}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">29</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m29', e.target.value, man.id)}>
                                            <option>{man.m29}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m29}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">15</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m15', e.target.value, man.id)}>
                                            <option>{man.m15}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m15}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">30</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m30', e.target.value, man.id)}>
                                            <option>{man.m30}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m30}></input>*/}
                                    </div>

                                </div>
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title top-border-1px">31</div>
                                        <select className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m31', e.target.value, man.id)}>
                                            <option>{man.m31}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m31}></input>*/}
                                    </div>

                                </div>
                            </div>
                            <div className="tab_tabel_tabelman_strock_itogy">
                                <div className="tab_tabel_tabelman_strock_itogy-header">Итого</div>
                                <div className="tab_tabel_tabelman_strock_itogy-sum">0</div>
                            </div>
                            <div className="tab_tabel_tabelman_strock_dop">
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">КТУ</div>
                                        <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.ktu}></input>
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">метод</div>
                                        <div className="tab_tabel_tabelman_s_c_c_day_content border-b">ВЭМ</div>
                                    </div>

                                </div>
                            </div>
                            <div className="tab_tabel_tabelman_strock_shifrtransport">
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">объект</div>
                                        <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.ras}></input>
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">транспорт</div>
                                        <input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.transport}></input>
                                    </div>

                                </div>
                            </div>
                            <div className="tab_tabel_tabelman_strock_comment">
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/*<ModalWin data={<NewCrewModal sel={select} active={crew} setActive={setCrew}/>} active={crew} setActive={setCrew}/>*/}
        </div>
    )
}