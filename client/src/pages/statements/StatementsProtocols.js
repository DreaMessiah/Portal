import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
// import "./soc.scss"
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import Select from "react-select";

function StatementsProtocols(){

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

    // const message = useMessage()
    const getUsers = async (e) => {
        try {
            const users = await ObjsService.getUsersList()

            let i = 0
            users.data.forEach(man => {
                man.label = man.full_name + '  ' + man.developer
                man.value = man.tn
                man.index = i
                i++
            })
            setListuser(users.data)
        }catch(e){

        }
    }

    const [list, setList] = useState([])

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


    const showStatement = index => {
        // alert('eye')
        setReadstatement(true)
    }
    const printStatement = index => {
        alert('print')
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

    useEffect(()=>{
        getUsers()
    }, [])

    return (
        <div className="soclist">
            <div className="soclist_title">Группы заявлений для протокола и приказа</div>
            {/*<div className={'text'}><p>Для создания новой программы нажмите кнопку Создать</p><p>Для редактирования существующей программы, необходимо выбрать программу из списка</p></div>*/}
            <div className="soclist_btns">
                <div className="soclist_upload">Фильтр</div>
                <div className="soclist_upload" style={(list.length > 0)?{display: 'flex'}:{display: 'none'}} onClick={()=>setMaker(true)}>Действия</div>
                <div className="soclist_upload" style={(list.length > 0)?{display: 'flex'}:{display: 'none'}} onClick={cleanList}>Сбросить</div>
            </div>
            <div className="statelist_list">
                <div className="statelist_list_line" >
                    <div className="statelist_list_line_name title">П/П</div>
                    <div className="statelist_list_line_price title ">Создан</div>
                    <div className="statelist_list_line_price title">Кол-во</div>
                    <div className="statelist_list_line_group title">ФИО создателя</div>
                    <div className="statelist_list_line_price title ">Сумма</div>
                    <div className="statelist_list_line_cropname title ">Статус</div>
                </div>

                <div className="statelist_list_line bordertopnone tourer" style={(list.includes(0))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(0)}>
                    <div className="statelist_list_line_name listpp">1</div>
                    <div className="statelist_list_line_price date">12.05.2024</div>
                    <div className="statelist_list_line_price date">10</div>
                    <div className="statelist_list_line_group">Чернобай Ольга Владимирна</div>
                    <div className="statelist_list_line_price date">200000</div>
                    <div className="statelist_list_line_cropname">Создан</div>
                    <div className="statelist_list_line_del" onClick={()=>{showStatement(0)}} help='просмотреть'><i className="fa-solid fa-eye"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{printStatement(0)}}><i className="fa-solid fa-print"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{filesStatement(0)}}><i className="fa-solid fa-folder-open"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{burnStatement(0)}}><i className="fa-solid fa-fire"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{markStatement(0)}}><i className="fa-solid fa-eraser"/></div>
                </div>
                <div className="statelist_list_line bordertopnone tourer" style={(list.includes(1))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(1)}>
                    <div className="statelist_list_line_name listpp">2</div>
                    <div className="statelist_list_line_price date">09.03.2024</div>
                    <div className="statelist_list_line_price date">13</div>
                    <div className="statelist_list_line_group">Чернобай Ольга Владимирна</div>
                    <div className="statelist_list_line_price date">260000</div>
                    <div className="statelist_list_line_cropname">Создан</div>
                    <div className="statelist_list_line_del" onClick={()=>{showStatement(1)}} help='просмотреть'><i className="fa-solid fa-eye"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{printStatement(1)}}><i className="fa-solid fa-print"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{filesStatement(1)}}><i className="fa-solid fa-folder-open"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{burnStatement(1)}}><i className="fa-solid fa-fire"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{markStatement(1)}}><i className="fa-solid fa-eraser"/></div>
                </div>
                <div className="statelist_list_line bordertopnone tourer" style={(list.includes(2))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(2)}>
                    <div className="statelist_list_line_name listpp">3</div>
                    <div className="statelist_list_line_price date">05.02.2024</div>
                    <div className="statelist_list_line_price date">8</div>
                    <div className="statelist_list_line_group">Чернобай Ольга Владимирна</div>
                    <div className="statelist_list_line_price date">180000</div>
                    <div className="statelist_list_line_cropname">Создан</div>
                    <div className="statelist_list_line_del" onClick={()=>{showStatement(2)}} help='просмотреть'><i className="fa-solid fa-eye"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{printStatement(2)}}><i className="fa-solid fa-print"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{filesStatement(2)}}><i className="fa-solid fa-folder-open"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{burnStatement(2)}}><i className="fa-solid fa-fire"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{markStatement(2)}}><i className="fa-solid fa-eraser"/></div>
                </div>
                <div className="statelist_list_line bordertopnone tourer" style={(list.includes(3))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(3)}>
                    <div className="statelist_list_line_name listpp">4</div>
                    <div className="statelist_list_line_price date">12.01.2024</div>
                    <div className="statelist_list_line_price date">11</div>
                    <div className="statelist_list_line_group">Чернобай Ольга Владимирна</div>
                    <div className="statelist_list_line_price date">220000</div>
                    <div className="statelist_list_line_cropname">Создан</div>
                    <div className="statelist_list_line_del" onClick={()=>{showStatement(3)}} help='просмотреть'><i className="fa-solid fa-eye"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{printStatement(3)}}><i className="fa-solid fa-print"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{filesStatement(3)}}><i className="fa-solid fa-folder-open"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{burnStatement(3)}}><i className="fa-solid fa-fire"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{markStatement(3)}}><i className="fa-solid fa-eraser"/></div>
                </div>
                <div className="statelist_list_line bordertopnone tourer" style={(list.includes(4))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(4)}>
                    <div className="statelist_list_line_name listpp">5</div>
                    <div className="statelist_list_line_price date">01.12.2023</div>
                    <div className="statelist_list_line_price date">10</div>
                    <div className="statelist_list_line_group">Чернобай Ольга Владимирна</div>
                    <div className="statelist_list_line_price date">200000 </div>
                    <div className="statelist_list_line_cropname">Создан</div>
                    <div className="statelist_list_line_del" onClick={()=>{showStatement(4)}} help='просмотреть'><i className="fa-solid fa-eye"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{printStatement(4)}}><i className="fa-solid fa-print"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{filesStatement(4)}}><i className="fa-solid fa-folder-open"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{burnStatement(4)}}><i className="fa-solid fa-fire"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{markStatement(4)}}><i className="fa-solid fa-eraser"/></div>
                </div>
            </div>

            <div className='glass' style={(readstatement)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setReadstatement(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_author">протокол: 12</div>
                        <div className="glass_board_body_control">
                            <div className="glass_board_body_control_btn">Подписать</div>
                            <div className="glass_board_body_control_btn">На доработку</div>
                            <div className="glass_board_body_control_btn">Отклонить</div>
                        </div>
                        <div className="glass_board_body_tit">Согласования</div>

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
        </div>
    )
}

export default observer(StatementsProtocols)