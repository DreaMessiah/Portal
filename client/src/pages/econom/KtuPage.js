import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import "./ogm.scss"

import {useMessage} from "../../hooks/message.hook";
import {Link, useNavigate} from "react-router-dom";
import ReferenceService from "../../services/ReferenceService";
import isNumeric from "../../components/functions/isNumeric";
import ModalFiles from "../../components/modalwin/ModalFiles";
import * as XLSX from 'xlsx';
import CmsSelect from "../../components/inputs/CmsSelect";
import Select from "react-select";
import {DataContext} from "../../context/DataContext";
import TextInput from "../../components/inputs/TextInput";
import formatDate from "../../components/functions/formatDate";

function KtuPage(){
    const {getMonthName,optionsMonth,optionsYear} = useContext(DataContext)
    const getNowMonthNum = () => {
        const currentDate = new Date();
        return currentDate.getMonth()
    }
    const monthNow = getNowMonthNum()

    const [monthState,setMonthState] = useState(optionsMonth[monthNow])
    const [yearState,setYearState] = useState(optionsYear[2])
    const [comment,setComment] = useState('')

    const [ktuDocs,setKtuDocs] = useState([])
    const [activeDelete,setActiveDelete] = useState(false)
    const [deleteIndex,setDeleteIndex] = useState(-1)

    const [empty,setEmpty] = useState([])

    const {store} = useContext(Context)
    const message = useMessage()
    const navigate = useNavigate()
    const loadingHandler = async () => {
        try {
            const ktu = await ReferenceService.getKtuDocs()
            console.log(ktu)
            if(ktu.data) {
                setKtuDocs(ktu.data.map(item => ({ ...item })))
            }

        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        loadingHandler()
    },[])

    const createHandler = async () => {
        try {
            const response = await ReferenceService.newKtuDoc(monthState.label,yearState.label,comment)
            if(response.data){
                if (response.data.err){
                    message(response.data.message)
                }else{
                    console.log(response.data)
                    setKtuDocs([...ktuDocs,response.data])
                    message('Документ создан')
                    setComment('')
                }
            }
        }catch (e) {
            console.log(e)
        }
    }
    const goToHandler = (index) => {
        navigate(`/ktulist?id=${ktuDocs[index].id}`)
    }
    const deleteHandler = (index) => {
        setDeleteIndex(index)
        setActiveDelete(true)
    }
    function Delete() {
        const removeHandler = async () => {
            try{
                const response = await ReferenceService.delKtuDoc(ktuDocs[deleteIndex].id)
                console.log(response.data)
                if(response.data.del) {
                    message(response.data.message)
                    const newKtuDoc = [...ktuDocs]
                    newKtuDoc.splice(deleteIndex, 1)
                    setKtuDocs(newKtuDoc)
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
                    <h4>Вы действительно хотели бы удалить документ {deleteIndex >= 0 && ktuDocs[deleteIndex].id+' от '+formatDate(ktuDocs[deleteIndex].createdAt)}</h4>
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
            <div onClick={(e) => console.log(yearState)} className="ogmlist_title">Документы по дополнительным КТУ</div>
            <div style={{marginBottom:'10px'}} className={'text'}><p>Здесь Вы можете посмотреть и создать документы по назначению дополнительных коэфициэнтов трудового участия.</p></div>
            <div className="ogmlist_btns ktudoc">
                <div className='info between min300'>
                    <div className="select_block">
                        <div className="select_block_title">МЕСЯЦ</div>
                        <div className={`select`}><CmsSelect placeholder={monthState.label}  onChange={setMonthState} value={monthState.label} options={optionsMonth}/></div>
                    </div>
                    <div className="select_block">
                        <div className="select_block_title">ГОД</div>
                        <div className={`select`}><CmsSelect placeholder={yearState.label} onChange={setYearState} value={yearState.label} options={optionsYear}/></div>
                    </div>
                </div>
                <div className={`info signals`}>
                    <div className={`input-container`}>
                        <TextInput text={comment} setText={setComment} label={'Коментарий'} placeholder={'Введите коментарий(не обязательно)'} empty={false}/>
                    </div>
                    <div onClick={(e) => createHandler()} style={{borderRadius:'10px'}} className="ogmlist_upload">Создать</div>
                </div>
            </div>

            <div className="ogmlist_list">
                <div className="ogmlist_list_line">
                    <div className="ogmlist_list_line_price w150 title">№ Документа</div>
                    <div className="ogmlist_list_line_price w150 title">Год</div>
                    <div className="ogmlist_list_line_group w150 title">Месяц</div>
                    <div className="ogmlist_list_line_group title">Создатель</div>
                    <div className="ogmlist_list_line_group title borderrightnone">Коментарий</div>
                </div>
                {ktuDocs && ktuDocs.map((item,index) => (
                    <div key={index} className="linktoktu ogmlist_list_line bordertopnone">
                        <div className="ogmlist_list_line_price w150">{item.id} от {formatDate(item.createdAt)}</div>
                        <div className="ogmlist_list_line_price w150">{item.year}</div>
                        <div className="ogmlist_list_line_group w150">{item.month}</div>
                        <div className="ogmlist_list_line_group">{item.name}</div>
                        <div className="ogmlist_list_line_group borderrightnone">{item.comment}</div>
                        <div className={`icons-container`}>
                            <div style={{marginLeft:'-20px'}} onClick={() => goToHandler(index)} className="ogmlist_list_line_del"><i className="fa-solid fa-eye"></i></div>
                            {rule ===3 && <div onClick={() => deleteHandler(index)} style={{marginLeft:'15px'}} className="ogmlist_list_line_del"><i className="fa-solid fa-xmark"></i></div>}
                        </div>
                    </div>
                ))}
            </div>

            <ModalFiles data={<Delete />} active={activeDelete} setActive={setActiveDelete}/>
        </div>
    )
}

export default observer(KtuPage)