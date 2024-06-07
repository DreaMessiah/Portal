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


function KtuListRead(){
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
            <tbody>
            <table  style={{cellSpacing: "0", cellPadding: "0", emptyCells: '0'}}>
                <tr className="ogmlist_list_line small">
                    <th style={{border: '1px solid #000'}} className="ogmlist_list_line_price w50 title">№</th>
                    <th style={{border: '1px solid #000'}} className="ogmlist_list_line_price w150 title">ФИО</th>
                    <th style={{border: '1px solid #000'}} className="ogmlist_list_line_group w150 title">Должность</th>
                    <th style={{border: '1px solid #000'}} className="ogmlist_list_line_group w150 title">Установил</th>
                    <th style={{border: '1px solid #000'}} className="ogmlist_list_line_group w100 title">Обьект</th>
                    <th style={{border: '1px solid #000'}} className="ogmlist_list_line_group w100 title">Дата</th>
                    <th style={{border: '1px solid #000'}} className="ogmlist_list_line_group title">Содержание</th>
                    <th style={{border: '1px solid #000'}} className="ogmlist_list_line_group w150 title">Установил</th>
                    <th style={{border: '1px solid #000'}} className="ogmlist_list_line_group w50 title">КТУ</th>
                    {/*<th style={{border: '1px solid #000'}} className="ogmlist_list_line_group w50 title borderrightnone">%</th>*/}
                </tr>
                {ktus && ktus.map((item,index) => (
                <tr key={index} className="ogmlist_list_line bordertopnone">
                    <td style={{border: '1px solid #000'}} className={`ogmlist_list_line_price w50`}>{item.id}</td>
                    <td style={{border: '1px solid #000'}} className="ogmlist_list_line_price w150">{item.name}</td>
                    <td style={{border: '1px solid #000'}} className="ogmlist_list_line_group w150">{item.developer}</td>
                    <td style={{border: '1px solid #000'}} className="ogmlist_list_line_group w100" >{item.shifr ? item.shifr : ''}</td>
                    <td style={{border: '1px solid #000'}} className="ogmlist_list_line_group w100">{item.ktudate ? item.ktudate.split('T')[0].split('-').reverse().join('-') : ''}</td>
                    <td style={{border: '1px solid #000'}} className="ogmlist_list_line_group inputs" >{item.content ? item.content : ''}</td>
                    <td style={{border: '1px solid #000'}} className="ogmlist_list_line_group w150 inputs">{item.szfrom ? item.szfrom : ''}</td>
                    <td style={{border: '1px solid #000'}} className={`ogmlist_list_line_group w50 inputs`} >{item.ktu!=null ? item.ktu : ''}</td>
                    <td style={{border: '1px solid #000'}} className="ogmlist_list_line_price w50">{ item.ktu!==null ? (parseFloat(item.ktu) - 1).toFixed(2)*100 : ''}</td>
                </tr>
                ))}
            </table>
            </tbody>

        </div>
    )
}

export default observer(KtuListRead)