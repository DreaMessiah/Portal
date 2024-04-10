import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import "./ogm.scss"

import {useMessage} from "../../hooks/message.hook";
import {useNavigate} from "react-router-dom";
import ReferenceService from "../../services/ReferenceService";
import isNumeric from "../../components/functions/isNumeric";
import PollsService from "../../services/PollsService";
import ModalFiles from "../../components/modalwin/ModalFiles";
import * as XLSX from 'xlsx';

function T13Page(){
    const [ogmPrices,setOgmPrices] = useState([])
    const [ogmPricesOld,setOgmPricesOld] = useState([])
    const [activeDelete,setActiveDelete] = useState(false)
    const [deleteIndex,setDeleteIndex] = useState(-1)
    const [ifChanges,setIfChanges] = useState(false)

    const [name,setName] = useState('')
    const [price,setPrice] = useState('')
    const [group,setGroup] = useState('')
    const [prefix,setPrefix] = useState('')

    const [excelData ,setExcelData] = useState([])
    const fileRef = useRef(null)

    const [empty,setEmpty] = useState([])
    const [onPrice,setOnPrice] = useState([])

    const {store} = useContext(Context)
    const message = useMessage()
    const navigate = useNavigate()

    const loadingHandler = async () => {
        try {
            const ogm = await ReferenceService.getOgm()
            if(ogm.data) {
                setOgmPrices(ogm.data.map(item => ({ ...item })))
                setOgmPricesOld(ogm.data.map(item => ({ ...item })))
            }
        }catch (e) {
            console.log(e)
        }
    }
    const checkEmpty = () => {
        const n = [...empty]

        n[0] = !!!name.trim().length
        n[1] = !!!price.trim().length
        n[2] = !!!group.trim().length
        n[3] = !!!prefix.trim().length

        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const checkChange = () => {
        const n = [...onPrice]
        ogmPrices.map((item,index) => {
            n[index] = !!!item.price
        })
        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setOnPrice(n)
        else setOnPrice([])
        return hasTrueValue
    }
    useEffect(() => {
        loadingHandler()
    },[])
    useEffect(() => {
        if (JSON.stringify(ogmPricesOld) === JSON.stringify(ogmPrices)) {
            setIfChanges(false)
        } else {
            setIfChanges(true)
        }
    },[ogmPrices])
    useEffect(() => {
        if(empty.length) checkEmpty()
    },[name,price,group,prefix])
    const changePriceHandler = (value,index) => {
        if(isNumeric(value)){
            const newOgms = [...ogmPrices]
            newOgms[index].price = value
            setOgmPrices(newOgms)
        }
    }
    const changeGroupHandler = (value,index) => {
        const newOgms = [...ogmPrices]
        newOgms[index].group = value
        setOgmPrices(newOgms)
    }
    const changePrefixHandler = (value,index) => {
        const newOgms = [...ogmPrices]
        newOgms[index].prefix = value
        setOgmPrices(newOgms)
    }

    const saveHandler = async () => {
        try {
            if(ifChanges){
                if(!checkChange()){
                    const response = await ReferenceService.saveOgm(ogmPrices)
                    if(response.data){
                        message('Тарифы обновлены')
                        loadingHandler()
                    }
                }else{
                    message('Поле стоимости не может быть пустым')
                }
            }
        }catch (e) {
            console.log(e)
        }
    }
    const createHandler = async () => {
        try {
            if(!checkEmpty()){
                const ogm = {name:name,price:+price,group:group,prefix:prefix,inn:store.user.inn}
                const response = await ReferenceService.createOgm(ogm)
                if(response.data){
                    message('Тариф добавлен')
                    loadingHandler()
                    setName('')
                    setPrice('')
                    setGroup('')
                    setPrefix('')
                }
            }else{
                message('Заполните все поля')
            }

        }catch (e) {
            console.log(e)
        }
    }
    const deleteHandler = (index) => {
        setActiveDelete(true)
        setDeleteIndex(index)
    }

    const handleFileUpload = async (e) => {
        try{
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = async (event) => {
                const binaryString = event.target.result
                const workbook = XLSX.read(binaryString, { type: 'binary' })
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
                const fd = rows.filter(row => row.length === 4)
                const json = fd.map(item => {return {name:item[0],price:item[1],group:item[2],prefix:item[3]}})

                const response = await ReferenceService.loadOgm(json)

                if(response.data){
                    setOgmPrices(response.data)
                    message('Тарифы загружены')
                }

            }
            reader.readAsBinaryString(file)
        }catch (e) {
            console.log(e)
        }
    }

    function Delete() {
        const removeHandler = async () => {
            try{
                const response = await ReferenceService.deleteOgm(ogmPrices[deleteIndex].id)
                console.log(response.data)
                if(response.data.del) {
                    message('Тариф удален')
                    const newOgm = [...ogmPrices]
                    newOgm.splice(deleteIndex, 1)
                    setOgmPrices(newOgm)
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
                    <h4>Вы действительно хотели бы удалить тариф {deleteIndex >= 0 && ogmPrices[deleteIndex].name}</h4>
                    <div className='buttons'>
                        <div onClick={() => removeHandler()} className='button da'>Да</div>
                        <div onClick={() => exitDeleteHandler()} className='button'>Нет</div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="ogmlist">
            <div className="ogmlist_title">Таблица Т13</div>
            <div className={'text'}><p>Выберите файл ecxel, без заголовка, содержащий список ставок</p><p>Обратите внимание: при загрузке действующие ставки будут удалены!</p></div>
            <div className="ogmlist_btns">
                <div onClick={(e) => fileRef.current.click()} className="ogmlist_upload">Загрузить список</div>
                <input onChange={(e) => handleFileUpload(e)} ref={fileRef} className='hidden-upload' type='file'/>
                <div onClick={(e) => saveHandler()} className={`ogmlist_save ${!ifChanges && 'disable'}`}>Сохранить</div>
            </div>
            {/*Транспорт	Стоимость водителя	Группа транспорта	Сокр. название*/}
            <div className="ogmlist_list">
                <div className="ogmlist_list_line">
                    <div className="ogmlist_list_line_name nametitle">Транспорт</div>
                    <div className="ogmlist_list_line_price title">Стоимость</div>
                    <div className="ogmlist_list_line_group title">Группа</div>
                    <div className="ogmlist_list_line_cropname title borderrightnone">Сокр. название</div>
                </div>
                {ogmPrices && ogmPrices.map((item,index) => (
                    <div key={index} className="ogmlist_list_line bordertopnone">
                        <div className="ogmlist_list_line_name">{item.name}</div>
                        <input className={`ogmlist_list_line_price inputs ${onPrice[index] && 'red-solid-border'}`} onChange={(e) => changePriceHandler(e.target.value,index)} value={item.price}/>
                        <input className="ogmlist_list_line_group inputs" onChange={(e) => changeGroupHandler(e.target.value,index)} value={item.group}/>
                        <input className="ogmlist_list_line_cropname inputs" onChange={(e) => changePrefixHandler(e.target.value,index)} value={item.prefix}/>
                        <div onClick={(e) => deleteHandler(index)} className="ogmlist_list_line_del"><i className="fa-solid fa-xmark"></i></div>
                    </div>
                ))}
            </div>
            <div className="newlineogm">
                <div className="line">
                    <input className={`ogmlist_list_line_new ${empty[0] && 'red-solid-border'}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Наименование транспорта"/>
                    <input className={`ogmlist_list_line_new ${empty[1] && 'red-solid-border'}`} value={price} onChange={(e) => {if(isNumeric(e.target.value)) setPrice(e.target.value)}} placeholder="Ставка, руб"/>
                    <input className={`ogmlist_list_line_new ${empty[2] && 'red-solid-border'}`} value={group} onChange={(e) => setGroup(e.target.value)} placeholder="Группа транспорта"/>
                    <input className={`ogmlist_list_line_new ${empty[3] && 'red-solid-border'}`} value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="Сокр.наименование"/>
                </div>
                <div className="line">
                    <div  className="line_title">Добавить транспорт</div>
                    <div onClick={(e) => createHandler()} className="ogmlist_plus">Добавить</div>
                </div>
            </div>


            <ModalFiles data={<Delete />} active={activeDelete} setActive={setActiveDelete}/>
        </div>
    )
}

export default observer(T13Page)