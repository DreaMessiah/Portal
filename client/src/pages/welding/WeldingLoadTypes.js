import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import "../econom/ogm.scss"

import {useMessage} from "../../hooks/message.hook";
import {useNavigate} from "react-router-dom";
import ReferenceService from "../../services/ReferenceService";
import isNumeric from "../../components/functions/isNumeric";
import ModalFiles from "../../components/modalwin/ModalFiles";
import * as XLSX from 'xlsx';
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import WeldingService from "../../services/WeldingService";

function WeldingLoadTypes(){
    const [types,setTypes] = useState([])
    const [loading,setLoading] = useState(false)
    const [onSave,setOnSave] = useState(false)

    const fileRef = useRef(null)

    const {store} = useContext(Context)
    const message = useMessage()
    const navigate = useNavigate()

    const handleFileUpload = async (e) => {
        setLoading(true)
        try {
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = async (event) => {
                const binaryString = event.target.result
                const workbook = XLSX.read(binaryString, { type: 'binary'})
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

                const json = rows.map(item => {return {shifr:`${item[0]}`,viewname:`${item[1]}`,volume:+item[2],unit:`${item[3]}`,norma:`${item[4]}`,inn:store.user.inn}})
                console.log(json)
                if(json.length){
                    setOnSave(true)
                    setTypes(json)
                }else {
                    message('Не корректный формат файла для загрузки')
                    setTypes([])
                    setOnSave(false)
                }
            }
            reader.readAsBinaryString(file)
            e.target.value = null;
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const saveHandler = async () => {
        setLoading(true)
        try {
            if(onSave && types.length){
                const {data} = await WeldingService.setWorksTypes(types)
                if(data){
                    message('Таблица обновлена')
                    setOnSave(false)
                    setTypes([])
                }
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
            setOnSave(false)
        }
    }
    const cancelHandler = () => {
        setOnSave(false)
        setTypes([])
    }

    return (
        <div className="ogmlist">
            <div className="ogmlist_title">Загрузка видов сварочных работ</div>
            <div className={'text'}><p>Выберите файл ecxel, без заголовка, содержащий список видов работ для определненного шифра объкта(5 столбцов - шифр - имя - обьем - ед.изм - норма)</p><p>Обратите внимание: при загрузке действующие виды для данного шифра объекта будут удалены!</p></div>
            <div className="ogmlist_btns">
                <div onClick={(e) => fileRef.current.click()} className="ogmlist_upload">Загрузить список</div>
                <input onChange={(e) => handleFileUpload(e)} ref={fileRef} className='hidden-upload' type='file'/>
                <div onClick={(e) => saveHandler()} className={`ogmlist_upload ${!onSave && 'disable'}`}>Сохранить</div>
                <div onClick={(e) => cancelHandler()} className={`ogmlist_upload red ${!onSave && 'disable'}`}>Очистить</div>
            </div>
            <div className="ogmlist_list">
                <div className={`title`}>Предпросмотр {types.length && types[0].shifr ? 'видов работ по ' + types[0].shifr +' обьекту' : ''}</div>
                <div className="ogmlist_list_line">
                    <div className="ogmlist_list_line_name nametitle">Шифр</div>
                    <div className="ogmlist_list_line_price title">Имя</div>
                    <div className="ogmlist_list_line_group title">Объем</div>
                    <div className="ogmlist_list_line_cropname title ">Ед.Изм</div>
                    <div className="ogmlist_list_line_cropname title borderrightnone">Норма</div>
                </div>
                {types.length>0 && types.map((item,index) => (
                    <span key={index}>
                        <div className="ogmlist_list_line bordertopnone">
                            <div className="ogmlist_list_line_name">{item.shifr}</div>
                            <div className={`ogmlist_list_line_price inputs`} >{item.viewname}</div>
                            <div className="ogmlist_list_line_group inputs" >{item.volume}</div>
                            <div className="ogmlist_list_line_group inputs">{item.unit}</div>
                            <div className="ogmlist_list_line_cropname inputs">{item.norma}</div>
                        </div>
                    </span>
                ))}
            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </div>
    )
}

export default observer(WeldingLoadTypes)