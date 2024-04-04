import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import TasksService from "../../services/TasksService"
import './styles.scss'

import UserService from "../../services/UserService";
import MultiSelect from "../../components/inputs/MultiSelect";
import {useMessage} from "../../hooks/message.hook";
import PollsService from "../../services/PollsService";
import ModalFiles from "../../components/modalwin/ModalFiles";

function CreateTaskGroup(){
    const [name,setName] = useState('')
    const [empty,setEmpty] = useState([])
    const [group,setGroup] = useState([])
    const [groups,setGroups] = useState([])
    const [viewGroup,setViewGroup] = useState([])
    const [users,setUsers] = useState('')
    const [activeDelete,setActiveDelete] = useState(false)
    const [selectGroupDel,setSelectGroupDel] = useState(-1)
    const [flag,setFlag] = useState(false)

    const message = useMessage()
    const {store} = useContext(Context)

    const loadingHandler = async () => {
        try {
            const users = await TasksService.fetchUsers()
            if(users.data) setUsers(users.data)
            const groups = await TasksService.fetchGroups()
            if(groups.data) setGroups(groups.data)
        }catch (e) {
            console.log(e)
        }
    }
    const checkEmpty = () => {
        const n = [...empty]
        n[0] = !!!name.length
        n[1] = !!!group.length

        const hasTrueValue = n.some(value => value === true)
        if( hasTrueValue ) {
            setFlag(true)
            setEmpty(n)
        }
        else setEmpty([])

        return !hasTrueValue
    }
    const createHandler = async () => {
        try {
            if (checkEmpty()) {
                const response = await TasksService.createGroup(name, group)
                if (response.data)
                    if (response.data.message) {
                        message(response.data.message)
                    } else {
                        setGroups([response.data, ...groups])
                        setGroup([])
                        setName('')
                        message('Группа добавлена')

                    }
                console.log(response.data)
            }else{
                console.log(empty)
                message('Заполните все поля')
            }
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadingHandler()
    },[])

    useEffect(() => {
        if(flag) console.log(checkEmpty())
    },[name,group])
    useEffect(() => {
        if(groups.length){
            const newGroups = groups.map(group => {
                const tns = group.users_tn.map(user => {
                    return users.find(item => item.value === user)
                })
                return {...group,users_tn:[...tns]}
            })
            setViewGroup(newGroups)
        }
    },[groups])

    const deleteHandler = async() => {
        try{
            const response = await TasksService.deleteGroup(selectGroupDel)
            if(response.data){
                const newView = [...viewGroup.filter(item => item.id !== selectGroupDel)]
                setViewGroup(newView)
                message('Группа удалена')
                setActiveDelete(false)
            }
        }catch (e) {
            console.log(e)
        }
    }
    const activeDeleteHandler = (id) => {
        setActiveDelete(true)
        setSelectGroupDel(id)
    }
    function Delete() {
        return(
            <>
                <div className='copy'>
                    <h4>Вы действительно хотели бы удалить данную группу?</h4>
                    <div className='buttons'>
                        <div onClick={() => deleteHandler()} className='button da'>Да</div>
                        <div onClick={() => setActiveDelete(false)} className='button'>Нет</div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className={`create-task`}>
            <div className="create_new_post_title">Создание и редактирование групп согласования</div>

            <div className={`inputs`}>
                <label>Название группы</label>
                <input onClick={() => console.log(viewGroup)} value={name} onChange={(e) => setName(e.target.value)} placeholder={'Введите название группы согласования'} className={`task-name ${empty[0] ? 'red-border' : null}`} type={`text`}/>
                <label>Наберите группу</label>
                <MultiSelect options={users} values={group} setOptions={setGroup} empty={empty[1]}/>
                <div className={`buttons`}>
                    <div onClick={(e) => createHandler()} className={`button`}>Добавить</div>
                </div>
            </div>
            <div className={`table-groups`}>
                {viewGroup.length && viewGroup.map( (item,index) => (
                    <div key={index} className={`row`}>
                        <div className={`name`}>{item.name}<div className={`delete-select`}><i onClick={(e) => activeDeleteHandler(item.id)} className="fa-solid fa-xmark"></i></div></div>
                        <MultiSelect values={item.users_tn} disable={true}/>
                    </div>
                ))}
            </div>
            <ModalFiles data={<Delete/>} active={activeDelete} setActive={setActiveDelete} heigth={'30vh'}/>
        </div>
    )
}

export default observer(CreateTaskGroup)