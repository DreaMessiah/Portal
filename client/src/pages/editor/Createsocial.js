import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "./soc.scss"
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import Select from "react-select";
import SocialService from "../../services/SocialService";

function Createsocial(){

    const [create, setCreate] = useState(0)
    const [edit, setEdit] = useState(false)
    const [thisuser, setThisuser] = useState([])
    const [listuser, setListuser] = useState([])
    const [savestate, setSavestate] = useState(0)
    const [allprogram, setAllprogram] = useState([])
    const [thisprogram, setThisprogram] = useState([])
    // const message = useMessage()
    const getAllPrograms = async () => {
        try{
            const {data} = await SocialService.getProgram()
            let i = 0
            data.forEach(program => {
                program.label = program.name
                program.value = program.id
                program.index = i
                i++
            })
            setAllprogram(data)
        }catch(e){
            console.log(e)
        }
    }
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
    const openModal = () => {
        if(create === 0){
            setCreate(1)
            setSavestate(1)
        } else {
            setCreate(savestate)
        }
    }
    const nextStep = () => {
        setCreate(create+1)
        setSavestate(create+1)
    }
    const createStep = () => {
        setCreate(0)
        setSavestate(0)
    }

    useEffect(()=>{
        getUsers()
        getAllPrograms()
    }, [])
    return (
        <div className="soclist">
            <div className="soclist_title">Мои заявки на материальную помощь</div>
            <div className={'text'}><p>Для создания новой заявки нажмите кнопку Создать</p><p>Ознакомиться со списком программ на материальную помощь можно в разделе "Список программ"</p></div>
            <div className="soclist_btns">
                <div className="soclist_upload" onClick={openModal}>Создать</div>
            </div>
            <div className="soclist_list">
                <div className="soclist_list_line noneblock">
                    <div className="soclist_list_line_name nametitle ">П/П</div>
                    <div className="soclist_list_line_price title">Дата создания / изменения</div>
                    <div className="soclist_list_line_group title ">Заявка</div>
                    <div className="soclist_list_line_cropname title">Статус</div>
                </div>

                <div className="soclist_list_line ">
                    <div className="soclist_list_line_name listpp">1</div>
                    <div className="soclist_list_line_name">12.05.2024</div>
                    <div className="soclist_list_line_name">На: "Материальная помощь при рождении ребенка"</div>
                    <div className="soclist_list_line_name">На согласовании</div>
                    <div className="soclist_list_line_del"><i className="fa-solid fa-eye" onClick={()=>setEdit(true)}/></div>
                </div>
                <div className="soclist_list_line ">
                    <div className="soclist_list_line_name listpp">2</div>
                    <div className="soclist_list_line_name">12.01.2022</div>
                    <div className="soclist_list_line_name">На: "Материальная помощь при рождении ребенка"</div>
                    <div className="soclist_list_line_name">Завершено</div>
                    <div className="soclist_list_line_del"><i className="fa-solid fa-eye" onClick={()=>setEdit(true)}/></div>
                </div>
            </div>

            <div className='glass' style={(create === 1)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setCreate(0)}/></div>
                    <div className="glass_board_body">
                        <div className='glass_board_btn'>
                            <div className="glass_board_btn_left"><div><i className="fa-solid fa-chevron-left"/></div></div>
                            <div className="glass_board_btn_right"><div><i className="fa-solid fa-chevron-right"/></div></div>
                        </div>
                        <div className="glass_board_step">Шаг {create}</div>
                        <div className="glass_board_body_title_rock">Создание новой заявки</div>
                        <div className="glass_board_body_tit">Выбрать программу</div>
                        <Select placeholder='Программа' onChange={(e) => setThisprogram(allprogram[e.index])} value={thisprogram} options={allprogram} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
                        <div className="glass_board_step_next" onClick={nextStep}>Далее</div>

                    </div>
                </div>
            </div>
            <div className='glass' style={(create === 2)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setCreate(0)}/></div>
                    <div className="glass_board_body">
                        <div className='glass_board_btn'>
                            <div className="glass_board_btn_left"><div><i className="fa-solid fa-chevron-left"/></div></div>
                            <div className="glass_board_btn_right"><div><i className="fa-solid fa-chevron-right"/></div></div>
                        </div>
                        <div className="glass_board_step">Шаг {create}</div>
                        <div className="glass_board_body_title_rock">Выбрать руководителя для согласования</div>
                        <div className="glass_board_body_tit">Выбрать руководителя</div>
                        <Select placeholder='Сотрудник' onChange={(e) => setThisuser(listuser[e.index])} value={thisuser} options={listuser} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
                        <div className="glass_board_step_next" onClick={nextStep}>Далее</div>

                    </div>
                </div>
            </div>
            <div className='glass' style={(create === 3)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setCreate(false)}/></div>
                    <div className="glass_board_body">
                        <div className='glass_board_btn'>
                            <div className="glass_board_btn_left"><div><i className="fa-solid fa-chevron-left"/></div></div>
                            <div className="glass_board_btn_right"><div><i className="fa-solid fa-chevron-right"/></div></div>
                        </div>
                        <div className="glass_board_step">Шаг {create}</div>
                        <div className="glass_board_body_title_rock">Добавить необходимые документы</div>
                        <div className="glass_board_body_tit">*Обязательные</div>
                        <div className="glass_board_body_docs">
                            <div className="glass_board_body_docs_set">
                                <div className="glass_board_body_docs_set_name">
                                    <div className="glass_board_body_docs_set_name_title">Свидетельство о рождении</div>
                                    <div className="glass_board_body_docs_set_name_docname">*не загружено...</div>
                                </div>
                                <div className="glass_board_body_docs_set_btn"><i className="fa-solid fa-circle-plus"/></div>
                            </div>
                            <div className="glass_board_body_docs_set">
                                <div className="glass_board_body_docs_set_name">
                                    <div className="glass_board_body_docs_set_name_title">Паспорт заявителя</div>
                                    <div className="glass_board_body_docs_set_name_docname">
                                        <div className="glass_board_body_docs_set_name_docname_this">img324234352...32.jpg</div>
                                        <div className="glass_board_body_docs_set_name_docname_this">img324234352...35.jpg</div>
                                    </div>
                                </div>
                                <div className="glass_board_body_docs_set_btn"><i className="fa-solid fa-circle-plus"/></div>
                            </div>
                            <div className="glass_board_body_docs_set">
                                <div className="glass_board_body_docs_set_name">
                                    <div className="glass_board_body_docs_set_name_title">Паспорт супруга / супруги</div>
                                    <div className="glass_board_body_docs_set_name_docname">*не загружено...</div>
                                </div>
                                <div className="glass_board_body_docs_set_btn"><i className="fa-solid fa-circle-plus"/></div>
                            </div>
                            <div className="glass_board_body_docs_set">
                                <div className="glass_board_body_docs_set_name">
                                    <div className="glass_board_body_docs_set_name_title">Паспорт супруга / супруги</div>
                                    <div className="glass_board_body_docs_set_name_docname">*не загружено...</div>
                                </div>
                                <div className="glass_board_body_docs_set_btn"><i className="fa-solid fa-circle-plus"/></div>
                            </div>
                            <div className="glass_board_body_docs_set">
                                <div className="glass_board_body_docs_set_name">
                                    <div className="glass_board_body_docs_set_name_title">Паспорт супруга / супруги</div>
                                    <div className="glass_board_body_docs_set_name_docname">*не загружено...</div>
                                </div>
                                <div className="glass_board_body_docs_set_btn"><i className="fa-solid fa-circle-plus"/></div>
                            </div>
                            <div className="glass_board_body_docs_set">
                                <div className="glass_board_body_docs_set_name">
                                    <div className="glass_board_body_docs_set_name_title">Паспорт супруга / супруги</div>
                                    <div className="glass_board_body_docs_set_name_docname">*не загружено...</div>
                                </div>
                                <div className="glass_board_body_docs_set_btn"><i className="fa-solid fa-circle-plus"/></div>
                            </div>
                            <div className="glass_board_body_docs_set">
                                <div className="glass_board_body_docs_set_name">
                                    <div className="glass_board_body_docs_set_name_title">Паспорт супруга / супруги</div>
                                    <div className="glass_board_body_docs_set_name_docname">*не загружено...</div>
                                </div>
                                <div className="glass_board_body_docs_set_btn"><i className="fa-solid fa-circle-plus"/></div>
                            </div>
                        </div>
                        <div className="glass_board_step_next" onClick={nextStep}>Далее</div>

                    </div>
                </div>
            </div>
            <div className='glass' style={(create === 4)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setCreate(false)}/></div>
                    <div className="glass_board_body">
                        <div className='glass_board_btn'>
                            <div className="glass_board_btn_left"><div><i className="fa-solid fa-chevron-left"/></div></div>
                            <div className="glass_board_btn_right"><div><i className="fa-solid fa-chevron-right"/></div></div>
                        </div>
                        <div className="glass_board_step">Шаг {create}</div>
                        <div className="glass_board_body_title_rock">Добавить необходимые документы</div>
                        <div className="glass_board_body_tit">Заявление</div>
                        <div className="glass_board_body_docs">
                            <div className="glass_board_body_docs_za">Прошу предоставить материальную помощь в связи с рождением ребенка</div>
                            <div className="glass_board_body_tit">Документы:</div>
                            <div className="glass_board_body_docs_set_name">
                                <div className="glass_board_body_docs_set_name_title">Свидетельство о рождении ребенка</div>
                                <div className="glass_board_body_docs_set_name_docname">
                                    <div className="glass_board_body_docs_set_name_docname_this">img324werer352...23.jpg</div>
                                </div>
                            </div>
                            <div className="glass_board_body_docs_set_name">
                                <div className="glass_board_body_docs_set_name_title">Паспорт заявителя</div>
                                <div className="glass_board_body_docs_set_name_docname">
                                    <div className="glass_board_body_docs_set_name_docname_this">img324234352...32.jpg</div>
                                    <div className="glass_board_body_docs_set_name_docname_this">img324234352...35.jpg</div>
                                </div>
                            </div>
                            <div className="glass_board_body_docs_set_name">
                                <div className="glass_board_body_docs_set_name_title">Паспорт супруга / супруги</div>
                                <div className="glass_board_body_docs_set_name_docname">
                                    <div className="glass_board_body_docs_set_name_docname_this">img324234352...32.jpg</div>
                                    <div className="glass_board_body_docs_set_name_docname_this">img324234352...35.jpg</div>
                                </div>
                            </div>
                            <div className="glass_board_body_docs_set_name">
                                <div className="glass_board_body_docs_set_name_title">Дополнительно (если требуется)</div>
                                <div className="glass_board_body_docs_set_name_docname">
                                    <div className="glass_board_body_docs_set_name_docname_this">img324234352...32.jpg</div>
                                    <div className="glass_board_body_docs_set_name_docname_this">img324234352...35.jpg</div>
                                </div>
                            </div>

                        </div>
                        <div className="glass_board_step_next" onClick={createStep}>Отправить</div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Createsocial)