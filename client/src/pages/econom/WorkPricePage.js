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

function WorkPricePage(){
    const [workPrices,setWorkPrices] = useState([])
    const [workPricesOld,setWorkPricesOld] = useState([])
    const [activeDelete,setActiveDelete] = useState(false)
    const [deleteIndex,setDeleteIndex] = useState(-1)
    const [ifChanges,setIfChanges] = useState(false)

    const [name,setName] = useState('')
    const [tariff,setTariff] = useState('')
    const [price,setPrice] = useState('')
    const [position,setPosition] = useState('')
    const [comment,setComment] = useState('')
    const [prefix,setPrefix] = useState('')

    const fileRef = useRef(null)

    const [empty,setEmpty] = useState([])
    const [onPrice,setOnPrice] = useState([])

    const {store} = useContext(Context)
    const message = useMessage()
    const navigate = useNavigate()

    const loadingHandler = async () => {
        try {
            const works = await ReferenceService.getWorks()
            if(works.data) {
                setWorkPrices(works.data.map(item => ({ ...item })))
                setWorkPricesOld(works.data.map(item => ({ ...item })))
            }
        }catch (e) {
            console.log(e)
        }
    }
    const checkEmpty = () => {
        const n = [...empty]

        n[0] = !!!name.trim().length
        n[1] = !!!tariff.trim().length
        n[2] = !!!price.trim().length
        n[3] = !!!position.trim().length
        n[4] = !!!comment.trim().length
        n[5] = !!!prefix.trim().length

        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const checkChange = () => {
        const n = [...onPrice]
        workPrices.map((item,index) => {
            n[index] = !!!item.tariff
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
        console.log(workPrices)
        if (JSON.stringify(workPricesOld) === JSON.stringify(workPrices)) {
            setIfChanges(false)
        } else {
            setIfChanges(true)
        }
    },[workPrices])
    useEffect(() => {
        if(empty.length) checkEmpty()
    },[name,price,tariff,position,comment,prefix])

    const changeTariffHandler = (value,index) => {
        const newPrice = [...workPrices]
        newPrice[index].tariff = value
        setWorkPrices(newPrice)
    }
    const changePriceHandler = (value,index) => {
        if(isNumeric(value)){
            const newPrice = [...workPrices]
            newPrice[index].price = value
            setWorkPrices(newPrice)
        }
    }
    const changePositionHandler = (value,index) => {
        const newPrice = [...workPrices]
        newPrice[index].position = value
        setWorkPrices(newPrice)
    }
    const changeCommentHandler = (value,index) => {
        const newPrice = [...workPrices]
        newPrice[index].comment = value
        setWorkPrices(newPrice)
    }
    const changePrefixHandler = (value,index) => {
        const newPrice = [...workPrices]
        newPrice[index].prefix = value
        setWorkPrices(newPrice)
    }

    const saveHandler = async () => {
        try {
            if(ifChanges){
                if(!checkChange()){
                    const response = await ReferenceService.saveWorks(workPrices)
                    if(response.data){
                        message('Тарифы обновлены')
                        loadingHandler()
                    }
                }else{
                    message('Поля тарифа,стоимости и отдела не могут быть пустым')
                }
            }
        }catch (e) {
            console.log(e)
        }
    }
    const createHandler = async () => {
        try {
            if(!checkEmpty()){
                const work = {name:name,tariff:tariff,price:+price,position:position,comment:comment,prefix:prefix,inn:store.user.inn}
                const response = await ReferenceService.createWorks(work)
                if(response.data){
                    message('Тариф добавлен')
                    loadingHandler()
                    setName('')
                    setPrice('')
                    setPosition('')
                    setTariff('')
                    setPrefix('')
                    setComment('')
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
                const json = rows.map(item => {return {name:item[0] ? item[0] : '',tariff:item[1] ? item[1] : '',price:item[2] ? item[2] : '',position:item[3] ? item[3] : '',comment:item[4] ? item[4] : '',prefix:item[5] ? item[5] : ''}})

                const response = await ReferenceService.loadWorks(json)
                if(response.data){
                    setWorkPrices(response.data)
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
                const response = await ReferenceService.deleteWorks(workPrices[deleteIndex].id)
                console.log(response.data)
                if(response.data.del) {
                    message('Тариф удален')
                    const newPrice = [...workPrices]
                    newPrice.splice(deleteIndex, 1)
                    setWorkPrices(newPrice)
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
                    <h4>Вы действительно хотели бы удалить тариф {deleteIndex >= 0 && workPrices[deleteIndex].name}</h4>
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
            <div className="ogmlist_title">Список и тарифы рабочим</div>
            <div className={'text'}><p>Выберите файл ecxel, без заголовка, содержащий список ставок</p><p>Обратите внимание: при загрузке действующие ставки будут удалены!</p></div>
            <div className="ogmlist_btns">
                <div onClick={(e) => fileRef.current.click()} className="ogmlist_upload">Загрузить список</div>
                <input onChange={(e) => handleFileUpload(e)} ref={fileRef} className='hidden-upload' type='file'/>
                <div onClick={(e) => saveHandler()} className={`ogmlist_save ${!ifChanges && 'disable'}`}>Сохранить</div>
            </div>
            {/*Транспорт	Стоимость водителя	Группа транспорта	Сокр. название*/}
            <div className="ogmlist_list">
                <div className="ogmlist_list_line">
                    <div className="ogmlist_list_line_name nametitle">Должность</div>
                    <div style={{width:'100px'}} className="ogmlist_list_line_name title">Тариф</div>
                    <div style={{width:'100px'}} className="ogmlist_list_line_name title">Ставка</div>
                    <div className="ogmlist_list_line_name nametitle">Отдел</div>
                    <div className="ogmlist_list_line_group title">Комментарий</div>
                    <div className="ogmlist_list_line_cropname title borderrightnone">Сокр. название</div>
                </div>
                {workPrices && workPrices.map((item,index) => (
                    <div key={index} className="ogmlist_list_line bordertopnone">
                        <div  className="ogmlist_list_line_name">{item.name}</div>
                        <input style={{width:'80px'}} className={`ogmlist_list_line_price inputs ${onPrice[index] && 'red-solid-border'}`} onChange={(e) => changeTariffHandler(e.target.value,index)} value={item.tariff}/>
                        <input style={{width:'80px'}} className="ogmlist_list_line_group inputs" onChange={(e) => changePriceHandler(e.target.value,index)} value={item.price}/>
                        <input className="ogmlist_list_line_group inputs" onChange={(e) => changePositionHandler(e.target.value,index)} value={item.position}/>
                        <input className="ogmlist_list_line_group inputs" onChange={(e) => changeCommentHandler(e.target.value,index)} value={item.comment}/>
                        <input className="ogmlist_list_line_cropname inputs" onChange={(e) => changePrefixHandler(e.target.value,index)} value={item.prefix}/>
                        <div onClick={(e) => deleteHandler(index)} className="ogmlist_list_line_del"><i className="fa-solid fa-xmark"></i></div>
                    </div>
                ))}
            </div>
            <div className="newlineogm">
                <div className="line">
                    <input className={`ogmlist_list_line_new ${empty[0] && 'red-solid-border'}`} value={name} onChange={(e) => setName(e.target.value)} placeholder="Должность"/>
                    <input className={`ogmlist_list_line_new small ${empty[1] && 'red-solid-border'}`} value={tariff} onChange={(e) => setTariff(e.target.value)} placeholder="Тариф"/>
                    <input className={`ogmlist_list_line_new small ${empty[2] && 'red-solid-border'}`} value={price} onChange={(e) => {if(isNumeric(e.target.value)) setPrice(e.target.value)}} placeholder="Ставка, руб"/>
                    <input className={`ogmlist_list_line_new ${empty[3] && 'red-solid-border'}`} value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Отдел"/>
                    <input className={`ogmlist_list_line_new ${empty[4] && 'red-solid-border'}`} value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Комментарий"/>
                    <input className={`ogmlist_list_line_new ${empty[5] && 'red-solid-border'}`} value={prefix} onChange={(e) => setPrefix(e.target.value)} placeholder="Сокр.наименование"/>
                </div>
                <div className="line">
                    <div  className="line_title">Добавить тариф</div>
                    <div onClick={(e) => createHandler()} className="ogmlist_plus">Добавить</div>
                </div>
            </div>


            <ModalFiles data={<Delete />} active={activeDelete} setActive={setActiveDelete}/>
        </div>
    )
}

export default observer(WorkPricePage)