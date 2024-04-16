import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import ManService from "../../services/ManService";
import {useMessage} from "../../hooks/message.hook";
import ModalFiles from "../../components/modalwin/ModalFiles";
import {DeleteHumanList} from "./modalactive/DeleteHumanList";

function NewPersonHR(){
    const message = useMessage()

    const [fio, setFio] = useState('')
    const [dev, setDev] = useState('')
    const [branch, setBranch] = useState('')
    const [doc, setDoc] = useState('')
    const [active, setActive] = useState(false)
    const [manlist, setManlist] = useState([])
    const [mandel, setMandel] = useState([])


    const getList = async () => {
        try{
            const {data} = await ManService.getHumanList()
            setManlist(data)

        }catch(e){
            console.log(e)
        }
    }

    const plusManList = async () => {
        try{
            const man = await ManService.plusManHR({fio, dev, branch, doc})
            message(man.data)
            setFio('')
            setDev('')
            setBranch('')
            setDoc('')
            const inputs = document.querySelectorAll('.ogmlist_list_line_new')
            inputs.forEach(input=>{
                input.value = ''
            })
            getList()
        }catch{
            message('Что-то пошло не так')
        }
    }

    useEffect(()=>{
        getList()
    }, [fio, mandel])


    return (
        <div className="ogmlist">
            <div className="ogmlist_title">Дополнительные сотрудника для учета отработанного времени</div>
            {/*<div className="ogmlist_btns">*/}
            {/*    <div className={`ogmlist_save `}>Сохранить</div>*/}
            {/*</div>*/}
            <div className="ogmlist_list">
                <div className="ogmlist_list_line">
                    <div className="ogmlist_list_line_name nametitle">ФИО</div>
                    <div className="ogmlist_list_line_price title">Должность</div>
                    <div className="ogmlist_list_line_group title">Отдел / Подразделение</div>
                    <div className="ogmlist_list_line_cropname title borderrightnone">Документ</div>
                </div>
                {manlist.map((man, index)=>(
                    <div key={index} className="ogmlist_list_line bordertopnone">
                        <div className="ogmlist_list_line_name">{man.name}</div>
                        <div className="ogmlist_list_line_name">{man.developer}</div>
                        <div className="ogmlist_list_line_name">{man.branch}</div>
                        <div className="ogmlist_list_line_cropname">{man.document}</div>
                        <div className="ogmlist_list_line_del" onClick={()=>{setActive(!active); setMandel([man.id, man.name, man.developer])}}><i className="fa-solid fa-xmark"></i></div>
                    </div>
                ))}

            </div>
            <div className="newlineogm">
                <div className="line">
                    <input className={`ogmlist_list_line_new `} onChange={(e)=>setFio(e.target.value)} placeholder="ФИО"/>
                    <input className={`ogmlist_list_line_new `} onChange={(e)=>setDev(e.target.value)} placeholder="Должность"/>
                    <input className={`ogmlist_list_line_new `} onChange={(e)=>setBranch(e.target.value)} placeholder="Отдел / Подразделение"/>
                    <input className={`ogmlist_list_line_new `} onChange={(e)=>setDoc(e.target.value)} placeholder="Документ"/>
                </div>
                <div className="line">
                    <div  className="line_title">Добавить сотрудника</div>
                    <div className="ogmlist_plus" onClick={()=>{plusManList()}}>Добавить</div>
                </div>
            </div>


            <ModalFiles data={<DeleteHumanList func={getList} mandel={mandel} setMandel={setMandel} active={active} setActive={setActive}/>} active={active} setActive={setActive}/>
        </div>
    )
}

export default observer(NewPersonHR)