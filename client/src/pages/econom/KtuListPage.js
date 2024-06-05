import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import "./ogm.scss"
import {useMessage} from "../../hooks/message.hook";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ReferenceService from "../../services/ReferenceService";
import isNumeric from "../../components/functions/isNumeric";
import ModalFiles from "../../components/modalwin/ModalFiles";
import TasksService from "../../services/TasksService";
import MultiSelect from "../../components/inputs/MultiSelect";
import TableDatePicker from "../../components/inputs/TableDatePicker";
import KtuInput from "../../components/inputs/KtuInput";
import UserService from "../../services/UserService";
import formatDate from "../../components/functions/formatDate";


function KtuListPage(){
    const location = useLocation()
    const [users,setUsers] = useState([])
    const [group,setGroup] = useState([])
    const [ktus,setKtus] = useState([])
    const [ktusId,setKtusId] = useState(0)
    const [activeDelete,setActiveDelete] = useState(false)
    const [deleteIndex,setDeleteIndex] = useState(-1)
    const [createEmpty,setCreateEmpty] = useState(false)
    const [empty,setEmpty] = useState([])

    const {store} = useContext(Context)
    const message = useMessage()
    const navigate = useNavigate()
    const loadingHandler = async (id) => {
        try {
            const ktuslist = await ReferenceService.fetchKtus(id)
            const users = await UserService.getWorkers()

            if(ktuslist.data) setKtus(ktuslist.data)
            if(users.data){
                users.data.map(item => {
                    item.label = item.name + ' / ' + item.developer
                })
                setUsers(users.data)
            }
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const getId = searchParams.get('id') ? searchParams.get('id') : 0
        setKtusId(getId)
        loadingHandler(getId)
    }, [location])

    const checkEmpty = () => {
        const n = [...empty]
        ktus.map( (item,index) => {
            n[index*4] = item.shifr ? !!!item.shifr.trim().length : true
            n[index*4+1] = !!!item.ktudate
            n[index*4+2] = item.content ? !!!item.content.trim().length : true
        })
        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const changeShifrHandler = (value,index) => {
        const newKtus = [...ktus]
        newKtus[index].shifr = value
        setKtus(newKtus)
    }
    const changeDateHandler = (value,index) => {
        const newKtus = [...ktus]
        newKtus[index].ktudate = value
        setKtus(newKtus)
    }
    const changeContentHandler = (value,index) => {
        const newKtus = [...ktus]
        newKtus[index].content = value
        setKtus(newKtus)
    }
    const changeKtuHandler = (value,index) => {
        const newKtus = [...ktus]
        newKtus[index].ktu = value
        setKtus(newKtus)
    }
    const changeSzfromHandler = (value,index) => {
        const newKtus = [...ktus]
        newKtus[index].szfrom = value
        setKtus(newKtus)
    }
    const createHandler = () => {
        setCreateEmpty(!!!group.length)
        if(group.length){
            let newKtus = [...ktus]
            group.map(item => {
                const fio = item.label.split('/')
                newKtus = ([{id:'new',user_tn:item.value,szfrom:'',name:fio[0],developer:fio[1],from_tn:store.user.full_name,ktudate:new Date()},...newKtus])
                setGroup([])
            })
            setKtus(newKtus)
        }else{
            message('Выберете людей')
        }
    }
    const saveHandler = async (index) => {
        try {
            if(!checkEmpty()){
                const response = await ReferenceService.saveKtus(ktusId,ktus)
                if(response.data) {
                    console.log(response.data)
                    message('Протоколы обновлены')
                    loadingHandler(ktusId)
                }
            }else {
                message('Заполните недостоющие поля')
            }

        }catch (e) {
            console.log(e)
        }
    }
    const goToHandler = (index) => {
        //navigate(`/ktulist?id=${ktuDocs[index].id}`)
    }
    const deleteHandler = (index) => {
        if(ktus[index].id === 'new'){
            const newKtus = [...ktus]
            newKtus.splice(index, 1)
            setKtus(newKtus)
        }else{
            setDeleteIndex(index)
            setActiveDelete(true)
        }
    }
    function Delete() {
        const removeHandler = async () => {
            try{
                const response = await ReferenceService.delKtus(ktus[deleteIndex].id)
                console.log(response.data)
                if(response.data.del) {
                    message(response.data.message)
                    const newKtuDoc = [...ktus]
                    newKtuDoc.splice(deleteIndex, 1)
                    setKtus(newKtuDoc)
                    exitDeleteHandler()
                }
            }catch (e){
                console.log(e.message+': Проблема удаления тарифа')
            }
        }
        const exitDeleteHandler = () => {
            setDeleteIndex(-1)
            setActiveDelete(false)
        }
        return(
            <>
                <div className='copy'>
                    <h4>Вы действительно хотели бы удалить документ {deleteIndex >= 0 && ktus[deleteIndex].id+' от '+formatDate(ktus[deleteIndex].createdAt)}</h4>
                    <div className='buttons'>
                        <div onClick={() => removeHandler()} className='button da'>Да</div>
                        <div onClick={() => exitDeleteHandler()} className='button'>Нет</div>
                    </div>
                </div>
            </>
        )
    }
    const rule = store.user.unit
    return (
        <div className="ogmlist">
            <div onClick={(e) => console.log(ktus)} className="ogmlist_title">Дополнительные протоколы КТУ</div>
            <div style={{marginBottom:'10px'}} className={'text'}><p>Здесь Вы можете посмотреть и создать протоколы и назначения дополнительных коэфициэнтов трудового участия.</p></div>
            <div className="ogmlist_btns ktudoc">
                <div className="select_block_title">Сотрудники</div>
                <div className={`select`}><MultiSelect options={users} values={group} setOptions={setGroup} empty={createEmpty} /></div>
                <div className={`buttons`}>
                    <div onClick={(e) => createHandler()} style={{borderRadius:'10px'}} className="ogmlist_upload">Создать</div>
                    <div onClick={(e) => saveHandler()} style={{borderRadius:'10px'}} className="ogmlist_upload">Сохранить</div>
                </div>
            </div>

            <div className="ogmlist_list">
                <div className="ogmlist_list_line small">
                    <div className="ogmlist_list_line_price w50 title">№</div>
                    <div className="ogmlist_list_line_price w150 title">ФИО</div>
                    <div className="ogmlist_list_line_group w150 title">Должность</div>
                    <div className="ogmlist_list_line_group w100 title">Обьект</div>
                    <div className="ogmlist_list_line_group w100 title">Дата</div>
                    <div className="ogmlist_list_line_group title">Содержание</div>
                    <div className="ogmlist_list_line_group w150 title">Установил</div>
                    <div className="ogmlist_list_line_group w50 title">КТУ</div>
                    <div className="ogmlist_list_line_group w50 title borderrightnone">%</div>
                </div>
                {ktus && ktus.map((item,index) => (
                    <div key={index} className="ogmlist_list_line bordertopnone">
                        <div className={`ogmlist_list_line_price w50`}>{item.id}</div>
                        <div className="ogmlist_list_line_price w150">{item.name}</div>
                        <div className="ogmlist_list_line_group w150">{item.developer}</div>
                        <input className={`ogmlist_list_line_group w100 inputs ${empty[index*4] && 'red-solid-border'}`} onChange={(e) => changeShifrHandler(e.target.value,index)} value={item.shifr ? item.shifr : ''}/>
                        <TableDatePicker size={'120px'} onChange={changeDateHandler} empty={empty[index*4+1]} index={index} value={item.ktudate ? item.ktudate : ''} placeholder={item.ktudate ? item.ktudate : ''}/>
                        <input className={`ogmlist_list_line_group inputs leftborder ${empty[index*4+2] && 'red-solid-border'}`} onChange={(e) => changeContentHandler(e.target.value,index)} value={item.content ? item.content : ''}/>
                        <input className="ogmlist_list_line_group w150 inputs" onChange={(e) => changeSzfromHandler(e.target.value,index)} value={item.szfrom ? item.szfrom : ''}></input>
                        <KtuInput classes={`ogmlist_list_line_group w50 inputs`} setValue={changeKtuHandler} index={index} value={item.ktu!=null ? item.ktu : ''}/>
                        <div className="ogmlist_list_line_price w50 borderrightnone">{ item.ktu!==null ? (parseFloat(item.ktu) - 1).toFixed(2)*100 : ''}</div>
                        { (rule === 9 || store.user.account === 'superadmin') && <div onClick={() => deleteHandler(index)} className="ogmlist_list_line_del"><i className="fa-solid fa-xmark"></i></div>}
                    </div>
                ))}

            </div>

            <ModalFiles data={<Delete />} active={activeDelete} setActive={setActiveDelete}/>
        </div>
    )
}

export default observer(KtuListPage)