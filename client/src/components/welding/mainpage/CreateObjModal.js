import './objs.scss'
import WeldingService from "../../../services/WeldingService";
import axios from "axios";

export const CreateObjModal = ({inn}) => {
    const readInn = async () => {
        console.log(inn)
        const response = await WeldingService.getObjs({inn})
        console.log(response.data)
    }

    return (
        <div className="new_obj">
            <select>
                <option>sds</option>
            </select>
            <div onClick={()=>readInn()} style={{width: "300px", height: "80px", background: "blue", color: "#FFF", display: "flex", justifyContent: "center", alignItems: "center"}}>Отправить inn</div>
        </div>
    )
}