import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import "./ogm.scss"

import {useMessage} from "../../hooks/message.hook";
import {useNavigate} from "react-router-dom";
import ReferenceService from "../../services/ReferenceService";
import * as XLSX from 'xlsx';
import {DataContext} from "../../context/DataContext";

function T13Page(){
    const {getMonthName,optionsMonth,optionsYear} = useContext(DataContext)

    const getNowMonthNum = () => {
        const currentDate = new Date();
        return currentDate.getMonth()
    }

    const [t13,setT13] = useState([])
    const [monthState,setMonthState] = useState(optionsMonth[getNowMonthNum()])
    const [yearState,setYearState] = useState(optionsYear[2])
    const [selectedItem,setSelectedItem] = useState(-1)
    const [onSave,setOnSave] = useState(false)
    const fileRef = useRef(null)

    const {store} = useContext(Context)
    const message = useMessage()
    const navigate = useNavigate()

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

    function convertNumberToDate(excelDate) {
        if( !isNaN(excelDate) ){
            const msPerDay = 24 * 60 * 60 * 1000; // количество миллисекунд в одном дне
            const excelEpoch = new Date(Date.UTC(1899, 11, 30)); // дата начала эпохи в Excel
            // Переводим дни Excel в миллисекунды и добавляем к началу эпохи Excel
            const date = new Date(excelEpoch.getTime() + (excelDate) * msPerDay);
            let day = date.getDate().toString().padStart(2, '0')
            let month = (date.getMonth() + 1).toString().padStart(2, '0')
            let year = date.getFullYear()
            return `${day}.${month}.${year}`
        }
        return excelDate
    }

    const getMonthYear = (date) => {
        const stringDate = convertNumberToDate(date)
        const value = stringDate.split(".")
        return {month:optionsMonth[parseInt(value[1], 10) - 1].label,year:value[2]}
    }
    const handleFileUpload = async (e) => {
        try{
            const file = e.target.files[0]
            const reader = new FileReader()

            reader.onload = async (event) => {
                const binaryString = event.target.result
                const workbook = XLSX.read(binaryString, { type: 'binary'})
                const sheetName = workbook.SheetNames[0]
                const worksheet = workbook.Sheets[sheetName]
                const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }).filter((row, index) => index >= 13)
                const {month,year} = getMonthYear(worksheet['R4'].v)

                if(month){
                    const days = ['У','Б','ОТ','ОТ/У','ОД','ОЖ','Р','ДО','К']
                    const json = rows.map(item => {return item[1] ? {name:item[1],developer:item[3],branch:item[2],onboard:convertNumberToDate(item[7]),term:item[8] ? convertNumberToDate(item[8]) : '',document:'',tn:item[5],rk:'',groups:item[10],sn:item[11],status:'',gender:item[12],oklad:item[15],method:item[9],month:month,year:year,inn:store.user.inn,birthday:convertNumberToDate(item[13]),d1:days.includes(item[17]) ? item[17] : '',d2:days.includes(item[18]) ? item[18] : '',d3:days.includes(item[19]) ? item[19] : '',d4:days.includes(item[20]) ? item[20] : '',d5:days.includes(item[21]) ? item[21] : '',d6:days.includes(item[22]) ? item[22] : '',d7:days.includes(item[23]) ? item[23] : '',d8:days.includes(item[24]) ? item[24] : '',d9:days.includes(item[25]) ? item[25] : '',d10:days.includes(item[26]) ? item[26] : '',d11:days.includes(item[27]) ? item[27] : '',d12:days.includes(item[28]) ? item[28] : '',d13:days.includes(item[29]) ? item[29] : '',d14:days.includes(item[30]) ? item[30] : '',d15:days.includes(item[31]) ? item[31] : '',d16:days.includes(item[32]) ? item[32] : '',d17:days.includes(item[33]) ? item[33] : '',d18:days.includes(item[34]) ? item[34] : '',d19:days.includes(item[35]) ? item[35] : '',d20:days.includes(item[36]) ? item[36] : '',d21:days.includes(item[37]) ? item[37] : '',d22:days.includes(item[38]) ? item[38] : '',d23:days.includes(item[39]) ? item[39] : '',d24:days.includes(item[40]) ? item[40] : '',d25:days.includes(item[41]) ? item[41] : '',d26:days.includes(item[42]) ? item[42] : '',d27:days.includes(item[43]) ? item[43] : '',d28:days.includes(item[44]) ? item[44] : '',d29:days.includes(item[45]) ? item[45] : '',d30:days.includes(item[46]) ? item[46] : '',d31:days.includes(item[47]) ? item[47] : ''} : null})
                    const filteredJson = json.filter(item => item !== null)
                    console.log(filteredJson)
                    if(filteredJson.length){
                        setOnSave(true)
                        setT13(filteredJson)
                    }
                }else{
                    message('Не корректный формат файла для загрузки')
                    setT13([])
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
            if(onSave && t13.length){
                const response = await ReferenceService.setT13(t13)
                if(response.data){
                    setT13(response.data)
                    console.log(response.data)
                    message('Таблица обновлена')
                    setOnSave(false)
                    setT13([])
                }
            }
        }catch (e) {
            console.log(e)
        }
    }
    const cancelHandler = () => {
        setT13([])
        setOnSave(false)
    }
    return (
        <div className="ogmlist">
            <div className="ogmlist_title">Таблица Т13</div>
            <div className={'text'}><p>Выберите файл ecxel, без заголовка, содержащий отчет т13 из 1с.</p><p>Обратите внимание: при загрузке данные текущего месяца в базе данных будут заменены!</p></div>
            <div className={`control-panel`}>
                <div className="ogmlist_btns">
                    <div onClick={(e) => fileRef.current.click()} className="ogmlist_upload">Загрузить список</div>
                    <input onChange={(e) => handleFileUpload(e)} ref={fileRef} className='hidden-upload' type='file'/>
                    <div onClick={(e) => saveHandler()} className={`ogmlist_upload ${!onSave && 'disable'}`}>Сохранить</div>
                    <div onClick={(e) => cancelHandler()} className={`ogmlist_upload red ${!onSave && 'disable'}`}>Очистить</div>
                </div>
                {/*<div className={`select-month`}>*/}
                {/*    <div className='info between min300'>*/}
                {/*        <div className="select_block">*/}
                {/*            <div className="select_block_title">МЕСЯЦ</div>*/}
                {/*            <Select className='select' onChange={(e) => setMonthState(optionsMonth[e.value])} value={monthState} options={optionsMonth}/>*/}
                {/*        </div>*/}

                {/*        <div className="select_block">*/}
                {/*            <div className="select_block_title">ГОД</div>*/}
                {/*            <Select className='select' onChange={(e) => setYearState(optionsYear[e.value])} value={yearState} options={optionsYear}/>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
            <div className="ogmlist_list">
                <div className={`title`}>Предпросмотр {t13.length && t13[0].month ? '- за '+t13[0].month+' месяц': ''}</div>
                <div className="ogmlist_list_line">
                    <div className="ogmlist_list_line_name nametitle">ФИО</div>
                    <div className="ogmlist_list_line_price title">Табельный номер</div>
                    <div className="ogmlist_list_line_group title">Должность</div>
                    <div className="ogmlist_list_line_cropname title borderrightnone">ИНФО</div>
                </div>
                {t13.length>0 && t13.map((item,index) => (
                    <span key={index}>
                        <div className="ogmlist_list_line bordertopnone">
                            <div className="ogmlist_list_line_name">{item.name}</div>
                            <div className={`ogmlist_list_line_price inputs`} >{item.tn}</div>
                            <div className="ogmlist_list_line_group inputs" >{item.developer}</div>
                            <div onClick={(e) => setSelectedItem(selectedItem === index ? -1 : index)} style={{justifyContent:'center',alignItems:"center"}} className="ogmlist_list_line_cropname button">Показать информацию</div>
                        </div>
                        {selectedItem === index ?
                            <div className={`dop-info`}>
                                <div className="table-container">
                                    <div className="table">
                                        <div className="rowsmall header">
                                            <div className="cell wide-column">Подразделение</div>
                                            <div className="cell wide-column">График работы</div>
                                            <div className="cell middle-column">Дата рождения</div>
                                            <div className="cell middle-column">Оклад/тариф</div>
                                            <div className="cell middle-column">Вахтовик</div>
                                            <div className="cell">СН %</div>
                                            <div className="cell">Д1</div>
                                            <div className="cell">Д2</div>
                                            <div className="cell">Д3</div>
                                            <div className="cell">Д4</div>
                                            <div className="cell">Д5</div>
                                            <div className="cell">Д6</div>
                                            <div className="cell">Д7</div>
                                            <div className="cell">Д8</div>
                                            <div className="cell">Д9</div>
                                            <div className="cell">Д10</div>
                                            <div className="cell">Д11</div>
                                            <div className="cell">Д12</div>
                                            <div className="cell">Д13</div>
                                            <div className="cell">Д14</div>
                                            <div className="cell">Д15</div>
                                            <div className="cell">Д16</div>
                                            <div className="cell">Д17</div>
                                            <div className="cell">Д18</div>
                                            <div className="cell">Д19</div>
                                            <div className="cell">Д20</div>
                                            <div className="cell">Д21</div>
                                            <div className="cell">Д22</div>
                                            <div className="cell">Д23</div>
                                            <div className="cell">Д24</div>
                                            <div className="cell">Д25</div>
                                            <div className="cell">Д26</div>
                                            <div className="cell">Д27</div>
                                            <div className="cell">Д28</div>
                                            <div className="cell">Д29</div>
                                            <div className="cell">Д30</div>
                                            <div className="cell">Д31</div>
                                        </div>
                                        <div className="rowsmall">
                                            <div className="cell wide-column">{item.branch}</div>
                                            <div className="cell wide-column">{item.method}</div>
                                            <div className="cell middle-column">{item.birthday}</div>
                                            <div className="cell middle-column">{item.oklad}</div>
                                            <div className="cell middle-column">{item.groups}</div>
                                            <div className="cell">{item.sn}</div>
                                            <div className="cell">{item.d1}</div>
                                            <div className="cell">{item.d2}</div>
                                            <div className="cell">{item.d3}</div>
                                            <div className="cell">{item.d4}</div>
                                            <div className="cell">{item.d5}</div>
                                            <div className="cell">{item.d6}</div>
                                            <div className="cell">{item.d7}</div>
                                            <div className="cell">{item.d8}</div>
                                            <div className="cell">{item.d9}</div>
                                            <div className="cell">{item.d10}</div>
                                            <div className="cell">{item.d11}</div>
                                            <div className="cell">{item.d12}</div>
                                            <div className="cell">{item.d13}</div>
                                            <div className="cell">{item.d14}</div>
                                            <div className="cell">{item.d15}</div>
                                            <div className="cell">{item.d16}</div>
                                            <div className="cell">{item.d17}</div>
                                            <div className="cell">{item.d18}</div>
                                            <div className="cell">{item.d19}</div>
                                            <div className="cell">{item.d20}</div>
                                            <div className="cell">{item.d21}</div>
                                            <div className="cell">{item.d22}</div>
                                            <div className="cell">{item.d23}</div>
                                            <div className="cell">{item.d24}</div>
                                            <div className="cell">{item.d25}</div>
                                            <div className="cell">{item.d26}</div>
                                            <div className="cell">{item.d27}</div>
                                            <div className="cell">{item.d28}</div>
                                            <div className="cell">{item.d29}</div>
                                            <div className="cell">{item.d30}</div>
                                            <div className="cell">{item.d31}</div>
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

export default observer(T13Page)