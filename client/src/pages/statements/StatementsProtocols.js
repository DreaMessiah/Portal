import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
// import "./soc.scss"
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import Select from "react-select";
import SocialService from "../../services/SocialService";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import formatDate from "../../components/functions/formatDate";
import TabelToPdf from "../../components/functions/TabelToPdf";
import PrikazToPdf from "../../components/functions/PrikazToPdf";
import ProtocolToPdf from "../../components/functions/ProtocolToPdf";


function StatementsProtocols(){
    const [loading,setLoading] = useState(false)

    const [sortDirection,setSortDirection] = useState(true)

    const [protocols,setProtocols] = useState([])
    const [selected,setSelected] = useState(-1)
    const [statuses,setStatuses] = useState([])

    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(false)
    const [commission, setCommission] = useState(false)
    const [stazhedit, setStazhedit] = useState(false)
    const [thisuser, setThisuser] = useState([])
    const [listuser, setListuser] = useState([])
    const [editcash, setEditcash] = useState(false)
    const [createcash, setCreatecash] = useState(false)
    const [stazhcash, setStazhcash] = useState(false)
    const [readstatement, setReadstatement] = useState(false)
    const [maker, setMaker] = useState(false)
    const [list, setList] = useState([])
    // const message = useMessage()
    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await ObjsService.getUsersList()
            if(data){
                data.map((man,index) => {
                    man.label = man.full_name + '  ' + man.developer
                    man.value = man.tn
                    man.index = index
                })
                setListuser(data)
                loadProtocols()
            }
        }catch(e){
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const loadProtocols = async (sort = 'id') => { // 'id' 'date' 'summ' 'status'
        try{
            setLoading(true)
            const {data} = await SocialService.getProtocols(sort,sortDirection)
            const sts = await SocialService.getStatuses()
            const comm = await SocialService.getComission()
            setStatuses(sts.data)
            setCommission(comm.data)
            console.log(comm.data)

            data.map( item => {
                item.myprograms.map(row => {
                    if(sts.data){
                        const firstPossion = row.commission.filter(element => element.possion === 1)
                        if (firstPossion.every(element => element.status === 1)) {
                            const status = sts.data.find(status => parseInt(status.value) === 1)
                            row.statusvalue = status.value
                            row.statuscolor = status.color
                        }
                        if (firstPossion.some(element => element.status === 2)) {
                            const status = sts.data.find(status => parseInt(status.value) === 2)
                            row.statusvalue = status.value
                            row.statuscolor = status.color
                        }
                        row.statusvalue = 'ожидание'
                        row.statuscolor = '#000000'
                    }
                })
            })
            console.log(data)

            setProtocols(data)

        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }


    const chooseLine = index => {
        let newList = [...list]
        if(newList.includes(index)){
            newList = newList.filter(item => item !== index);
        } else {
            newList.push(index)
        }

        setList(newList)
    }

    const cleanList = () => {
        setList([])
    }
    const cancelHandler = () => {
        setReadstatement(false)
        setSelected(-1)
    }
    const showStatement = index => {
        // alert('eye')
        setSelected(index)
        setReadstatement(true)
    }
    const printProtocol = index => {
        ProtocolToPdf(protocols[index],commission)
    }
    const printPrikaz = index => {
        PrikazToPdf(protocols[index])
    }

    const filesStatement = index => {
        alert('files')
    }
    const burnStatement = index => {
        alert('burn')
    }
    const markStatement = index => {
        alert('mark')
    }

    const sortHandler = (sort) => {
        setSortDirection(!sortDirection)
        loadProtocols(sort)
    }

    useEffect(()=>{
        loadingHandler()
    }, [])

    return (
        <div className="soclist">
            <div className="soclist_title">Группы заявлений для протокола и приказа</div>

            <div className={`sort`}>
                <div className={`title text`}>Сортировать</div>
                <div onClick={() => sortHandler('abc')} className={`sortbtn text`}>По алфовиту</div>
                <div onClick={() => sortHandler('num')} className={`sortbtn text`}>По номеру</div>
                <div onClick={() => sortHandler('date')} className={`sortbtn text`}>По дате</div>
            </div>

            <div className="statelist_list">
                <div className="statelist_list_line" >
                    <div className="statelist_list_line_name title">П/П</div>
                    <div className="statelist_list_line_price title ">Создан</div>
                    <div className="statelist_list_line_price title">Кол-во</div>
                    <div className="statelist_list_line_group title">ФИО создателя</div>
                    <div className="statelist_list_line_price title ">Сумма</div>
                    <div className="statelist_list_line_cropname title ">Статус</div>
                    <div className="statelist_list_line_icon title ">Посмотреть</div>
                    <div className="statelist_list_line_icon title ">Протокол</div>
                    <div className="statelist_list_line_icon title ">Приказ</div>
                </div>

                {protocols.length ? protocols.map( (item,index) => (
                    <div key={index} className="statelist_list_line bordertopnone tourer">
                        <div className="statelist_list_line_name listpp">{item.id}</div>
                        <div className="statelist_list_line_price date">{formatDate(item.createdAt)}</div>
                        <div className="statelist_list_line_price date">{item.myprograms.length}</div>
                        <div className="statelist_list_line_group">{item.t13uni.name}</div>
                        <div className="statelist_list_line_price date">{item.myprograms.reduce((accumulator, row) => {return accumulator + row.programofsoc.sum }, 0)}</div>
                        <div className="statelist_list_line_cropname">{statuses.find(status => parseInt(status.value) === item.status).label}</div>
                        <div className="statelist_list_line_icon"><div className="statelist_list_line_del" onClick={()=>{showStatement(index)}} help='просмотреть'><i className="fa-solid fa-eye"/></div></div>
                        <div className="statelist_list_line_icon"><div className="statelist_list_line_del" onClick={()=>{printProtocol(index)}}><i className="fa-solid fa-print"/></div></div>
                        <div className="statelist_list_line_icon"><div className="statelist_list_line_del" onClick={()=>{printPrikaz(index)}}><i className="fa-solid fa-print"/></div></div>



                        {/*<div className="statelist_list_line_del" onClick={()=>{filesStatement(0)}}><i className="fa-solid fa-folder-open"/></div>*/}
                        {/*<div className="statelist_list_line_del" onClick={()=>{burnStatement(0)}}><i className="fa-solid fa-fire"/></div>*/}
                        {/*<div className="statelist_list_line_del" onClick={()=>{markStatement(0)}}><i className="fa-solid fa-eraser"/></div>*/}
                    </div>

                )) : null}
            </div>

            <div className='glass' style={(readstatement)?{display: 'flex'}:{display: 'none'}}>
                {selected >= 0 ?
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={cancelHandler}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_author">Протокол № {protocols[selected].id} </div>
                        <div className="glass_board_body_control">
                            <div className="glass_board_body_control_btn">Подписать</div>
                            <div className="glass_board_body_control_btn">На доработку</div>
                            <div className="glass_board_body_control_btn">Отклонить</div>
                        </div>
                {/*<div className="glass_board_body_tit">Согласования</div>
                        <div className="list_approve">
                            <div className="list_approve_man">
                                <div className="list_approve_man_name">Павлова Татьяна Александровна</div>
                                <div className="list_approve_man_dev">Начальник отдела кадров</div>
                                <div className="list_approve_man_status">Все согласованы</div>
                                <div className="list_approve_man_comment">есть комментарии</div>
                                <div className="list_approve_man_slash" style={{display: 'none'}}></div>
                            </div>
                            <div className="list_approve_man">
                                <div className="list_approve_man_name">Скребатун Роман Юрьевич</div>
                                <div className="list_approve_man_dev">Зам. начальника экономической службы</div>
                                <div className="list_approve_man_status">Не все согласованы</div>
                                <div className="list_approve_man_comment">нет комментариев</div>
                                <div className="list_approve_man_slash" style={{display: 'flex'}}></div>
                            </div>
                            <div className="list_approve_man">
                                <div className="list_approve_man_name">Чернобай Ольга Владимировна</div>
                                <div className="list_approve_man_dev">Начальник отдела продаж</div>
                                <div className="list_approve_man_status">Все согласованы</div>
                                <div className="list_approve_man_comment">нет комментариев</div>
                                <div className="list_approve_man_slash" style={{display: 'flex'}}></div>
                            </div>
                            <div className="list_approve_man">
                                <div className="list_approve_man_name">Чупятов Александр Иванович</div>
                                <div className="list_approve_man_dev">Заместитель генерального директора по общим вопросам</div>
                                <div className="list_approve_man_status">Все согласованы</div>
                                <div className="list_approve_man_comment">нет комментариев</div>
                                <div className="list_approve_man_slash" style={{display: 'flex'}}></div>
                            </div>
                        </div>*/}
                        <div className="glass_board_body_tit">Список</div>
                        <div className="glass_board_body_liststatements">
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num bold">№</div>
                                <div className="glass_board_body_liststatements_fio bold">ФИО</div>
                                <div className="glass_board_body_liststatements_dev bold">Должность</div>
                                <div className="glass_board_body_liststatements_view bold">Вид</div>
                                <div className="glass_board_body_liststatements_app bold">Основание</div>
                                <div className="glass_board_body_liststatements_del bold">Действия</div>
                            </div>
                            {protocols[selected].myprograms ? protocols[selected].myprograms.map( (item,index) => (
                                <div key={index} className="glass_board_body_liststatements_man">
                                    <div className="glass_board_body_liststatements_num">{item.id}</div>
                                    <div className="glass_board_body_liststatements_fio">{item.user.full_name}</div>
                                    <div className="glass_board_body_liststatements_dev">{item.user.developer}</div>
                                    <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                    <div className="glass_board_body_liststatements_app">{item.programofsoc ? item.programofsoc.name : null}</div>
                                    <div className="glass_board_body_liststatements_del">
                                        <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                        <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                        <div style={item.statuscolor ? {border:`1px solid ${item.statuscolor}`}:{}} className="glass_board_body_liststatements_del_yes">{item.statusvalue}</div>
                                    </div>
                                </div>
                            )) : null}
   {/*                         <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">1</div>
                                <div className="glass_board_body_liststatements_fio">Пшеничный Василий Павлович</div>
                                <div className="glass_board_body_liststatements_dev">водитель 3 класса</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи со смертью близких одственников (матери)</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_yes">согласовано</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">2</div>
                                <div className="glass_board_body_liststatements_fio">Ханнанов Данил Маратович</div>
                                <div className="glass_board_body_liststatements_dev">ведущий геодезист</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи с рождением ребенка</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_no">отклонено</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">3</div>
                                <div className="glass_board_body_liststatements_fio">Пшеничный Василий Павлович</div>
                                <div className="glass_board_body_liststatements_dev">водитель 3 класса</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи со смертью близких одственников (матери)</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_wait">ожидание</div>
                                    <div className="glass_board_body_liststatements_del_pass">напомнить</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">4</div>
                                <div className="glass_board_body_liststatements_fio">Ханнанов Данил Маратович</div>
                                <div className="glass_board_body_liststatements_dev">ведущий геодезист</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи с рождением ребенка</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_yes">согласовано</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">5</div>
                                <div className="glass_board_body_liststatements_fio">Пшеничный Василий Павлович</div>
                                <div className="glass_board_body_liststatements_dev">водитель 3 класса</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи со смертью близких одственников (матери)</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_no">отклонено</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">6</div>
                                <div className="glass_board_body_liststatements_fio">Ханнанов Данил Маратович</div>
                                <div className="glass_board_body_liststatements_dev">ведущий геодезист</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи с рождением ребенка</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_wait">ожидание</div>
                                    <div className="glass_board_body_liststatements_del_pass">напомнить</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">7</div>
                                <div className="glass_board_body_liststatements_fio">Пшеничный Василий Павлович</div>
                                <div className="glass_board_body_liststatements_dev">водитель 3 класса</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи со смертью близких одственников (матери)</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_yes">согласовано</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">8</div>
                                <div className="glass_board_body_liststatements_fio">Ханнанов Данил Маратович</div>
                                <div className="glass_board_body_liststatements_dev">ведущий геодезист</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи с рождением ребенка</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_no">отклонено</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">9</div>
                                <div className="glass_board_body_liststatements_fio">Пшеничный Василий Павлович</div>
                                <div className="glass_board_body_liststatements_dev">водитель 3 класса</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи со смертью близких одственников (матери)</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_wait">ожидание</div>
                                    <div className="glass_board_body_liststatements_del_pass">напомнить</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">10</div>
                                <div className="glass_board_body_liststatements_fio">Ханнанов Данил Маратович</div>
                                <div className="glass_board_body_liststatements_dev">ведущий геодезист</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи с рождением ребенка</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_yes">согласовано</div>
                                </div>
                            </div>*/}
                        </div>
                    </div>
                </div>
                : null }
            </div>
            <div className='glass' style={(maker)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setMaker(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_author">оформил: Чернобай Ольга Владимировна</div>
                        <div className="glass_board_body_developer">должность: начальник отдела продаж</div>

                        <div className="glass_board_body_control">

                            <div className="glass_board_body_control_btn">Сформировать</div>
                            <div className="glass_board_body_control_btn">на исполнение</div>
                            <div className="glass_board_body_control_btn">на удаление</div>
                        </div>
                        <div className="glass_board_body_tit">Список</div>
                        <div className="glass_board_body_liststatements">
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num bold">№</div>
                                <div className="glass_board_body_liststatements_fio bold">ФИО</div>
                                <div className="glass_board_body_liststatements_dev bold">Должность</div>
                                <div className="glass_board_body_liststatements_view bold">Вид</div>
                                <div className="glass_board_body_liststatements_app bold">Основание</div>
                                <div className="glass_board_body_liststatements_del bold">Действия</div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">1</div>
                                <div className="glass_board_body_liststatements_fio">Пшеничный Василий Павлович</div>
                                <div className="glass_board_body_liststatements_dev">водитель 3 класса</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи со смертью близких одственников (матери)</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_yes">согласовано</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">2</div>
                                <div className="glass_board_body_liststatements_fio">Ханнанов Данил Маратович</div>
                                <div className="glass_board_body_liststatements_dev">ведущий геодезист</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи с рождением ребенка</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_no">отклонено</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">3</div>
                                <div className="glass_board_body_liststatements_fio">Пшеничный Василий Павлович</div>
                                <div className="glass_board_body_liststatements_dev">водитель 3 класса</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи со смертью близких одственников (матери)</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_wait">ожидание</div>
                                    <div className="glass_board_body_liststatements_del_pass">напомнить</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">4</div>
                                <div className="glass_board_body_liststatements_fio">Ханнанов Данил Маратович</div>
                                <div className="glass_board_body_liststatements_dev">ведущий геодезист</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи с рождением ребенка</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_yes">согласовано</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">5</div>
                                <div className="glass_board_body_liststatements_fio">Пшеничный Василий Павлович</div>
                                <div className="glass_board_body_liststatements_dev">водитель 3 класса</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи со смертью близких одственников (матери)</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_no">отклонено</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">6</div>
                                <div className="glass_board_body_liststatements_fio">Ханнанов Данил Маратович</div>
                                <div className="glass_board_body_liststatements_dev">ведущий геодезист</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи с рождением ребенка</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_wait">ожидание</div>
                                    <div className="glass_board_body_liststatements_del_pass">напомнить</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">7</div>
                                <div className="glass_board_body_liststatements_fio">Пшеничный Василий Павлович</div>
                                <div className="glass_board_body_liststatements_dev">водитель 3 класса</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи со смертью близких одственников (матери)</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_yes">согласовано</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">8</div>
                                <div className="glass_board_body_liststatements_fio">Ханнанов Данил Маратович</div>
                                <div className="glass_board_body_liststatements_dev">ведущий геодезист</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи с рождением ребенка</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_no">отклонено</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">9</div>
                                <div className="glass_board_body_liststatements_fio">Пшеничный Василий Павлович</div>
                                <div className="glass_board_body_liststatements_dev">водитель 3 класса</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи со смертью близких одственников (матери)</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_wait">ожидание</div>
                                    <div className="glass_board_body_liststatements_del_pass">напомнить</div>
                                </div>
                            </div>
                            <div className="glass_board_body_liststatements_man">
                                <div className="glass_board_body_liststatements_num">10</div>
                                <div className="glass_board_body_liststatements_fio">Ханнанов Данил Маратович</div>
                                <div className="glass_board_body_liststatements_dev">ведущий геодезист</div>
                                <div className="glass_board_body_liststatements_view">выделение материальной помощи</div>
                                <div className="glass_board_body_liststatements_app">в связи с рождением ребенка</div>
                                <div className="glass_board_body_liststatements_del">
                                    <div className="glass_board_body_liststatements_del_eye"><i className="fa-solid fa-eye"/></div>
                                    <div className="glass_board_body_liststatements_del_del"><i className="fa-solid fa-eraser"/></div>
                                    <div className="glass_board_body_liststatements_del_yes">согласовано</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </div>
    )
}

export default observer(StatementsProtocols)