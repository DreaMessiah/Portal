import "./constrollwelding.scss"
import {ModalBigWin} from "../../../modalwin/ModaBiglWin";
import {NewCrewModal} from "../tabelwelding/modalactive/NewCrewModal";
import React, {useEffect, useState} from "react";
import {NewControll} from "./modal/NewControll";
import WeldingService from "../../../../services/WeldingService";
import {useLocation} from "react-router-dom";
import {useMonth} from "../../../../hooks/month.hook";
import formatDate from "../../../functions/formatDate";
import ModalFiles from "../../../modalwin/ModalFiles";
import {useMessage} from "../../../../hooks/message.hook";
import ReferenceService from "../../../../services/ReferenceService";

export const ControllWeldingNew = () => {
    const location = useLocation()
    const message = useMessage()

    const [active, setActive] = useState(false)
    const [zas,setZas] = useState('')
    const [activeStatusChange, setActiveStatusChange] = useState(false)

    const [statuses,setStatuses] = useState([])
    const [selStat,setSelStat] = useState(-1)

    const [activeDeleteZa,setActiveDeleteZa] = useState(false)
    const [selDeleteZa,setSelDeleteZa] = useState(-1)

    const [month,setMonth] = useState('')
    const [year,setYear] = useState('')
    const [objectId,setObjectId] = useState('')

    const loadingHandler = async (object_id,month,year) =>{
        try {
            const {data} = await WeldingService.fetchZasv(object_id,month,year)
            if(data) {
                setZas(data)
            }
            const ss = await WeldingService.fetchStatuses(2,1)
            if(ss.data){
                setStatuses(ss.data)
            }
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        const searchParams = new URLSearchParams(location.search);

        setObjectId(searchParams.get('shifr'))
        setMonth(searchParams.get('month'))
        setYear(searchParams.get('year'))

        loadingHandler(searchParams.get('shifr'),searchParams.get('month'),searchParams.get('year'))
    }, [location])
    const statusHandler = (index) => {
        setSelStat(index)
        setActiveStatusChange(true)
    }
    const deleteHandler = index => {
        setSelDeleteZa(index)
        setActiveDeleteZa(true)
    }
    function ChangeStatus(){
        const changeStatHandler = async (idStatus) => {
            try {
                const {data} = await WeldingService.changeStatus(zas[selStat].id,idStatus)
                if(data.id){
                    message('Статус изменен')
                    setActiveStatusChange(false)
                    await loadingHandler(objectId,month,year)
                }
            }catch (e){
                console.log(e)
            }
        }
        return(
            <div className={`buttons statuses`}>
                {statuses ? statuses.map( (item,index) => (
                    <div onClick={(e) => changeStatHandler(item.id)} key={index} style={{backgroundColor:`${item.background}`,color:`${item.color}`}} className={'button'}>{item.label}</div>
                )) : null}
            </div>
        )
    }
    function DeleteZa() {
        const removeHandler = async () => {
            try{
                const {data} = await WeldingService.deleteZa(zas[selDeleteZa].id)
                console.log(data)
                if(data.del) {
                    message('Заявка удалена удален')
                    const newZa = [...zas]
                    newZa.splice(selDeleteZa, 1)
                    setZas(newZa)
                    exitDeleteHandler()
                }
            }catch (e){
                console.log(e.message+': Проблема удаления тарифа')
            }
        }
        const exitDeleteHandler = () => {
            setSelDeleteZa(-1)
            setActiveDeleteZa(false)
        }
        return(
            <>
                <div className='copy'>
                    <h4>Вы действительно хотели бы удалить тариф {'№ '+ selDeleteZa >= 0 && zas[selDeleteZa].id}</h4>
                    <div className='buttons'>
                        <div onClick={() => removeHandler()} className='button da'>Да</div>
                        <div onClick={() => exitDeleteHandler()} className='button'>Нет</div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="controll_welding">

            <div className="controll_welding_cap">
                <div className="controll_welding_cap_controller">
                    <div className="controll_welding_cap_controller_plus" onClick={() => setActive(true)}></div>
                    <div className="controll_welding_cap_controller_filter"></div>
                </div>
                <div className="controll_welding_cap_title">
                    {/*<div className="controll_welding_cap_title_text">{thisobj.shifr}</div>*/}
                    {/*<div className="controll_welding_cap_title_ym">{thisMonth(getMonth)} {getYear}</div>*/}
                </div>

            </div>
            <div className="controll_welding_list" id="controll_welding_list">
                <div className="controll_welding_list_strock" id="list_strock">
                    <div className="controll_welding_list_strock_pp">п/п</div>
                    <div className="controll_welding_list_strock_num">Заявка</div>
                    <div className="controll_welding_list_strock_date">Дата</div>
                    <div className="controll_welding_list_strock_total">Кол-во</div>
                    <div className="controll_welding_list_strock_autor">Инициатор</div>
                    <div className="controll_welding_list_strock_obj">Объект</div>
                    <div className="controll_welding_list_strock_status">Статус</div>
                    <div className="controll_welding_list_strock_editor_up">Управление</div>
                </div>
                {zas && zas.map((item,index) => (
                    <div key={index} className="controll_welding_list_strock">
                        <div className="controll_welding_list_strock_pp">{index}</div>
                        <div className="controll_welding_list_strock_num">{item.id}</div>
                        <div className="controll_welding_list_strock_date">{formatDate(item.createdAt)}</div>
                        <div className="controll_welding_list_strock_total">{item.total}</div>
                        <div className="controll_welding_list_strock_autor">{item.author_name}</div>
                        <div className="controll_welding_list_strock_obj">{item.object_shift}</div>
                        <div style={{backgroundColor:item.status_back,color:item.status_color}} onClick={(e) => statusHandler(index)} className="controll_welding_list_strock_status button">{item.status_name}</div>
                        <div className="controll_welding_list_strock_editor">
                            <div className="controll_welding_list_strock_editor_open">Открыть</div>
                            <div onClick={(e) => deleteHandler(index)} className="controll_welding_list_strock_editor_del"><i className="fa-solid fa-xmark"></i></div>
                        </div>
                    </div>
                ))}

            </div>
            {/*<ModalBigWin data={<NewCrewModal sel={select} active={crew} setActive={setCrew}/>} active={crew} setActive={setCrew}/>*/}
            <ModalFiles active={activeStatusChange} setActive={setActiveStatusChange} heigth={'40vh'} data={<ChangeStatus/>}/>
            <ModalFiles active={activeDeleteZa} setActive={setActiveDeleteZa} data={<DeleteZa/>}/>
            <ModalBigWin plusform={<NewControll loading={loadingHandler} month={month} year={year} object_id={objectId} active={active} setActive={setActive}/>} active={active} setActive={setActive}/>
        </div>
    )
}