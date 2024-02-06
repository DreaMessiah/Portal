import './objs.scss'
import WeldingService from "../../../services/WeldingService";
import axios from "axios";
import {useState} from "react";

export const CreateObjModal = ({inn}) => {

    const [objList, setObjList] = useState([]);

    const readInn = async () => {
        console.log(inn)
        const response = await WeldingService.getObjs({inn})
        console.log(response.data)
        setObjList(response.data)
    }

    const insertObj = () => {
        const valueSelect = document.getElementById('select_obj').value

        console.log(valueSelect)
    }

    return (
        <div className="new_obj">
            <select onFocus={()=>readInn()} id="select_obj">
                {objList.map((obj, index) => (
                    <option key={index} value={obj.id}>{obj.shifr}</option>
                ))}

            </select>
            <div onClick={()=>insertObj()} style={{width: "300px", height: "80px", background: "blue", color: "#FFF", display: "flex", justifyContent: "center", alignItems: "center"}}>Отправить id</div>
        </div>
    )
}