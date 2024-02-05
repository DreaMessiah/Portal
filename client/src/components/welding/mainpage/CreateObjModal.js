import './objs.scss'
import WeldingService from "../../../services/WeldingService";

export const CreateObjModal = ({inn}) => {
    const readInn = async () => {
        console.log(inn)
        const responce = await WeldingService.getObjs({inn})
        console.log(responce.data)
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