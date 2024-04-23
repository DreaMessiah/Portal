import React, {useEffect, useState} from "react";
import formatDate from "../../../functions/formatDate";
import WeldingService from "../../../../services/WeldingService";
import CmsDatePicket from "../../../inputs/CmsDatePicket";
import TableDatePicker from "../../../inputs/TableDatePicker";
import {useMessage} from "../../../../hooks/message.hook";
import './viewcontroll.scss'

export const ViewTable = ({connections,setConnections,setActive,onRigthStatus=false}) => {
    const [num,setNum] = useState('')
    const [codecrew,setCodecrew] = useState('')
    const [date,setDate] = useState(new Date())
    const [way,setWay] = useState('')
    const [dostup,setDostup] = useState('')
    const [size,setSize] = useState('')
    const [zav,setZav] = useState('')

    const [oldConn,setOldConn] = useState(connections.map(item => ({ ...item })))
    const [onChange,setOnChange] = useState(false)

    const message = useMessage()

    const deleteConnectionHandler = (index) => {
        const newConnections = [...connections]
        newConnections.splice(index, 1)
        setConnections(newConnections)
    }

    const numHandler = (value,index) => {
        const newConnections = [...connections]
        newConnections[index].num = value
        setConnections(newConnections)
    }
    const codecrewHandler = (value,index) => {
        const newConnections = [...connections]
        newConnections[index].codecrew = value
        setConnections(newConnections)
    }
    const dateHandler = (value,index) => {
        const newConnections = [...connections]
        newConnections[index].date = value
        setConnections(newConnections)
    }
    const wayHandler = (value,index) => {
        const newConnections = [...connections]
        newConnections[index].way = value
        setConnections(newConnections)
    }
    const dostupHandler = (value,index) => {
        const newConnections = [...connections]
        newConnections[index].dostup = value
        setConnections(newConnections)
    }
    const sizeHandler = (value,index) => {
        const newConnections = [...connections]
        newConnections[index].size = value
        setConnections(newConnections)
    }
    const zavHandler = (value,index) => {
        const newConnections = [...connections]
        newConnections[index].zav = value
        setConnections(newConnections)
    }

    const saveHandler = async () => {
        try {
            if(onChange && onRigthStatus){
                const {data} = await WeldingService.saveConnections(connections)
                if (data){
                    console.log(data)
                    setOldConn([data.map(item => ({ ...item }))])
                    setActive(false)
                    message('Список соединений сохранен')
                }
            }
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (JSON.stringify(connections) === JSON.stringify(oldConn)) {
            setOnChange(false)
        } else {
            setOnChange(true)
        }
    },[connections])

    return (
        <div className='new_controll'>
        {connections ?
            <div className={`new_controll_form`}>
                <div className='view_controll_form_this'>
                    <div className='new_controll_list_this_strock_up' id='cap_list'></div>
                    <div className='view_controll_form_this_strock' id='title_strock'>
                        <div className='view_controll_form_this_strock_number'>№ Соединения</div>
                        <div className='view_controll_form_this_strock_shifr'>Клеймо звена</div>
                        <div className='view_controll_form_this_strock_date'>Дата сварки</div>
                        <div className='view_controll_form_this_strock_way'>Способ сварки и положение</div>
                        <div className='view_controll_form_this_strock_access'>Доступ к сварному соединению</div>
                        <div className='view_controll_form_this_strock_size'>Размер св.соединения Тип св.соединения</div>
                        <div className='view_controll_form_this_strock_tube'>Зав. № труб (деталей)</div>
                    </div>
                    {connections.map( (item,index) => (
                        <div key={index} className='view_controll_form_this_strock view-connections'>
                            <div className='view_controll_form_this_strock_number'><input disabled={!onRigthStatus} value={item.num} onChange={(e) => numHandler(e.target.value,index)} className={`input_form`} id='number' type="text" /></div>
                            <div className='view_controll_form_this_strock_shifr'><input disabled={!onRigthStatus} value={item.codecrew} onChange={(e) => codecrewHandler(e.target.value,index)} className='input_form' id='shifr' type="text" /></div>
                            <div className='view_controll_form_this_strock_date'><input disabled={true} value={item.date} index={index} /></div>
                            <div className='view_controll_form_this_strock_way'><input disabled={!onRigthStatus} value={item.way} onChange={(e) => wayHandler(e.target.value,index)} className='input_form' id='way' type="text" /></div>
                            <div className='view_controll_form_this_strock_access'><input disabled={!onRigthStatus} value={item.dostup} onChange={(e) => dostupHandler(e.target.value,index)} className='input_form' id='access' type="text" /></div>
                            <div className='view_controll_form_this_strock_size'><input disabled={!onRigthStatus} value={item.size} onChange={(e) => sizeHandler(e.target.value,index)} className='input_form' id='size' type="text" /></div>
                            <div className='view_controll_form_this_strock_tube'><input disabled={!onRigthStatus} value={item.zav} onChange={(e) => zavHandler(e.target.value,index)} className='input_form' id='tube' type="text" /></div>
                        </div>
                    ))}
                </div>
                <div className='new_controll_form_btns'>
                    {onRigthStatus ? <div onClick={(e) => saveHandler()} className={`new_controll_form_btns_insert ${!onChange || !onRigthStatus ? 'noactive' : null}`} id='plusConnection'>Сохранить</div>: null}
                    <div onClick={(e) => setActive(false)} className={`new_controll_form_btns_create`} id='plusBtn'>{!onRigthStatus ? 'Выход' : 'Отменить'}</div>
                </div>
            </div>
                :null}
        </div>
    )
}