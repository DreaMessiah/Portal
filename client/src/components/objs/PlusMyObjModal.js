import '../welding/mainpage/objs.scss'
// import WeldingService from "../../../services/WeldingService";
// import axios from "axios";
import {useEffect, useState} from "react";
import ObjsService from "../../services/ObjsService";


export const PlusMyObjOnModal = ({loading,list, active, setActive, setViewMyObjs}) => {

    const [title, setTitle] = useState('Добавить объект')
    const [thisobj, setThisobj] = useState(0)

    const createObj = async () => {
        try{
            const {data} = await ObjsService.insertObjs(thisobj)
            console.log(data)
            setActive(!active)
            await loading()
        } catch (e){
            console.log(e)
        }
    }
    useEffect(() => {
        console.log(thisobj)
    },[thisobj])
    return (
        <div className="new_obj">
            <div className="new_obj_title" id="new_obj_title">{title}</div>
            <select onChange={(e) => {setThisobj(e.target.value)}} id="select_obj">
                <option value={''} ></option>
                {list.map((obj, index) => (
                    <option key={index} value={obj.id} >{obj.shifr}</option>
                ))}

            </select>
            <div onClick={ () => createObj() } className="new_obj_btn">Добавить</div>
        </div>
    )
}