import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "./soc.scss"
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import Select from "react-select";

function Createsocial(){

    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(false)
    const [commission, setCommission] = useState(false)
    const [thisuser, setThisuser] = useState([])
    const [listuser, setListuser] = useState([])
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
        }catch{
        }
    }

    useEffect(()=>{
        getUsers()
    }, [])

    return (
        <div className="soclist">
            <div className="soclist_title">Список социальных программ</div>
            <div className={'text'}><p>Для создания новой программы нажмите кнопку Создать</p><p>Для редактирования существующей программы, необходимо выбрать программу из списка</p></div>
            <div className="soclist_btns">
                <div className="soclist_upload" onClick={()=>setCreate(true)}>Создать</div>
                <div className="soclist_upload" onClick={()=>setCommission(true)}>Комиссия</div>
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
                    <div className="soclist_list_line_del"><i className="fa-solid fa-pen-to-square" onClick={()=>setEdit(true)}/></div>
                </div>

            </div>

            <div className='glass' style={(create)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setCreate(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_title">Создание новой социальной программы</div>
                        <div className="glass_board_body_tit">Название программы</div>
                        <input placeholder="Введите название программы" className="glass_board_body_input" type="text" value=""/>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Текст описания программы</div>
                        <textarea placeholder="Введите описание задачи" className="glass_board_body_textarea"></textarea>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Требования <div className="glass_board_body_btn">+ добавить требование</div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' value='' placeholder='Введите новое требование'/> <div className="btns"><i className="fa-solid fa-square-plus"/></div></div>
                        <div className="glass_board_body_graf blueborder">Требование 3<div className="btns"><i className="fa-solid fa-pen-to-square"/><i className="fa-solid fa-xmark"/></div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' value='Требование 3 (Изменение)' placeholder='Изменение требования'/> <div className="btns"><i className="fa-solid fa-floppy-disk"/></div></div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Документы <div className="glass_board_body_btn">+ добавить документ</div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' value='' placeholder='Введите название нового документа'/> <div className="btns"><i className="fa-solid fa-square-plus"/></div></div>
                        <div className="glass_board_body_graf blueborder">Документ 2<div className="btns"><i className="fa-solid fa-pen-to-square"/><i className="fa-solid fa-xmark"/></div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' value='Документ 2 (Изменение)' placeholder='Изменение названия документа'/> <div className="btns"><i className="fa-solid fa-floppy-disk"/></div></div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Минимальный стаж<input type="number" className="glass_board_body_numinput" minLength="0" maxLength="2"/> год(лет)</div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Максимальная сумма<input type="number" className="glass_board_body_numinput" minLength="0" maxLength="5"/> руб.</div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_buttons_create">Создать</div>
                            <div className="glass_board_body_buttons_cancel">Сбросить</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='glass' style={(edit)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setEdit(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_title">Редактирование социальной программы</div>
                        <div className="glass_board_body_tit">Название программы</div>
                        <input placeholder="Введите название программы" className="glass_board_body_input" type="text" value=""/>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Текст описания программы</div>
                        <textarea placeholder="Введите описание задачи" className="glass_board_body_textarea"></textarea>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Требования <div className="glass_board_body_btn">+ добавить требование</div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' value='' placeholder='Введите новое требование'/> <div className="btns"><i className="fa-solid fa-square-plus"/></div></div>
                        <div className="glass_board_body_graf blueborder">Требование 3<div className="btns"><i className="fa-solid fa-pen-to-square"/><i className="fa-solid fa-xmark"/></div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' value='Требование 3 (Изменение)' placeholder='Изменение требования'/> <div className="btns"><i className="fa-solid fa-floppy-disk"/></div></div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Документы <div className="glass_board_body_btn">+ добавить документ</div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' value='' placeholder='Введите название нового документа'/> <div className="btns"><i className="fa-solid fa-square-plus"/></div></div>
                        <div className="glass_board_body_graf blueborder">Документ 2<div className="btns"><i className="fa-solid fa-pen-to-square"/><i className="fa-solid fa-xmark"/></div></div>
                        <div className="glass_board_body_graf"><input type="text" className='inputs_of_graf' value='Документ 2 (Изменение)' placeholder='Изменение названия документа'/> <div className="btns"><i className="fa-solid fa-floppy-disk"/></div></div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Минимальный стаж<input type="number" className="glass_board_body_numinput" minLength="0" maxLength="2"/> год(лет)</div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Максимальная сумма<input type="number" className="glass_board_body_numinput" minLength="0" maxLength="5"/> руб.</div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_buttons_create">Создать</div>
                            <div className="glass_board_body_buttons_cancel">Сбросить</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='glass' style={(commission)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setCommission(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_title">Комиссия</div>
                        <div className="glass_board_body_tit">Согласования</div>
                        <div className="glass_board_body_selection">
                            <Select onChange={(e) => setThisuser(listuser[e.index])} value={thisuser} options={listuser} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
                            <div className="glass_pluss_btn">Добавить</div>
                        </div>
                        <div className="glass_board_body_man">
                            <div className="glass_board_body_man_content">
                                <div className="glass_board_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_board_body_man_params">
                                    <div className="glass_board_body_man_name">Скребатун Роман Юрьевич</div>
                                    <div className="glass_board_body_man_dev">Заместитель начальника экономической службы</div>
                                    <div className="glass_board_body_man_departament">Экономическая служба</div>
                                </div>
                            </div>
                            <div className="glass_board_body_man_del"><i className="fa-solid fa-xmark"/></div>
                        </div>
                        <div className="glass_board_body_man">
                            <div className="glass_board_body_man_content">
                                <div className="glass_board_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_board_body_man_params">
                                    <div className="glass_board_body_man_name">Павлова Татьяна Александровна</div>
                                    <div className="glass_board_body_man_dev">Начальник отдела кадров</div>
                                    <div className="glass_board_body_man_departament">Отдел кадров</div>
                                </div>
                            </div>
                            <div className="glass_board_body_man_del"><i className="fa-solid fa-xmark"/></div>
                        </div>
                        <div className="glass_board_body_man">
                            <div className="glass_board_body_man_content">
                                <div className="glass_board_body_man_params">
                                    <div className="glass_board_body_man_dev">Начальник отдела или участка (ПО УМОЛЧАНИЮ, выбирает заявитель)</div>
                                </div>
                            </div>
                        </div>

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Контроль</div>
                        <div className="glass_board_body_selection">
                            <Select onChange={(e) => setThisuser(listuser[e.index])} value={thisuser} options={listuser} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
                            <div className="glass_pluss_btn">Добавить</div>
                        </div>
                        <div className="glass_board_body_man">
                            <div className="glass_board_body_man_content">
                                <div className="glass_board_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_board_body_man_params">
                                    <div className="glass_board_body_man_name">Чупятов Александр Иванович</div>
                                    <div className="glass_board_body_man_dev">Заместитель генерального директора по общим вопросам</div>
                                    <div className="glass_board_body_man_departament">АУП</div>
                                </div>
                            </div>
                            <div className="glass_board_body_man_del"><i className="fa-solid fa-xmark"/></div>
                        </div>

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Подписант</div>
                        <div className="glass_board_body_selection">
                            <Select onChange={(e) => setThisuser(listuser[e.index])} value={thisuser} options={listuser} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
                            <div className="glass_pluss_btn">Добавить</div>
                        </div>
                        <div className="glass_board_body_man">
                            <div className="glass_board_body_man_content">
                                <div className="glass_board_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_board_body_man_params">
                                    <div className="glass_board_body_man_name">Макаров Александр Владимирович</div>
                                    <div className="glass_board_body_man_dev">Генеральный директор</div>
                                    <div className="glass_board_body_man_departament">АУП</div>
                                </div>
                            </div>
                            <div className="glass_board_body_man_del"><i className="fa-solid fa-xmark"/></div>
                        </div>

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Исполнитель</div>
                        <div className="glass_board_body_selection">
                            <Select onChange={(e) => setThisuser(listuser[e.index])} value={thisuser} options={listuser} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
                            <div className="glass_pluss_btn">Добавить</div>
                        </div>
                        <div className="glass_board_body_man">
                            <div className="glass_board_body_man_content">
                                <div className="glass_board_body_man_photo" style={{backgroundImage: 'url("/profile/face.png")'}}></div>
                                <div className="glass_board_body_man_params">
                                    <div className="glass_board_body_man_name">Гаврилова Наталья Владимировна</div>
                                    <div className="glass_board_body_man_dev">Главный бухгалтер</div>
                                    <div className="glass_board_body_man_departament">Бухгалтерия</div>
                                </div>
                            </div>
                            <div className="glass_board_body_man_del"><i className="fa-solid fa-xmark"/></div>
                        </div>

                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_buttons_create">Закрыть (изменения сохраняются автоматически)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Createsocial)