import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "./soc.scss"
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import Select from "react-select";

function Sociality(){

    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(false)
    const [commission, setCommission] = useState(false)
    const [stazhedit, setStazhedit] = useState(false)
    const [thisuser, setThisuser] = useState([])
    const [listuser, setListuser] = useState([])
    const [editcash, setEditcash] = useState(false)
    const [createcash, setCreatecash] = useState(false)
    const [stazhcash, setStazhcash] = useState(false)

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
                <div className="soclist_upload" onClick={()=>setStazhedit(true)}>Размер % от стажа</div>
            </div>
            <div className="soclist_list">
                <div className="soclist_list_line">
                    <div className="soclist_list_line_name nametitle">П/П</div>
                    <div className="soclist_list_line_price title">Дата создания / изменения</div>
                    <div className="soclist_list_line_group title">Наименование</div>
                    <div className="soclist_list_line_cropname title "></div>
                </div>

                <div className="soclist_list_line bordertopnone">
                    <div className="soclist_list_line_name" style={{width: '60px'}}>1</div>
                    <div className="soclist_list_line_name">12.05.2024</div>
                    <div className="soclist_list_line_name">Проверочная программа</div>
                    <div className="soclist_list_line_name"></div>
                    <div className="soclist_list_line_del"><i className="fa-solid fa-pen-to-square" onClick={()=>setEdit(true)}/></div>
                </div>

            </div>
            {/*// Создание программы*/}
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
                            <div className="glass_board_body_tit">Возможность использования</div>
                            <div className="glass_board_body_buttons_create" style={(createcash)?{border: "1px solid #CCC"}:{border: "1px solid rgb(18, 19, 56)"}} onClick={()=>setCreatecash(false)}>Перчисление средств</div>
                            <div className="glass_board_body_buttons_create" style={(createcash)?{border: "1px solid rgb(18, 19, 56)"}:{border: "1px solid #CCC"}} onClick={()=>setCreatecash(true)}>Выбор использования</div>
                        </div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_tit">Начисление</div>
                            <div className="glass_board_body_buttons_create" style={(stazhcash)?{border: "1px solid #CCC"}:{border: "1px solid rgb(18, 19, 56)"}} onClick={()=>setStazhcash(false)}>Фиксированное</div>
                            <div className="glass_board_body_buttons_create" style={(stazhcash)?{border: "1px solid rgb(18, 19, 56)"}:{border: "1px solid #CCC"}} onClick={()=>setStazhcash(true)}>Расчет от стажа</div>
                            <div className="glass_board_body_btn">Редактировать % от стажа</div>
                        </div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_buttons_create">Создать</div>
                            <div className="glass_board_body_buttons_cancel">Сбросить</div>
                        </div>
                    </div>
                </div>
            </div>
            {/*// Редактирование программы*/}
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
                            <div className="glass_board_body_tit">Возможность использования</div>
                            <div className="glass_board_body_buttons_create" style={(editcash)?{border: "1px solid #CCC"}:{border: "1px solid rgb(18, 19, 56)"}} onClick={()=>setEditcash(false)}>Перчисление средств</div>
                            <div className="glass_board_body_buttons_create" style={(editcash)?{border: "1px solid rgb(18, 19, 56)"}:{border: "1px solid #CCC"}} onClick={()=>setEditcash(true)}>Выбор использования</div>
                        </div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_tit">Начисление</div>
                            <div className="glass_board_body_buttons_create" style={(stazhcash)?{border: "1px solid #CCC"}:{border: "1px solid rgb(18, 19, 56)"}} onClick={()=>setStazhcash(false)}>Фиксированное</div>
                            <div className="glass_board_body_buttons_create" style={(stazhcash)?{border: "1px solid rgb(18, 19, 56)"}:{border: "1px solid #CCC"}} onClick={()=>setStazhcash(true)}>Расчет от стажа</div>

                        </div>
                        <div className='glassslash'></div>
                        <div className="glass_board_body_buttons">
                            <div className="glass_board_body_buttons_create">Сохранить</div>
                        </div>
                    </div>
                </div>
            </div>
            {/*// Редактирование Комиссии*/}
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
            {/*// Редактирование стажа*/}
            <div className='glass' style={(stazhedit)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setStazhedit(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_title">Денежные  средства  выплачиваются  из  средств  фонда  по  личному  заявлению  работника  с  учетом  его  вклада  в  работу  ООО «Сургутское РСУ»  и  стажа  работы  в  Обществе</div>
                        <tabel>
                            <tr>
                                <td><div className="glass_board_body_tit">Стаж  работы  в  ООО «Сургутское РСУ»</div></td>
                                <td><div className="glass_board_body_tit">Размер  дополнительных  компенсаций  в  %</div></td>
                            </tr>
                            <tr>
                                <td>от <input type="number" className="glass_board_body_numinput" minLength="0" maxLength="2"/> до <input type="number" className="glass_board_body_numinput" minLength="0" maxLength="2"/> год(лет)</td>
                                <td><input type="number"  style={{margin: '20px'}} className="glass_board_body_numinput" minLength="0" maxLength="2"/> %</td>
                                <div className='btnpercent'>Добавить</div>
                            </tr>
                            <tr>
                                <td style={{padding: '10px 20px', border: '3px solid #CCC'}}>от 1 до 3 лет</td>
                                <td style={{padding: '10px 20px', border: '3px solid #CCC', margin: '0 0 0 -3px'}}>70%</td>
                                <div className='trashpercent'><i className="fa-solid fa-trash"/></div>
                            </tr>
                            <tr>
                                <td style={{padding: '10px 20px', border: '3px solid #CCC'}}>от 1 до 3 лет</td>
                                <td style={{padding: '10px 20px', border: '3px solid #CCC', margin: '0 0 0 -3px'}}>70%</td>
                                <div className='trashpercent'><i className="fa-solid fa-trash"/></div>
                            </tr>
                            <tr>
                                <td style={{padding: '10px 20px', border: '3px solid #CCC'}}>от 1 до 3 лет</td>
                                <td style={{padding: '10px 20px', border: '3px solid #CCC', margin: '0 0 0 -3px'}}>70%</td>
                                <div className='trashpercent'><i className="fa-solid fa-trash"/></div>
                            </tr>
                            <tr>
                                <td style={{padding: '10px 20px', border: '3px solid #CCC'}}>от 1 до 3 лет</td>
                                <td style={{padding: '10px 20px', border: '3px solid #CCC', margin: '0 0 0 -3px'}}>70%</td>
                                <div className='trashpercent'><i className="fa-solid fa-trash"/></div>
                            </tr>


                        </tabel>



                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Sociality)