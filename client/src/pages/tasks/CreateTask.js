import React, {useContext, useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import TasksService from "../../services/TasksService"
import './styles.scss'
import CmsSelect from "../../components/inputs/CmsSelect"
import CmsDatePicket from "../../components/inputs/CmsDatePicket";
import CheckBox from "../../components/inputs/CheckBox";
import MultiSelect from "../../components/inputs/MultiSelect";
import FileInput from "../../components/inputs/FileInput";
import FilesService from "../../services/FilesService";
import {useMessage} from "../../hooks/message.hook";

function CreateTask(){
    const [name,setName] = useState('')
    const [text,setText] = useState('')
    const [prio,setPrio] = useState({})
    const [obj,setObj] = useState({})
    const [exp,setExp] = useState()
    const [group,setGroup] = useState()
    const [files,setFiles] = useState()

    const [empty,setEmpty] = useState([])

    const [onDocuments,setOnDocuments] = useState(true)
    const [onConnect,setOnConnect] = useState(false)
    const [onGroup,setOnGroup] = useState(false)

    const [priority,setPriority] = useState([])
    const [objects,setObjects] = useState([])
    const [groups,setGroups] = useState([])
    const [viewGroup,setViewGroup] = useState([])
    const [namesGroup,setNamesGroup] = useState([])
    const [users,setUsers] = useState({})

    const {store} = useContext(Context)
    const message = useMessage()

    const loadingHandler = async () => {
        try {
            const priorities = await TasksService.fetchPriority()
            if(priorities.data) setPriority(priorities.data)
            const objects = await TasksService.fetchObjects()
            if(objects.data) setObjects(objects.data)
            const users = await TasksService.fetchUsers()
            if(users.data) setUsers(users.data)
            const groups = await TasksService.fetchGroups()
            if(groups.data) setGroups(groups.data)
            console.log(groups.data)
        }catch (e) {
            console.log(e)
        }
    }
    const changeGroupHandler = (e) => {
        const newGroup = viewGroup.find(item => item.id === e.value)
        setGroup(newGroup.users_tn)
    }
    const onDocumentsHandler = async() => {
        if(files) {
            files.map(async file => await FilesService.deleteFile(file.name))
        }
        setFiles([])
        setOnDocuments(!onDocuments)
    }
    const checkEmpty = () => {
        const n = [...empty]
        n[0] = !!!name.trim().length
        n[1] = !!!text.trim().length
        n[2] = !!!prio.id
        n[3] = false
        n[6] = false
        if(onConnect)n[3] = !!!obj.shifr
        if(onDocuments) n[6] = !!!files
        n[4] = !!!exp
        n[5] = !!!group

        const hasTrueValue = n.some(value => value === true)
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])

        return !hasTrueValue

    }

    const sendHandler = async () => {
        try {
            if(checkEmpty()){
                const filenames = files.map(file => file.name)
                const response = await TasksService.createTask(name,text,exp,prio,obj,filenames,group)
                if(response.data){
                    console.log(response.data)
                }
            }else {
                message('Заполните выделеные поля')
            }
        }catch (e){
            console.log(e)
        }
    }

    useEffect(() => {
        loadingHandler()
    },[])
    useEffect(() => {
        if(groups.length){
            const newGroups = groups.map(group => {
                const tns = group.users_tn.map(user => {
                    return users.find(item => item.value === user)
                })
                return {...group,users_tn:[...tns]}
            })
            const newNames = groups.map( group => {
                return {value:group.id,label:group.name}
            })
            setViewGroup(newGroups)
            setNamesGroup(newNames)
        }
    },[groups])

    return (
        <div className={`create-task`}>
            <div className="create_new_post_title">Создание Задачи</div>


            <div className={`inputs`}>
                <label className={`${empty[0] && 'red-color'}`}>Название задачи</label>
                <input onClick={() => console.log(files)} value={name} onChange={(e) => setName(e.target.value)} placeholder={'Введите название задачи'} className={`task-name ${empty[0] && 'red-dotted-border'}`} type={`text`}/>
                <label className={`${empty[1] && 'red-color'}`}>Описание задачи</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={'Введите описание задачи'} className={`task-text ${empty[1] && 'red-dotted-border'}`} />
                <label className={`${empty[2] && 'red-color'}`}>Приоритет Задачи</label>
                <CmsSelect placeholder="Назначте приоритетность задачи" options={priority} onChange={setPrio} empty={empty[2]} />
                <label className={`${empty[4] && 'red-color'}`}>Срок для выполнения</label>
                <CmsDatePicket placeholder="Выполнить задачу до..." onChange={setExp} empty={empty[4]}/>
                <CheckBox label={'Привязать к обьекту'} checked={onConnect} onChange={setOnConnect}/>
                {onConnect && <CmsSelect placeholder="Выберите обьект" options={objects} onChange={setObj} empty={empty[3]}/>}
                <CheckBox label={'Группа согласования'} checked={onGroup} onChange={setOnGroup}/>
                {onGroup && <CmsSelect placeholder="Выберите группу" options={namesGroup} onChange={changeGroupHandler} />}
                {!onGroup && <label>Передать задачу</label> }
                <MultiSelect options={users} values={group} setOptions={setGroup} empty={empty[5]} />
                <CheckBox label={'Добавить документы'} checked={onDocuments} onChange={onDocumentsHandler}/>
                {onDocuments && <FileInput files={files} setFiles={setFiles} user_id={store.user.id} empty={empty[6]}/>}
            </div>
            <div className="create_new_post_tools">
                <div onClick={() => sendHandler()} className="create_new_post_tools_publish">Отправить</div>
                <div className="create_new_post_tools_publish red-solid-border">Отменить</div>
            </div>
        </div>
    )
}

export default observer(CreateTask)