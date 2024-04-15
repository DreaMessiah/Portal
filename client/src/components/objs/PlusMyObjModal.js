import '../welding/mainpage/objs.scss'
// import WeldingService from "../../../services/WeldingService";
// import axios from "axios";
import {useEffect, useState} from "react";
import ObjsService from "../../services/ObjsService";
// import {useMessage} from "../../../hooks/message.hook";

export const PlusMyObjModal = ({list, active, setActive, setViewMyObjs}) => {

    const [title, setTitle] = useState('Добавить объект')
    const [thisobj, setThisobj] = useState(0)

    const createObj = async () => {
        try{
            const {data} = await ObjsService.insertObjs(thisobj)
            if(data){
                setViewMyObjs(data)
                setActive(!active)
            }
        } catch(e) {
            console.log(e)
        }
    }
    useEffect(() => {
        console.log('!@!@!@')
        console.log(thisobj)
    },[thisobj])

    return (
        <div className="new_obj">
            <div className="new_obj_title" id="new_obj_title">{title}</div>
            <select onClick={e => console.log(e)} onChange={(e) => console.log(e)} id="select_obj">
                <option value={''} ></option>
                {list.map((obj, index) => (
                    <option key={index} value={obj.id} >{obj.shifr}</option>
                ))}

            </select>
            {/*<div onClick={()=>createObj()} className="new_obj_btn">Добавить</div>*/}
            <div onClick={()=>createObj()} className="new_obj_btn">Добавить</div>
        </div>
    )
}