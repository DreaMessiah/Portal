import './objs.scss'
import WeldingService from "../../../services/WeldingService";
import axios from "axios";
import {useState} from "react";

export const CreateObjModal = ({inn, active, setActive, title, setTitle}) => {

    // const [title, setTitle] = useState('Добавить объект')

    const [objList, setObjList] = useState([]);

    const readInn = async (e) => {
        console.log(inn)
        const response = await WeldingService.getObjs({inn})
        console.log(response.data)
        setObjList(response.data)
    }

    const viewTitle = e => {
        let newTitle;
        console.log(e.target.value)

        console.log(e.target.selectedOptions[0].innerHTML)
        objList.forEach(obj=>{
            if(obj.id === +e.target.value){
                newTitle = obj.nameobject
            }
        })

        setTitle(newTitle)
    }

    const insertObj = () => {
        console.log(title)
        setActive(!active)
    }


    ///// itle по умолчанию

    ///

    return (
        <div className="new_obj">
            <div className="new_obj_title" id="new_obj_title">{title}</div>
            <select onFocus={e =>{readInn()}} onChange={e =>{viewTitle(e)}} id="select_obj">
                {objList.map((obj, index) => (
                    <option key={index} value={obj.id} >{obj.shifr}</option>
                ))}

            </select>
            <div onClick={()=>insertObj()} className="new_obj_btn">Добавить</div>
        </div>
    )
}