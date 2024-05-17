import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
// import "./soc.scss"
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import Select from "react-select";

function StatementsList(){

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
            <div className="soclist_title">Список всех заявлений на мат.помощь</div>
            {/*<div className={'text'}><p>Для создания новой программы нажмите кнопку Создать</p><p>Для редактирования существующей программы, необходимо выбрать программу из списка</p></div>*/}
            <div className="soclist_btns">
                <div className="soclist_upload">Фильтр</div>
                <div className="soclist_upload" style={(list.length > 0)?{display: 'flex'}:{display: 'none'}} onClick={()=>setMaker(true)}>Действия</div>
                <div className="soclist_upload" style={(list.length > 0)?{display: 'flex'}:{display: 'none'}} onClick={cleanList}>Сбросить</div>
            </div>
            <div className="statelist_list">
                <div className="statelist_list_line" >
                    <div className="statelist_list_line_name title">П/П</div>
                    <div className="statelist_list_line_price title ">Дата</div>
                    <div className="statelist_list_line_group title">Наименование</div>
                    <div className="statelist_list_line_group title">ФИО заявителя</div>
                    <div className="statelist_list_line_cropname title ">Статус</div>
                </div>

                <div className="statelist_list_line bordertopnone tourer" style={(list.includes(0))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(0)}>
                    <div className="statelist_list_line_name listpp">1</div>
                    <div className="statelist_list_line_price date">12.05.2024</div>
                    <div className="statelist_list_line_group">Проверочная программа</div>
                    <div className="statelist_list_line_group">Барахтянский Владимир Алексеевич</div>
                    <div className="statelist_list_line_cropname">Новое</div>
                    <div className="statelist_list_line_del" onClick={()=>{showStatement(0)}} help='просмотреть'><i className="fa-solid fa-eye"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{printStatement(0)}}><i className="fa-solid fa-print"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{filesStatement(0)}}><i className="fa-solid fa-folder-open"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{burnStatement(0)}}><i className="fa-solid fa-fire"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{markStatement(0)}}><i className="fa-solid fa-eraser"/></div>
                </div>
                <div className="statelist_list_line bordertopnone tourer" style={(list.includes(1))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(1)}>
                    <div className="statelist_list_line_name listpp">1</div>
                    <div className="statelist_list_line_price date">12.05.2024</div>
                    <div className="statelist_list_line_group">Проверочная программа</div>
                    <div className="statelist_list_line_group">Барахтянский Владимир Алексеевич</div>
                    <div className="statelist_list_line_cropname">Новое</div>
                    <div className="statelist_list_line_del" onClick={()=>{showStatement(1)}}><i className="fa-solid fa-eye"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{printStatement(1)}}><i className="fa-solid fa-print"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{filesStatement(1)}}><i className="fa-solid fa-folder-open"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{burnStatement(1)}}><i className="fa-solid fa-fire"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{markStatement(1)}}><i className="fa-solid fa-eraser"/></div>
                </div>
                <div className="statelist_list_line bordertopnone tourer" style={(list.includes(2))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(2)}>
                    <div className="statelist_list_line_name listpp">1</div>
                    <div className="statelist_list_line_price date">12.05.2024</div>
                    <div className="statelist_list_line_group">Проверочная программа</div>
                    <div className="statelist_list_line_group">Барахтянский Владимир Алексеевич</div>
                    <div className="statelist_list_line_cropname">Новое</div>
                    <div className="statelist_list_line_del" onClick={()=>{showStatement(2)}}><i className="fa-solid fa-eye"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{printStatement(2)}}><i className="fa-solid fa-print"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{filesStatement(2)}}><i className="fa-solid fa-folder-open"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{burnStatement(2)}}><i className="fa-solid fa-fire"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{markStatement(2)}}><i className="fa-solid fa-eraser"/></div>
                </div>
                <div className="statelist_list_line bordertopnone tourer" style={(list.includes(3))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(3)}>
                    <div className="statelist_list_line_name listpp">1</div>
                    <div className="statelist_list_line_price date">12.05.2024</div>
                    <div className="statelist_list_line_group">Проверочная программа</div>
                    <div className="statelist_list_line_group">Барахтянский Владимир Алексеевич</div>
                    <div className="statelist_list_line_cropname">Новое</div>
                    <div className="statelist_list_line_del" onClick={()=>{showStatement(3)}}><i className="fa-solid fa-eye"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{printStatement(3)}}><i className="fa-solid fa-print"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{filesStatement(3)}}><i className="fa-solid fa-folder-open"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{burnStatement(3)}}><i className="fa-solid fa-fire"/></div>
                    <div className="statelist_list_line_del" onClick={()=>{markStatement(3)}}><i className="fa-solid fa-eraser"/></div>
                </div>
                <div className="statelist_list_line bordertopnone tourer" style={(list.includes(4))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(4)}>
                    <div className="statelist_list_line_name listpp">1</div>
                    <div className="statelist_list_line_price date">12.05.2024</div>
                    <div className="statelist_list_line_group">Проверочная программа</div>
                    <div className="statelist_list_line_group">Барахтянский Владимир Алексеевич</div>
                    <div className="statelist_list_line_cropname">Новое</div>
                    <div className="statelist_list_line_del" onClick={()=>{showStatement(4)}}><i className="fa-solid fa-eye"/></div>
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
                        <div className="glass_board_body_author">заявитель: Барахтянский Владимир Алексеевич</div>
                        <div className="glass_board_body_developer">должность: разработочик программного обеспечения</div>
                        <div className="glass_board_body_title">Прошу предоставить материальную помощь в связи с рождением ребенка</div>
                        <div className="glass_board_body_title">Заявленная сумма: 15000 руб.</div>
                        <div className="glass_board_body_stazh">стаж 2.11 года</div>

                        <div className="glass_board_body_documents">
                            <div className="glass_board_body_documents_file">
                                <i className="fa-regular fa-file"/>
                                <div className="glass_board_body_documents_file_name">Заявление о рождении ребенка</div>
                            </div>
                            <div className="glass_board_body_documents_file">
                                <i className="fa-regular fa-file"/>
                                <div className="glass_board_body_documents_file_name">Паспорт (основной разворот)</div>
                            </div>
                            <div className="glass_board_body_documents_file">
                                <i className="fa-regular fa-file"/>
                                <div className="glass_board_body_documents_file_name">Паспорт (регистрация)</div>
                            </div>
                        </div>
                        <div className="glass_board_body_control">
                            <div className="glass_board_body_control_btn">Заключение</div>
                            <div className="glass_board_body_control_btn">Согласовать</div>
                            <div className="glass_board_body_control_btn">Отклонить</div>
                            <div className="glass_board_body_control_btn">Подписать</div>
                        </div>
                        <div className="glass_board_body_tit">Согласования</div>


                        <div className="glass_approve_body_man">
                            <div className="glass_approve_body_man_content">
                                <div className="glass_approve_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_approve_body_man_params">
                                    <div className="glass_approve_body_man_name">Скребатун Роман Юрьевич</div>
                                    <div className="glass_approve_body_man_dev">Заместитель начальника экономической службы</div>
                                    <div className="glass_approve_body_man_departament">Экономическая служба</div>
                                    <div className="glass_board_body_tit">Комментарий:</div>
                                    <div className="glass_approve_body_man_comment">Наказания в течении года отсутствуют. Наказание за май 2024 года "Проход через КПП Центральной базы без пропуска"</div>
                                </div>
                            </div>
                            <div className="glass_approve_body_man_status">
                                <div className="glass_approve_body_man_status_yes">Cогласовано</div>
                            </div>
                        </div>
                        <div className="glass_approve_body_man">
                            <div className="glass_approve_body_man_content">
                                <div className="glass_approve_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_approve_body_man_params">
                                    <div className="glass_approve_body_man_name">Павлова Татьяна Александровна</div>
                                    <div className="glass_approve_body_man_dev">Начальник отдела кадров</div>
                                    <div className="glass_approve_body_man_departament">Отдел кадров</div>
                                    <div className="glass_board_body_tit">Комментарий:</div>
                                    <div className="glass_approve_body_man_comment">Комментарий отсутствует</div>
                                </div>
                            </div>
                            <div className="glass_approve_body_man_status">
                                <div className="glass_approve_body_man_status_no">Отклонено</div>
                            </div>
                        </div>
                        <div className="glass_approve_body_man">
                            <div className="glass_approve_body_man_content">
                                <div className="glass_approve_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_approve_body_man_params">
                                    <div className="glass_approve_body_man_name">Макаров Матвей Александрович</div>
                                    <div className="glass_approve_body_man_dev">Начальник отдела ОУИД</div>
                                    <div className="glass_approve_body_man_departament">Отдел управления инновационной деятельностью</div>
                                    <div className="glass_board_body_tit">Комментарий:</div>
                                    <div className="glass_approve_body_man_comment">Комментарий отсутствует</div>
                                </div>
                            </div>
                            <div className="glass_approve_body_man_status">
                                <div className="glass_approve_body_man_status_wait">Ожидание</div>
                                <div className="glass_approve_body_man_status_pass">Напомнить</div>
                            </div>
                        </div>

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Контроль</div>

                        <div className="glass_approve_body_man">
                            <div className="glass_approve_body_man_content">
                                <div className="glass_approve_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_approve_body_man_params">
                                    <div className="glass_approve_body_man_name">Чупятов Александр Иванович</div>
                                    <div className="glass_approve_body_man_dev">Заместитель генерального директора по общим вопросам</div>
                                    <div className="glass_approve_body_man_departament">АУП</div>
                                    <div className="glass_board_body_tit">Комментарий:</div>
                                    <div className="glass_approve_body_man_comment">Комментарий отсутствует</div>
                                </div>
                            </div>
                            <div className="glass_approve_body_man_status">
                                <div className="glass_approve_body_man_status_wait">Ожидание</div>
                            </div>
                        </div>

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Подписант</div>

                        <div className="glass_approve_body_man">
                            <div className="glass_approve_body_man_content">
                                <div className="glass_approve_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_approve_body_man_params">
                                    <div className="glass_approve_body_man_name">Макаров Александр Владимирович</div>
                                    <div className="glass_approve_body_man_dev">Генеральный директор</div>
                                    <div className="glass_approve_body_man_departament">АУП</div>
                                    <div className="glass_board_body_tit">Комментарий:</div>
                                    <div className="glass_approve_body_man_comment">Комментарий отсутствует</div>
                                </div>
                            </div>
                            <div className="glass_approve_body_man_status">
                                <div className="glass_approve_body_man_status_wait">Ожидание</div>
                            </div>
                        </div>

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Исполнитель</div>

                        <div className="glass_approve_body_man">
                            <div className="glass_approve_body_man_content">
                                <div className="glass_approve_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_approve_body_man_params">
                                    <div className="glass_approve_body_man_name">Гаврилова Наталья Владимировна</div>
                                    <div className="glass_approve_body_man_dev">Главный бухгалтер</div>
                                    <div className="glass_approve_body_man_departament">Бухгалтерия</div>
                                    <div className="glass_board_body_tit">Комментарий:</div>
                                    <div className="glass_approve_body_man_comment">Комментарий отсутствует</div>
                                </div>
                            </div>
                            <div className="glass_approve_body_man_status">
                                <div className="glass_approve_body_man_status_wait">Ожидание</div>
                            </div>
                        </div>
                        {/*<div className='glassslash'></div>*/}
                        {/*<div className="glass_board_body_buttons">*/}
                        {/*    <div className="glass_board_body_buttons_create">Закрыть (изменения сохраняются автоматически)</div>*/}
                        {/*</div>*/}
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

export default observer(StatementsList)