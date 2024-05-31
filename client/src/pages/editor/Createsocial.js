import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "./soc.scss"
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import Select from "react-select";
import SocialService from "../../services/SocialService";
import SimpleInput from "../../components/inputs/SimpleInput";
import {Context} from "../../index";
import FilesService from "../../services/FilesService";
import UserService from "../../services/UserService";

function Createsocial(){
    const {store} = useContext(Context)
    const iam = store.user
    console.log(iam.tn)
    const [create, setCreate] = useState(0)
    const [edit, setEdit] = useState(false)
    const [thisuser, setThisuser] = useState([])
    const [listuser, setListuser] = useState([])
    const [savestate, setSavestate] = useState(0)
    const [allprogram, setAllprogram] = useState([])
    const [thisprogram, setThisprogram] = useState('@')
    const [file, setFile] = useState(null)
    const [group, setGroup] = useState([])
    const [progress,setProgress] = useState(0)
    const [openprogram, setOpenprogram] = useState(false)
    const [openeye, setOpeneye] = useState(false)
    const [actualusers, setActualusers] =useState([])
    const message = useMessage()

    const getUni = async () => {
        try{
            const {data} = await UserService.getUni()
            const t13uni = [...data]
            // console.log(data)
            setActualusers(t13uni)
        }catch(e){
            console.log(e)
        }
    }
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
    const [st, setSt] = useState('')
    const searchStazh = async () =>{
        try{
            const {data} = await UserService.getUni()
            data.forEach(man=>{
                if(man.tn === iam.tn){
                    let parts = man.onboard.split('.');
                    let day = parts[0];
                    let month = parts[1];
                    let year = parts[2];

                    let formattedDate = `${year}-${month}-${day}`;
                    let startDate = new Date(formattedDate);
                    // Текущая дата
                    let endDate = new Date();

                    // Разница в миллисекундах
                    let diffInMs = endDate - startDate;

                    // Переводим миллисекунды в годы и месяцы
                    let years = endDate.getFullYear() - startDate.getFullYear();
                    let months = endDate.getMonth() - startDate.getMonth();

                    if (months < 0) {
                        years--;
                        months += 12;
                    }
                    console.log(`${years} лет и ${months} месяцев`)
                    return `${years} лет и ${months} месяцев`
                }else{
                    return 'стаж не найден'
                }

            })

        }catch(e){
            console.log(e)
        }

    }
    const createStep = async () => {
        try{
            const {data} = await SocialService.getComission()
            if(data){
                data.forEach(man=>{
                    man.status = 0
                    man.comment = ''
                })
                let corm = 0;
                let stoped = 0;
                const mans = await UserService.getUni()
                if(mans){
                    const listmans = mans.data
                    console.log(listmans)
                    listmans.forEach(man=>{

                        if(man.tn === iam.tn){
                            console.log('Вход в условие')
                            let parts = man.onboard.split('.');
                            let day = parts[0];
                            let month = parts[1];
                            let year = parts[2];

                            let formattedDate = `${year}-${month}-${day}`;
                            let startDate = new Date(formattedDate);
                            // Текущая дата
                            let endDate = new Date();

                            // Разница в миллисекундах
                            let diffInMs = endDate - startDate;
                            // Переводим миллисекунды в годы и месяцы
                            let years = endDate.getFullYear() - startDate.getFullYear();
                            let months = endDate.getMonth() - startDate.getMonth();

                            if (months < 0) {
                                years--;
                                months += 12;
                            }
                            let oldername = 'лет'
                            const yearstrock = `${years}`
                            const intend = +yearstrock[yearstrock.length - 1]
                            console.log(intend)
                            if(years !== 11 && intend === 1){
                                oldername = 'год'
                            }else if(years !== 12 && years !== 13 && years !== 14 && (intend === 2 || intend === 3 || intend === 4)){
                                oldername = 'года'
                            }else{
                                oldername = 'лет'
                            }
                            console.log(`${years} лет и ${months} месяцев`)
                            corm = `${years} ${oldername} и ${months} месяцев`
                        }else{
                            stoped = 'стаж не найден'
                        }

                    })

                    const stazhnow = {}
                    let itogystazh;
                    if(corm !== 0){
                        itogystazh = corm
                    } else {
                        itogystazh = stoped
                    }
                    stazhnow.year = itogystazh
                    console.log(stazhnow)
                    const newza = await SocialService.createZaSocial({
                        za: thisprogram,
                        stazh: stazhnow,
                        files: group,
                        capitan: thisuser,
                        commission: data
                    })
                    setCreate(0)
                    setSavestate(0)
                    console.log(newza)
                    getMyZa()
                }

            }else{
                message('Произошла ошибка создания заявки')
            }

        }catch(e){

        }

    }

    const [listza, setListza] = useState([])


    const handleDownload = async (doc) => {
        try {
            console.log('123')
            const response = await SocialService.downloadDoc({doc})

            if(response.status === 200) {

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                console.log(url)
                link.setAttribute('download', doc.docname)
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getMyZa = async () => {
        try{
            const list = await SocialService.getMyZa()
            setListza(list.data)
            console.log(list.data)
        }catch(e){
            console.log(e)
        }
    }

    const statusZA = (def, yes, no) => {
        if(no !== 0){
            return ('Отказано')
        }else if(def !== 0){
            return ('На согласовании')
        }else if(def === 0 && no === 0 && yes !== 0){
            return ('Согласовано')
        }
    }

    useEffect(()=>{
        getUsers()
        getAllPrograms()
    }, [])

    useEffect(()=>{
        console.log(group)
    }, [group])

    useEffect(()=>{
        getMyZa()
        getUni()
    },[])

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
                {listza.map((program, index) =>{ let yes = 0; let no = 0; let def = 0; ;return(
                    <div key={index} className="soclist_list_line ">
                        <div className="soclist_list_line_name listpp">{index+1}</div>
                        <div className="soclist_list_line_name">{(program.updatedAt)&&program.updatedAt}</div>
                        <div className="soclist_list_line_name">{(program.programofsoc.name)&&program.programofsoc.name}</div>
                        {(program.commission)&&program.commission.map((man, index)=>{
                            if(man.status === 0){
                                def++
                            }else if(man.status === 1){
                                yes++
                            }else if(man.status === 2){
                                no++
                            }else{
                                def++
                            }
                        })}
                        <div className="soclist_list_line_name">{statusZA(def, yes, no)}</div>
                        <div className="soclist_list_line_del"><i className="fa-solid fa-eye" onClick={()=>{setOpeneye(true);setOpenprogram(program)}}/></div>
                    </div>
                )})}

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
                            {/*<SimpleInput file={file} setFile={setFile} name={'Свидетельство о рождении'}/>*/}
                            {(thisprogram !== '@')&&thisprogram.docs.map((doc, index) => (
                                <SimpleInput key={index} program={thisprogram} file={file} doc={doc} setFile={setFile} group={group} progress={progress} setProgress={setProgress} setGroup={setGroup} name={doc.desc}/>
                            ))}

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
                            <div className="glass_board_body_docs_za">{thisprogram.label}</div>
                            <div className="glass_board_body_tit">Документы:</div>
                            {(thisprogram !== '@')&&thisprogram.docs.map((doc, index) => (
                                // <SimpleInput key={index} file={file} doc={doc} setFile={setFile} group={group} progress={progress} setProgress={setProgress} setGroup={setGroup} name={doc.desc}/>
                                <div className="glass_board_body_docs_set_name">
                                    <div className="glass_board_body_docs_set_name_title">{doc.desc}</div>
                                    <div className="glass_board_body_docs_set_name_docname">
                                        { group.map((elem, index)=>{ if(elem.docdesc === doc.desc){  return(
                                            <div key={index} className="glass_board_body_docs_set_name_docname_this"> {(elem.name.split('.')[0].length>10)?elem.name.split('.')[0].slice(0,7)+'..'+elem.name.split('.')[0].slice(-2)+'.'+elem.name.split('.')[1]:elem.name}</div>
                                        )}})}
                                        {/*<div className="glass_board_body_docs_set_name_docname_this">img324werer352...23.jpg</div>*/}
                                    </div>
                                </div>
                            ))}
                            {/*<div className="glass_board_body_docs_set_name">*/}
                            {/*    <div className="glass_board_body_docs_set_name_title">Свидетельство о рождении ребенка</div>*/}
                            {/*    <div className="glass_board_body_docs_set_name_docname">*/}
                            {/*        <div className="glass_board_body_docs_set_name_docname_this">img324werer352...23.jpg</div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="glass_board_body_docs_set_name">*/}
                            {/*    <div className="glass_board_body_docs_set_name_title">Паспорт заявителя</div>*/}
                            {/*    <div className="glass_board_body_docs_set_name_docname">*/}
                            {/*        <div className="glass_board_body_docs_set_name_docname_this">img324234352...32.jpg</div>*/}
                            {/*        <div className="glass_board_body_docs_set_name_docname_this">img324234352...35.jpg</div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="glass_board_body_docs_set_name">*/}
                            {/*    <div className="glass_board_body_docs_set_name_title">Паспорт супруга / супруги</div>*/}
                            {/*    <div className="glass_board_body_docs_set_name_docname">*/}
                            {/*        <div className="glass_board_body_docs_set_name_docname_this">img324234352...32.jpg</div>*/}
                            {/*        <div className="glass_board_body_docs_set_name_docname_this">img324234352...35.jpg</div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="glass_board_body_docs_set_name">*/}
                            {/*    <div className="glass_board_body_docs_set_name_title">Дополнительно (если требуется)</div>*/}
                            {/*    <div className="glass_board_body_docs_set_name_docname">*/}
                            {/*        <div className="glass_board_body_docs_set_name_docname_this">img324234352...32.jpg</div>*/}
                            {/*        <div className="glass_board_body_docs_set_name_docname_this">img324234352...35.jpg</div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                        </div>
                        <div className="glass_board_step_next" onClick={createStep}>Отправить</div>

                    </div>
                </div>
            </div>

            <div className='glass' style={(openeye)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setOpeneye(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_author">заявитель: {(openprogram)&&openprogram.user.full_name}</div>
                        <div className="glass_board_body_developer">должность: {(openprogram)&&openprogram.user.developer}</div>
                        <div className="glass_board_body_title">программа: {(openprogram)&&openprogram.programofsoc.name}</div>
                        <div className="glass_board_body_title">Заявленная сумма: {(openprogram)&&openprogram.programofsoc.sum} руб.</div>
                        <div className="glass_board_body_stazh">стаж {(openprogram)&&openprogram.stazh}</div>

                        <div className="glass_board_body_documents">
                            {(openprogram.docs)&&openprogram.docs.map((doc, index)=>(
                                <div key={index} className="glass_board_body_documents_file" onClick={()=>handleDownload(doc)}>
                                    <i className="fa-regular fa-file"/>
                                    <div className="glass_board_body_documents_file_name">{doc.docdesc}</div>
                                </div>
                            ))}
                        </div>
                        <div className="glass_board_body_tit">Согласования</div>

                        {(openprogram)&&openprogram.commission.map((man, index)=>{ if(man.possion === 1){return(
                            <div key={index} className="glass_approve_body_man">
                                <div className="glass_approve_body_man_content">
                                    <div className="glass_approve_body_man_photo" style={(man.user.avatar)?{backgroundImage: `url("/files/profile/${man.user.avatar}")`}:{backgroundImage: 'url("/profile/face.png")'}}></div>
                                    <div className="glass_approve_body_man_params">
                                        <div className="glass_approve_body_man_name">{man.t13uni.name}</div>
                                        <div className="glass_approve_body_man_dev">{man.t13uni.developer}</div>
                                        <div className="glass_approve_body_man_departament">{man.t13uni.branch}</div>
                                    </div>
                                </div>
                                <div className="glass_approve_body_man_status">
                                    {(man.status === 0)&&(
                                        <div className="glass_approve_body_man_status_wait">Ожидание</div>
                                    )}
                                    {(man.status === 1)&&(
                                    <div className="glass_approve_body_man_status_yes">Согласован</div>
                                    )}
                                    {(man.status === 2)&&(
                                    <div className="glass_approve_body_man_status_no">Отклонено</div>
                                    )}
                                </div>
                            </div>
                        )}})}

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Контроль</div>

                        {(openprogram)&&openprogram.commission.map((man, index)=>{ if(man.possion === 2){return(
                            <div key={index} className="glass_approve_body_man">
                                <div className="glass_approve_body_man_content">
                                    <div className="glass_approve_body_man_photo" style={(man.user.avatar)?{backgroundImage: `url("/files/profile/${man.user.avatar}")`}:{backgroundImage: 'url("/profile/face.png")'}}></div>
                                    <div className="glass_approve_body_man_params">
                                        <div className="glass_approve_body_man_name">{man.t13uni.name}</div>
                                        <div className="glass_approve_body_man_dev">{man.t13uni.developer}</div>
                                        <div className="glass_approve_body_man_departament">{man.t13uni.branch}</div>
                                    </div>
                                </div>
                                <div className="glass_approve_body_man_status">
                                    {(man.status === 0)&&(
                                        <div className="glass_approve_body_man_status_wait">Ожидание</div>
                                    )}
                                    {(man.status === 1)&&(
                                        <div className="glass_approve_body_man_status_yes">Согласован</div>
                                    )}
                                    {(man.status === 2)&&(
                                        <div className="glass_approve_body_man_status_no">Отклонено</div>
                                    )}
                                </div>
                            </div>
                        )}})}

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Подписант</div>

                        {(openprogram)&&openprogram.commission.map((man, index)=>{ if(man.possion === 3){return(
                            <div key={index} className="glass_approve_body_man">
                                <div className="glass_approve_body_man_content">
                                    <div className="glass_approve_body_man_photo" style={(man.user.avatar)?{backgroundImage: `url("/files/profile/${man.user.avatar}")`}:{backgroundImage: 'url("/profile/face.png")'}}></div>
                                    <div className="glass_approve_body_man_params">
                                        <div className="glass_approve_body_man_name">{man.t13uni.name}</div>
                                        <div className="glass_approve_body_man_dev">{man.t13uni.developer}</div>
                                        <div className="glass_approve_body_man_departament">{man.t13uni.branch}</div>
                                    </div>
                                </div>
                                <div className="glass_approve_body_man_status">
                                    {(man.status === 0)&&(
                                        <div className="glass_approve_body_man_status_wait">Ожидание</div>
                                    )}
                                    {(man.status === 1)&&(
                                        <div className="glass_approve_body_man_status_yes">Согласован</div>
                                    )}
                                    {(man.status === 2)&&(
                                        <div className="glass_approve_body_man_status_no">Отклонено</div>
                                    )}
                                </div>
                            </div>
                        )}})}

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Исполнитель</div>

                        {(openprogram)&&openprogram.commission.map((man, index)=>{ if(man.possion === 4){return(
                            <div key={index} className="glass_approve_body_man">
                                <div className="glass_approve_body_man_content">
                                    <div className="glass_approve_body_man_photo" style={(man.user.avatar)?{backgroundImage: `url("/files/profile/${man.user.avatar}")`}:{backgroundImage: 'url("/profile/face.png")'}}></div>
                                    <div className="glass_approve_body_man_params">
                                        <div className="glass_approve_body_man_name">{man.t13uni.name}</div>
                                        <div className="glass_approve_body_man_dev">{man.t13uni.developer}</div>
                                        <div className="glass_approve_body_man_departament">{man.t13uni.branch}</div>
                                    </div>
                                </div>
                                <div className="glass_approve_body_man_status">
                                    {(man.status === 0)&&(
                                        <div className="glass_approve_body_man_status_wait">Ожидание</div>
                                    )}
                                    {(man.status === 1)&&(
                                        <div className="glass_approve_body_man_status_yes">Согласован</div>
                                    )}
                                    {(man.status === 2)&&(
                                        <div className="glass_approve_body_man_status_no">Отклонено</div>
                                    )}
                                </div>
                            </div>
                        )}})}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Createsocial)