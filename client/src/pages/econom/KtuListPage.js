import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import "./ogm.scss"

import {useMessage} from "../../hooks/message.hook";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ReferenceService from "../../services/ReferenceService";
import isNumeric from "../../components/functions/isNumeric";
import ModalFiles from "../../components/modalwin/ModalFiles";
import * as XLSX from 'xlsx';
import CmsSelect from "../../components/inputs/CmsSelect";
import Select from "react-select";
import {DataContext} from "../../context/DataContext";
import TextInput from "../../components/inputs/TextInput";
import formatDate from "../../components/functions/formatDate";
import TasksService from "../../services/TasksService";
import MultiSelect from "../../components/inputs/MultiSelect";

function KtuListPage(){

    const location = useLocation()
    const [users,setUsers] = useState([])
    const [group,setGroup] = useState([])

    const [ktus,setKtus] = useState([])
    const [activeDelete,setActiveDelete] = useState(false)
    const [deleteIndex,setDeleteIndex] = useState(-1)

    const [empty,setEmpty] = useState([])

    const {store} = useContext(Context)
    const message = useMessage()
    const navigate = useNavigate()
    const loadingHandler = async (id) => {
        try {
            //const ktuslist = await ReferenceService.fetchKtus(id)
            const users = await TasksService.fetchUsers()

            //if(ktuslist.data) setKtus(ktuslist.data)
            if(users.data) setUsers(users.data)
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const getId = searchParams.get('id') ? searchParams.get('id') : 0
        console.log(getId)
        loadingHandler(getId)
    }, [location])

    const changeShifrHandler = () => {

    }
    const changeDateHandler = () => {

    }
    const changeContentHandler = () => {

    }
    const changeKtuHandler = () => {

    }
    const changePercentHandler = () => {

    }

    const createHandler = () => {
        let newKtus = [...ktus]
        group.map(item => {
            console.log(item)
            const fio = item.label.split('/')
            newKtus = ([...newKtus,{id:'new',user_tn:item.value,name:fio[0],developer:fio[1],from_tn:store.user.full_name}])
            setGroup([])
        })
        setKtus(newKtus)
    }
    const saveHandler = async (index) => {
        try {

        }catch (e) {
            console.log(e)
        }
    }
    const goToHandler = (index) => {
        //navigate(`/ktulist?id=${ktuDocs[index].id}`)
    }
    const deleteHandler = (index) => {
        setDeleteIndex(index)
        setActiveDelete(true)
    }
    function Delete() {
        const removeHandler = async () => {
            try{
                // const response = await ReferenceService.delKtuDoc(ktuDocs[deleteIndex].id)
                // console.log(response.data)
                // if(response.data.del) {
                //     message(response.data.message)
                //     const newKtuDoc = [...ktuDocs]
                //     newKtuDoc.splice(deleteIndex, 1)
                //     setKtuDocs(newKtuDoc)
                //     exitDeleteHandler()
                // }
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
                    {/*<h4>Вы действительно хотели бы удалить документ {deleteIndex >= 0 && ktuDocs[deleteIndex].id+' от '+formatDate(ktuDocs[deleteIndex].createdAt)}</h4>*/}
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
            <div onClick={(e) => console.log(123)} className="ogmlist_title">Дополнительные протоколы КТУ</div>
            <div style={{marginBottom:'10px'}} className={'text'}><p>Здесь Вы можете посмотреть и создать протоколы и назначения дополнительных коэфициэнтов трудового участия.</p></div>
            <div className="ogmlist_btns ktudoc">
                <div className="select_block_title">Сотрудники</div>
                <div className={`select`}><MultiSelect options={users} values={group} setOptions={setGroup} empty={empty[5]} /></div>
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
                    <div className="ogmlist_list_line_group w150 title">Создатель</div>
                    <div className="ogmlist_list_line_group w100 title">Обьект</div>
                    <div className="ogmlist_list_line_group w50 title">Дата</div>
                    <div className="ogmlist_list_line_group title">Содержание</div>
                    <div className="ogmlist_list_line_group w50 title">КТУ</div>
                    <div className="ogmlist_list_line_group w50 title borderrightnone">%</div>
                </div>
                {ktus && ktus.map((item,index) => (
                    <div key={index} className="ogmlist_list_line bordertopnone">
                        <div className="ogmlist_list_line_price w50">{item.id}</div>
                        <div className="ogmlist_list_line_price w150">{item.name}</div>
                        <div className="ogmlist_list_line_group w150">{item.developer}</div>
                        <div className="ogmlist_list_line_group w150">{item.from_tn}</div>
                        <input className={`ogmlist_list_line_group w100 inputs `} onChange={(e) => changeShifrHandler(e.target.value,index)} value={item.shifr}/>
                        <input className={`ogmlist_list_line_group w50 inputs `} onChange={(e) => changeDateHandler(e.target.value,index)} value={item.date}/>
                        <input className={`ogmlist_list_line_group inputs `} onChange={(e) => changeContentHandler(e.target.value,index)} value={item.prefix}/>


                        <input className={`ogmlist_list_line_group w50 inputs `} onChange={(e) => changeDateHandler(e.target.value,index)} value={item.ktu}/>
                        <div className="ogmlist_list_line_price w50 borderrightnone">{item.ktu ? item.ktu*100 : ''}</div>
                        {rule ===3 && <div onClick={() => deleteHandler(index)} className="ogmlist_list_line_del"><i className="fa-solid fa-xmark"></i></div>}
                    </div>
                ))}

            </div>

            <ModalFiles data={<Delete />} active={activeDelete} setActive={setActiveDelete}/>
        </div>
    )
}

export default observer(KtuListPage)