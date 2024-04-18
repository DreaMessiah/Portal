import React, {useContext, useEffect, useState} from "react";
import "../welding/tabelwelding/tabelform.scss";
import "../welding/tabelwelding/tabviewwork1920.scss";
import "../welding/tabelwelding/tabviewwork1550.scss";
import "../welding/tabelwelding/tabviewwork1080.scss";
import {Link, useLocation} from "react-router-dom";
import {TimeSheepList} from "./TimeSheepList";
import {useMonth} from "../../hooks/month.hook";
import ObjsService from "../../services/ObjsService";
import {Context} from "../../index";
import Select from "react-select";
import {DataContext} from "../../context/DataContext";
import WriteTabelService from "../../services/WriteTabelService";
import {useMessage} from "../../hooks/message.hook";
import ModalFiles from "../modalwin/ModalFiles";
import {WritedTabel} from "./modalactive/WritedTabel";
import {DelManTabel} from "./modalactive/DelManTabel";



export const TimeSheepPortal = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let getId = searchParams.get('id');
    let getShifr = searchParams.get('shifr');
    let getMonth = searchParams.get('month');
    let getYear = searchParams.get('year');
    const message = useMessage()
    const  {store} = useContext(Context)
    const inn = store.user.inn
    const login = store.user.login
    //let tabelView = []
    let tabelMans = []



    const pushMonth = useMonth()
    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    let now = new Date();
    let nowYear = now.getFullYear()
    let nowMonth = now.getMonth()
    const [listObjs, setListObjs] = useState([])
    const [listMans, setListMans] = useState([])
    const [thisMans, setThisMans] = useState([])
    const [wractive, setWractive] = useState(false)
    const [blocked, setBlocked] = useState(false)

    const [custmonth, setCustmonth] = useState('')
    const [custyear, setCustyear] = useState('')
    const [tabel, setTabel] = useState([])
    const [t13, setT13] = useState([])
    const [list, setList] = useState([])
    const [ktu, setKtu] = useState([])

    const [writed, setWrited] = useState(false)
    const [listTransport, setListTransport] = useState([])

    let month = +getMonth
    let year = getYear

    const methods = (tn) => {
        let method = ''
        if(tn.length > 0){
            listMans.forEach(man => {
                if(man.tn === tn){
                    method = man.method
                }
            })
        }
        if(method.length > 0){
            const remet = method.slice(0,3).toLowerCase()
            if(remet === 'вах'){
                return 'ВЭМ'
            } else {
                return 'ПОС'
            }
        }else{
            return '?'
        }
    }

    const getDayWeek = day => {
        const makeyear = +getYear
        const makemonth = +getMonth

        var thisdate = new Date(makeyear, makemonth, day);

        var dayOfWeek = thisdate.getDay();

        if(dayOfWeek === 0 || dayOfWeek === 6){
            return true
        } else {
            return false
        }
    }

    const irr = (event) => {

    }
    const {table_tabel} = useContext(DataContext)
    const [listPeoples, setListPeoples] = useState([])
    const options = [{value:1, label: 'GD'},{value:1, label: '4'},{value:1, label: '1'},{value:1, label: '3'},{value:1, label: '2'}]


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

                if(!man.d1){
                    man.d1 = '';man.d2 = '';man.d3 = '';man.d4 = '';man.d5 = '';man.d6 = '';man.d7 = '';man.d8 = '';man.d9 = '';man.d10 = '';man.d11 = '';man.d12 = '';man.d13 = '';man.d14 = '';man.d15 = '';man.d16 = '';man.d17 = '';man.d18 = '';man.d19 = '';man.d20 = '';man.d21 = '';man.d22 = '';man.d23 = '';man.d24 = '';man.d25 = '';man.d26 = '';man.d27 = '';man.d28 = '';man.d29 = '';man.d30 = '';man.d31 = '';
                }
                pusharr.push(man)
            })
        } else {
            // message('проверьте т13 (не найден т13 или неполностью выбран период)')
            tabel.forEach(man => {
                man.d1 = '';man.d2 = '';man.d3 = '';man.d4 = '';man.d5 = '';man.d6 = '';man.d7 = '';man.d8 = '';man.d9 = '';man.d10 = '';man.d11 = '';man.d12 = '';man.d13 = '';man.d14 = '';man.d15 = '';man.d16 = '';man.d17 = '';man.d18 = '';man.d19 = '';man.d20 = '';man.d21 = '';man.d22 = '';man.d23 = '';man.d24 = '';man.d25 = '';man.d26 = '';man.d27 = '';man.d28 = '';man.d29 = '';man.d30 = '';man.d31 = '';
                pusharr.push(man)
            })
        }
        setList(pusharr)
    }

    const makeWrite = async () => {
        setWractive(!wractive)
        if(blocked){

        }
    }

    const writeCheck = async () => {
        try{
            const getTabel = await WriteTabelService.getThisTabel({month: ''+month, year: year, object_id: getShifr})
            const result = getTabel.data
            if(result === 'error'){
                message('Обратиться в поддержку')
            } else {
                if(result.auto === 0 || result.auto === null){
                    setWrited(false)
                }else{
                    setWrited(true)
                }

            }
        }catch(e){
            console.log(e)
        }


    }

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

    const transportList = async () => {
        const viewList = await WriteTabelService.getTransport({inn})
        setListTransport(viewList.data)
    }

    const listMansOfTabel = async (e) => {
        let month = pushMonth(getMonth)
        let year = getYear
        let shifre = getShifr
        const listTable = await ObjsService.listTabelMans({inn, shifre, month, year})
        setListPeoples(listTable.data)
        // setListObjs(viewList.data)
        setTabel(listTable.data)
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
        try {
            const viewList = await ObjsService.getObjs()
            setListObjs(viewList.data)
            console.log(viewList.data)
        }catch (e) {
            console.log('puizercvccvfg')
        }
    }

    const t13List = async (e) => {
        let newArr
        try {
            month = months[+getMonth]
            const listMan = await ObjsService.getT13({inn, month, year})
            let i = 0
            if (listMan.data.length > 100){

                listMan.data.forEach(man => {
                    man.label = man.name + '  ' + man.developer
                    man.value = man.tn
                    man.index = i
                    i++
                })
                setListMans(listMan.data)
                setT13(listMan.data)
            } else {
                month = months[getMonth - 1];
                try{
                    const listMan = await ObjsService.getT13({inn, month, year})
                    listMan.data.forEach(man => {
                        man.label = man.name + '  ' + man.developer
                        man.value = man.tn
                        man.index = i
                        i++
                    })
                    setListMans(listMan.data)
                    setT13([])
                } catch {

                }

            }
            // console.log(listMans)
        } catch {
            alert('ебобо скрипт проверь')
        }
    }

    const plusMan = async () => {
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
        const editDays = await WriteTabelService.editDay({day, val, idline})
    }

    const getKTU = async () => {
        try{
            const month = +getMonth
            const year = +getYear
            const startDate = new Date(year, month, 2);
            const endDate = new Date(year, month+1, 1);
            const startDateString = startDate.toISOString().slice(0, 10);
            const endDateString = endDate.toISOString().slice(0, 10);

            const listKTU = await ObjsService.getKTUdate({datestart: startDateString, dateend: endDateString})
            setKtu(listKTU.data)

        }catch(e){
            console.log(e)
        }
    }

    const pushKTU = tn => {
        let ktumess = []
        ktu.forEach(item => {
            console.log(item)
            if(item.user_tn === tn){

                ktumess.push('КТУ по СЗ: '+item.ktu+' | Содержание: '+item.content)
            }
        })
        return ktumess
    }

    const copyTab = async () => {
        let month = pushMonth(getMonth)
        let year = getYear
        let shifre = getShifr
        let shifrname = getMyObj(getShifr, 'shifr')
        // const listTable = await ObjsService.listTabelMans({inn, shifre, month, year})
        const rescopy = await ObjsService.copyTab({inn, shifre, month, year, shifrname})
        const result = rescopy.data
        if(result === true){
            message('Копирование табеля на следующий месяц произведено, можете перейти в него для работы')
        } else {
            message('НЕ скопировано! Табель на следующий месяц уже существует')
        }
    }
    const [delwin, setDelwin] = useState(false)
    const [idman, setIdman] = useState('no')
    const [nameman, setNameman] = useState('no')
    const [devman, setDevman] = useState('no')
    const [izm, setIzm] = useState('')



    const deleteMan = (id, name, developer) =>{

        setIdman(id)
        setNameman(name)
        setDevman(developer)
        setDelwin(!delwin)
    }

    function isNumeric(value) {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    const rayDay = day => {
        let p = 0
        if(isNumeric(day)){
            p = 1
        } else {
            p = 0
        }
        return p
    }

    useEffect(() => {
        getKTU()
        writeCheck()
        transportList()
        viewAllObjs()
        t13List()
        listMansOfTabel()
    }, [])

    useEffect(()=>{
        makeList()
    }, [tabel, t13])

    return (
        <div className='right-block-tabwelding'>
            <ModalFiles data={<DelManTabel func={listMansOfTabel} idmandel={idman} namemandel={nameman} devmandel={devman}  active={delwin} setActive={setDelwin} month={getMonth} year={getYear} getShifr={getShifr}/>} active={delwin} setActive={setDelwin}></ModalFiles>
            <ModalFiles data={<WritedTabel write={writed} setWrite={setWrited} active={wractive} setActive={setWractive} month={getMonth} year={getYear} getShifr={getShifr}/>} active={wractive} setActive={setWractive}></ModalFiles>
            <div className="tabwelding_header">
                <div className="tabwelding_header_upper">
                    <Link to={`/tabelportal?id=${getShifr}`} className="tabwelding_header_upper_backbtn">Назад</Link>
                    <div className="tabwelding_header_upper_title"><span>{getMyObj(getShifr, 'shifr')}</span> {pushMonth(getMonth)} {getYear}</div>
                    <div className="tabwelding_header_upper_controlbtn" onClick={()=>copyTab()}>Копировать</div><div style={(writed)?{display:'none'}:{display:'flex'}} className="tabwelding_header_upper_controlbtn" onClick={()=>{makeWrite()}}>Подписать</div>
                </div>
                <div className="tabwelding_header_newcrewblock">
                    <Select placeholder="Выбрать сотрудника" className='select' onChange={(e) => setThisMans(listMans[e.index])} value={thisMans} options={listMans} styles={{container:(baseStyles, state) => ({...baseStyles,width:'250px'})}}/>
                    <div className="tabwelding_header_newcrewblock_plusbtn" onClick={()=>plusMan()}>Добавить сотрудника</div>
                    {/*<div className="tabwelding_header_newcrewblock_plusbtn" onClick={() => setCrew(!crew)}>Добавить звено</div>*/}
                </div>
            </div>
            <div className="tabwelding_slice"></div>
            <div className="tab_tabel">
                <div className="tab_tabel_tabelman ">
                    {list.map((man, index) => (
                        <div key={index} className="tab_tabel_tabelman_strock">
                            <div className="tab_tabel_tabelman_strock_num">{index + 1}<i style={(writed)? {display:'none'}:{display:'block'}} class="fa-solid fa-trash" onClick={()=>deleteMan(man.id, man.name, man.developer)}/></div>
                            <div className="tab_tabel_tabelman_strock_fio">
                                <div className="tab_tabel_tabelman_strock_fio_name">{man.name}</div>
                                <div className="tab_tabel_tabelman_strock_fio_dev">{man.developer}</div>
                            </div>
                            <div className="tab_tabel_tabelman_strock_calendar">
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(1)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>1</div>
                                        <select disabled={(man.d1 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b border-b no-left-border_sel" onChange={(e)=>editDay('m1', e.target.value, man.id)}>
                                            <option>{(man.d1 === '')?man.m1:man.d1}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(16)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>16</div>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b no-left-border" onChange={irr} defaultValue={man.m16}></input>*/}

                                        <select disabled={(man.d16 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b border-b no-left-border_sel" onChange={(e)=>editDay('m16', e.target.value, man.id)}>

                                                <option>{(man.d16 === '')?man.m16:man.d16}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(2)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>2</div>
                                        <select disabled={(man.d2 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m2', e.target.value, man.id)}>
                                            <option>{(man.d2 === '')?man.m2:man.d2}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m2}></input>*/}
                                    </div>

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(17)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>17</div>
                                        <select disabled={(man.d17 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m17', e.target.value, man.id)}>
                                            <option>{(man.d17 === '')?man.m17:man.d17}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(3)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>3</div>
                                        <select disabled={(man.d3 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m3', e.target.value, man.id)}>
                                            <option>{(man.d3 === '')?man.m3:man.d3}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m3}></input>*/}
                                    </div>

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(18)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>18</div>
                                        <select disabled={(man.d18 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m18', e.target.value, man.id)}>
                                            <option>{(man.d18 === '')?man.m18:man.d18}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(4)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>4</div>
                                        <select disabled={(man.d4 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m4', e.target.value, man.id)}>
                                            <option>{(man.d4 === '')?man.m4:man.d4}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m4}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(19)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>19</div>
                                        <select disabled={(man.d19 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m19', e.target.value, man.id)}>
                                            <option>{(man.d19 === '')?man.m19:man.d19}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(5)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>5</div>
                                        <select disabled={(man.d5 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m5', e.target.value, man.id)}>
                                            <option>{(man.d5 === '')?man.m5:man.d5}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m5}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(20)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>20</div>
                                        <select disabled={(man.d20 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m20', e.target.value, man.id)}>
                                            <option>{(man.d20 === '')?man.m20:man.d20}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(6)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>6</div>
                                        <select disabled={(man.d6 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m6', e.target.value, man.id)}>
                                            <option>{(man.d6 === '')?man.m6:man.d6}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m6}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(21)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>21</div>
                                        <select disabled={(man.d21 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m21', e.target.value, man.id)}>
                                            <option>{(man.d21 === '')?man.m21:man.d21}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(7)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>7</div>
                                        <select disabled={(man.d7 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m7', e.target.value, man.id)}>
                                            <option>{(man.d7 === '')?man.m7:man.d7}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m7}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(22)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>22</div>
                                        <select disabled={(man.d22 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m22', e.target.value, man.id)}>
                                            <option>{(man.d22 === '')?man.m22:man.d22}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(8)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>8</div>
                                        <select disabled={(man.d8 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m8', e.target.value, man.id)}>
                                            <option>{(man.d8 === '')?man.m8:man.d8}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m8}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(23)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>23</div>
                                        <select disabled={(man.d23 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m23', e.target.value, man.id)}>
                                            <option>{(man.d23 === '')?man.m23:man.d23}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(9)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>9</div>
                                        <select disabled={(man.d9 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m9', e.target.value, man.id)}>
                                            <option>{(man.d9 === '')?man.m9:man.d9}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m9}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(24)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>24</div>
                                        <select disabled={(man.d24 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m24', e.target.value, man.id)}>
                                            <option>{(man.d24 === '')?man.m24:man.d24}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(10)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>10</div>
                                        <select disabled={(man.d10 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m10', e.target.value, man.id)}>
                                            <option>{(man.d10 === '')?man.m10:man.d10}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m10}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(25)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>25</div>
                                        <select disabled={(man.d25 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m25', e.target.value, man.id)}>
                                            <option>{(man.d25 === '')?man.m25:man.d25}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(11)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>11</div>
                                        <select disabled={(man.d11 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m11', e.target.value, man.id)}>
                                            <option>{(man.d11 === '')?man.m11:man.d11}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m11}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(26)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>26</div>
                                        <select disabled={(man.d26 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m26', e.target.value, man.id)}>
                                            <option>{(man.d26 === '')?man.m26:man.d26}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(12)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>12</div>
                                        <select disabled={(man.d12 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m12', e.target.value, man.id)}>
                                            <option>{(man.d12 === '')?man.m12:man.d12}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m12}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(27)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>27</div>
                                        <select disabled={(man.d27 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m27', e.target.value, man.id)}>
                                            <option>{(man.d27 === '')?man.m27:man.d27}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(13)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>13</div>
                                        <select disabled={(man.d13 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m13', e.target.value, man.id)}>
                                            <option>{(man.d13 === '')?man.m13:man.d13}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m13}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(28)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>28</div>
                                        <select disabled={(man.d28 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m28', e.target.value, man.id)}>
                                            <option>{(man.d28 === '')?man.m28:man.d28}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(14)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>14</div>
                                        <select disabled={(man.d14 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m14', e.target.value, man.id)}>
                                            <option>{(man.d14 === '')?man.m14:man.d14}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m14}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(29)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>29</div>
                                        <select disabled={(man.d29 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m29', e.target.value, man.id)}>
                                            <option>{(man.d29 === '')?man.m29:man.d29}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(15)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>15</div>
                                        <select disabled={(man.d15 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m15', e.target.value, man.id)}>
                                            <option>{(man.d15 === '')?man.m15:man.d15}</option>
                                            <option>11</option>
                                            <option>9</option>
                                            <option>8</option>
                                            <option>7</option>
                                            <option>4</option>
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.m15}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title" style={(getDayWeek(30)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>30</div>
                                        <select disabled={(man.d30 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m30', e.target.value, man.id)}>
                                            <option>{(man.d30 === '')?man.m30:man.d30}</option>
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
                                        <div className="tab_tabel_tabelman_s_c_c_day_title top-border-1px" style={(getDayWeek(31)?{backgroundColor: '#454545', color: '#FFF'}:{color: '#454545'})}>31</div>
                                        <select disabled={(man.d31 === '')?writed:true} className="tab_tabel_tabelman_s_c_c_day_content border-b " onChange={(e)=>editDay('m31', e.target.value, man.id)}>
                                            <option>{(man.d31 === '')?man.m31:man.d31}</option>
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
                                <div className="tab_tabel_tabelman_strock_itogy-sum">
                                    { rayDay(man.m1)+rayDay(man.m2)+rayDay(man.m3)+rayDay(man.m4)+rayDay(man.m5)+rayDay(man.m6)+rayDay(man.m7)+rayDay(man.m8)+rayDay(man.m9)+rayDay(man.m10)+rayDay(man.m11)+rayDay(man.m12)+rayDay(man.m13)+rayDay(man.m14)+rayDay(man.m15)+rayDay(man.m16)+rayDay(man.m17)+rayDay(man.m18)+rayDay(man.m19)+rayDay(man.m20)+rayDay(man.m21)+rayDay(man.m22)+rayDay(man.m23)+rayDay(man.m24)+rayDay(man.m25)+rayDay(man.m26)+rayDay(man.m27)+rayDay(man.m28)+rayDay(man.m29)+rayDay(man.m30)+rayDay(man.m31)}</div>
                            </div>
                            <div className="tab_tabel_tabelman_strock_dop">
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">КТУ</div>
                                        <select disabled={writed} className="tab_tabel_tabelman_s_c_c_day_content border-b " style={{width: '48px', appearance: 'none'}} onChange={(e)=>editDay('ktu', e.target.value, man.id)}>
                                            <option>{man.ktu}</option>
                                            <option>0</option><option>0,1</option><option>0,2</option><option>0,3</option><option>0,4</option><option>0,5</option><option>0,6</option><option>0,7</option><option>0,8</option><option>0,9</option><option>1</option>
                                            <option>1,1</option><option>1,2</option><option>1,3</option><option>1,4</option><option>1,5</option>
                                            {/*<option>1,6</option><option>1,7</option><option>1,8</option><option>1,9</option><option>2</option>*/}
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.ktu}></input>*/}
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">метод</div>
                                        <div className="tab_tabel_tabelman_s_c_c_day_content border-b">{methods(man.tn)}</div>
                                    </div>

                                </div>
                            </div>
                            <div className="tab_tabel_tabelman_strock_shifrtransport">
                                <div className="tab_tabel_tabelman_strock_calendar_s">

                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">объект</div>
                                        <select disabled={writed} className="tab_tabel_tabelman_s_c_c_day_content border-b " style={{width: '137px', appearance: 'none'}} onChange={(e)=>editDay('ras', e.target.value, man.id)}>
                                            <option>{man.ras}</option>
                                            <option></option>
                                            {listObjs.map((objects, index) => (
                                                <option key={index}>{objects.shifr}</option>
                                            ))}
                                        </select>
                                    </div>


                                    <div className="tab_tabel_tabelman_strock_calendar_column_day">
                                        <div className="tab_tabel_tabelman_s_c_c_day_title">транспорт</div>
                                        <select disabled={writed} className="tab_tabel_tabelman_s_c_c_day_content border-b " style={{width: '137px', appearance: 'none'}} onChange={(e)=>editDay('transport', e.target.value, man.id)}>
                                            <option>{man.transport.split('|')[0]}</option>
                                            <option></option>
                                            {listTransport.map((car, index) => (
                                                <option key={index} value={`${car.name}|${car.price}`}>{car.name}</option>
                                            ))}
                                        </select>
                                        {/*<input type='number' className="tab_tabel_tabelman_s_c_c_day_content border-b" onChange={irr} defaultValue={man.transport}></input>*/}
                                    </div>

                                </div>
                            </div>
                            <div className="tab_tabel_tabelman_strock_comment">
                                <div className="tab_tabel_tabelman_strock_calendar_s">
                                    {pushKTU(man.tn).map((content, index)=>(
                                        <span key={index}>{content}<br/></span>
                                    ))}
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