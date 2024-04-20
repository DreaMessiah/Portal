import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import "./ogm.scss"

import {useMessage} from "../../hooks/message.hook";
import {useNavigate} from "react-router-dom";
import ReferenceService from "../../services/ReferenceService";
import * as XLSX from 'xlsx';
import {DataContext} from "../../context/DataContext";

function LoadPayslip(){
    const [payslip,setPayslip] = useState([])
    const [selectedItem,setSelectedItem] = useState(-1)
    const [onSave,setOnSave] = useState(false)
    const fileRef = useRef(null)

    const {store} = useContext(Context)
    const message = useMessage()

    const loadingHandler = async () => {
        try {
            //const t = await ReferenceService.getT13()
            //if(t.data) {
            //setT13(t.data.map(item => ({ ...item })))
            //}
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadingHandler()
    },[])

    const handleFileUpload = async (e) => {
        try{
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = async (event) => {
                const binaryString = event.target.result
                const workbook = XLSX.read(binaryString, { type: 'binary'})
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

                const json = rows.map(item => {return {month:item[0],year:item[1],type:item[2],name:item[3],tn:item[4],cost:item[5],days:item[6],uchet:item[7],stazh:item[8],inn:store.user.inn,held:item[9],payments:item[10],total:item[11]}})
                if(json.length){
                    setOnSave(true)
                    setPayslip(json)
                }else {
                    message('Не корректный формат файла для загрузки')
                    setPayslip([])
                    setOnSave(false)
                }
            }
            reader.readAsBinaryString(file)
            e.target.value = null;
        }catch (e) {
            console.log(e)
        }
    }
    const saveHandler = async () => {
        try {
            if(onSave && payslip.length){
                console.log()
                const {data} = await ReferenceService.setPayslip(payslip)
                if(data){
                    console.log(data)
                    message('Таблица обновлена')
                    setOnSave(false)
                    setPayslip([])
                }
            }
        }catch (e) {
            console.log(e)
        }
    }
    const cancelHandler = () => {
        setPayslip([])
        setOnSave(false)
    }
    return (
        <div className="ogmlist">
            <div className="ogmlist_title">Таблица загрузки расчетного листа</div>
            <div className={'text'}><p>Выберите файл CSV содержащий расчетные листы для работников.</p><p>Обратите внимание: при загрузке данные текущего месяца в базе данных будут заменены!</p></div>
            <div className={`control-panel`}>
                <div className="ogmlist_btns">
                    <div onClick={(e) => fileRef.current.click()} className="ogmlist_upload">Загрузить список</div>
                    <input onChange={(e) => handleFileUpload(e)} ref={fileRef} className='hidden-upload' type='file'/>
                    <div onClick={(e) => saveHandler()} className={`ogmlist_upload ${!onSave && 'disable'}`}>Сохранить</div>
                    <div onClick={(e) => cancelHandler()} className={`ogmlist_upload red ${!onSave && 'disable'}`}>Очистить</div>
                </div>
            </div>
            <div className="ogmlist_list">
                <div className={`title`}>Предпросмотр {payslip.length && payslip[0].month ? '- за '+payslip[0].month+' месяц - ' + payslip[0].type: ''}</div>
                <div className="ogmlist_list_line">
                    <div className="ogmlist_list_line_name nametitle">Период</div>
                    <div className="ogmlist_list_line_price title">Имя</div>
                    <div className="ogmlist_list_line_group title">Табельный номер</div>
                    <div className="ogmlist_list_line_cropname title borderrightnone">ИНФО</div>
                </div>
                {payslip.length>0 && payslip.map((item,index) => (
                    <span key={index}>
                        <div className="ogmlist_list_line bordertopnone">
                            <div className="ogmlist_list_line_name">{item.month + ' ' + item.year}</div>
                            <div className={`ogmlist_list_line_price inputs`} >{item.name}</div>
                            <div className="ogmlist_list_line_group inputs" >{item.tn}</div>
                            <div onClick={(e) => setSelectedItem(selectedItem === index ? -1 : index)} style={{justifyContent:'center',alignItems:"center"}} className="ogmlist_list_line_cropname button">Показать информацию</div>
                        </div>
                        {selectedItem === index ?
                            <div className={`dop-info`}>
                                <div className="table-container">
                                    <div className="table">
                                        <div className="rowsmall header">
                                            <div className="cell wide-column">Тип</div>
                                            <div className="cell wide-column">Коэфициент</div>
                                            <div className="cell middle-column">Количество дней</div>
                                            <div className="cell big-column">Ставка</div>
                                            <div className="cell big-column">Удержания</div>
                                            <div className="cell big-column">К Оплате</div>
                                            <div className="cell wide-column">Всего</div>
                                        </div>
                                        <div className="rowsmall">
                                            <div className="cell wide-column">{item.type}</div>
                                            <div className="cell wide-column">{item.cost}</div>
                                            <div className="cell middle-column">{item.days}</div>
                                            <div className="cell big-column">{item.stazh.replace(/<\/?[^>]+(>|$)/g, "")}</div>
                                            <div className="cell big-column">{item.held.replace(/<\/?[^>]+(>|$)/g, "")}</div>
                                            <div className="cell big-column">{item.payments.replace(/<\/?[^>]+(>|$)/g, "")}</div>
                                            <div className="cell wide-column">{item.total.replace(/<\/?[^>]+(>|$)/g, "")}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :null}
                    </span>

                ))}
            </div>
        </div>
    )
}

export default observer(LoadPayslip)