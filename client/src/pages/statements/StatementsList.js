import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
// import "./soc.scss"
import {useMessage} from "../../hooks/message.hook";
import ObjsService from "../../services/ObjsService";
import Select from "react-select";
import SocialService from "../../services/SocialService";
import {Context} from "../../index";

function StatementsList(){
    const {store} = useContext(Context)
    const iam = store.user
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
    const [comment, setComment] = useState('')
    const [resave, setResave] = useState(0)

    const message = useMessage()
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

    const [listza, setListza] = useState([])
    const [thisza, setThisza] = useState({})
    const getAllZa = async () => {
        try{
            const list = await SocialService.getAllZa()
            console.log(list.data)
            setListza(list.data)

        }catch(e){

        }
    }

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

    const getButton = (thisza, learn) => {
        let itog = 'no'
        if(thisza.commission){
            const newComs = thisza.commission
            newComs.map((man, index) => {
                if(man.user_tn === iam.tn && man.possion === 1 && man.status === 0){
                    if(learn === 'title'){
                        itog = 'Согласовать'
                    } else if (learn === 'display'){
                        itog = 'flex'
                    }
                } else if(man.user_tn === iam.tn && man.possion === 2 && man.status === 0){
                    if(learn === 'title') {
                        itog = 'Подписать'
                    } else if (learn === 'display'){
                        itog = 'flex'
                    }
                }
            })
        }
        return itog
    }

    const reverStatus = (status) => {
        try{
            let go = false
            let tn = ''
            let pos = 0

            if(thisza.commission){
                thisza.commission.forEach(man=>{
                    if(man.user_tn === iam.tn && man.possion === 1 && man.status === 0){
                        tn = man.user_tn
                        pos = 1
                        console.log('go')
                        const compliteSt = SocialService.reverStatus({thisza, user: tn, possion: pos, status, comment})
                        compliteSt.then(data=>{setThisza(data.data); message('Заявление согласовано')})

                    }
                })
            }

        }catch(e){
            console.log(e)
        }

    }

    const showStatement = za => {
        // alert('eye')
        setReadstatement(true)
        setThisza(za)
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
        getAllZa()
    }, [])
    useEffect(()=>{
        getAllZa()
    }, [resave])


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
                {listza.map((za, index)=>{let def=0; let yes=0; let no=0;return(
                    <div key={index} className="statelist_list_line bordertopnone tourer" style={(list.includes(index))?{border: '4px solid #000'}:{border: '4px solid #CCC'}} onClick={()=>chooseLine(index)}>
                        <div className="statelist_list_line_name listpp">{index+1}</div>
                        <div className="statelist_list_line_price date">{za.updatedAt.split('T')[0].split('-').reverse().join('.')}</div>
                        <div className="statelist_list_line_group">{za.programofsoc.name}</div>
                        <div className="statelist_list_line_group">{za.user.full_name}</div>
                        {(za.commission)&&za.commission.map((man, index)=>{
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
                        <div className="statelist_list_line_cropname">{(yes===0 && no===0)?'Новая':statusZA(def, yes, no)}</div>
                        <div className="statelist_list_line_del" onClick={()=>{showStatement(za)}} help='просмотреть'><i className="fa-solid fa-eye"/></div>
                        <div className="statelist_list_line_del" onClick={()=>{printStatement(0)}}><i className="fa-solid fa-print"/></div>
                        <div className="statelist_list_line_del" onClick={()=>{filesStatement(0)}}><i className="fa-solid fa-folder-open"/></div>
                        <div className="statelist_list_line_del" onClick={()=>{burnStatement(0)}}><i className="fa-solid fa-fire"/></div>
                        <div className="statelist_list_line_del" onClick={()=>{markStatement(0)}}><i className="fa-solid fa-eraser"/></div>
                    </div>
                )})}
            </div>

            <div className='glass' style={(readstatement)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark"  onClick={()=>setReadstatement(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_board_body_author">заявитель: {(thisza.user)&&thisza.user.full_name}</div>
                        <div className="glass_board_body_developer">должность: {(thisza.user)&&thisza.user.developer}</div>
                        <div className="glass_board_body_title">{(thisza.programofsoc)&&thisza.programofsoc.name}</div>
                        <div className="glass_board_body_title">Заявленная сумма: {(thisza.programofsoc)&&thisza.programofsoc.sum} руб.</div>
                        <div className="glass_board_body_stazh">стаж {(thisza.stazh)&&thisza.stazh}</div>

                        <div className="glass_board_body_documents">
                            {(thisza.docs)&&thisza.docs.map((doc, index)=>(
                                <div key={index} className="glass_board_body_documents_file" onClick={()=>handleDownload(doc)}>
                                    <i className="fa-regular fa-file"/>
                                    <div className="glass_board_body_documents_file_name">{doc.docdesc}</div>
                                </div>
                            ))}
                        </div>
                        <div className="glass_board_body_control">
                            {/*<div className="glass_board_body_control_btn">Заключение</div>*/}

                            <div className="glass_board_body_control_btn" onClick={()=>reverStatus(1)} style={('flex' === 'flex')&&{display: 'flex'}}>{getButton(thisza, 'title')}</div>
                            {/*<div className="glass_board_body_control_btn">Согласовать</div>*/}
                            {/*<div className="glass_board_body_control_btn">Отклонить</div>*/}
                            {/*<div className="glass_board_body_control_btn">Подписать</div>*/}
                        </div>
                        <div className="glass_board_body_tit">Согласования</div>

                        {(thisza.commission)&&thisza.commission.map((man, index)=>{ if(man.possion === 1){return(
                            <div key={index} className="glass_approve_body_man">
                                <div className="glass_approve_body_man_content">
                                    <div className="glass_approve_body_man_photo" style={(man.user.avatar)?{backgroundImage: `url("/files/profile/${man.user.avatar}")`}:{backgroundImage: 'url("/profile/face.png")'}}></div>
                                    <div className="glass_approve_body_man_params">
                                        <div className="glass_approve_body_man_name">{man.t13uni.name}</div>
                                        <div className="glass_approve_body_man_dev">{man.t13uni.developer}</div>
                                        <div className="glass_approve_body_man_departament">{man.t13uni.branch}</div>
                                        <div className="glass_board_body_tit">Комментарий:</div>
                                        {(iam.tn === man.t13uni.tn && man.status === 0)?(<input className='glass_approve_body_man_comment' style={{border: '3px solid #000', width: '300px'}} defaultValue={comment} onChange={(e)=>setComment(e.target.value)} type='text' placeholder='Ввести комментарий'/>):(<div className="glass_approve_body_man_comment">{(man.comment === '')?'Комментарий отсутствует':man.comment}</div>)}
                                    </div>
                                </div>
                                <div className="glass_approve_body_man_status">
                                    {(man.status === 0)&&(
                                        <div className="glass_approve_body_man_status_wait">Ожидание</div>
                                    )}
                                    {(man.status === 1)&&(
                                        <div className="glass_approve_body_man_status_yes">Cогласовано</div>
                                    )}
                                    {(man.status === 2)&&(
                                        <div className="glass_approve_body_man_status_no">Отклонено</div>
                                    )}
                                </div>
                            </div>
                        )}})}

                        <div className='glassslash'></div>
                        <div className="glass_board_body_tit">Контроль</div>

                        {(thisza.commission)&&thisza.commission.map((man, index)=>{ if(man.possion === 2){return(
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

                        {(thisza.commission)&&thisza.commission.map((man, index)=>{ if(man.possion === 3){return(
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

                        {(thisza.commission)&&thisza.commission.map((man, index)=>{ if(man.possion === 4){return(
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