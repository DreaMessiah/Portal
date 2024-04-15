import "./newtabelmodal.scss";
import {useEffect} from "react";
import WriteTabelService from "../../../../services/WriteTabelService";
import ObjsService from "../../../../services/ObjsService";
import {useMessage} from "../../../../hooks/message.hook";

export const DelManTabel = ({ func, idmandel, namemandel, devmandel, active, setActive, month, year, getShifr}) => {
    const message = useMessage()
    const delman = async () => {

        try{
            const lineoutman = await ObjsService.delManTabel({man:idmandel})
            const mess = lineoutman.data
            message(mess)
            func()
        }catch(e){
            console.log(e)
        }

    }

    return (
        <div className='modal_crew'>
            <div className='modal_crew_message'>Удалить из табеля: {namemandel} {devmandel} ?</div>

            <div className='modal_crew_btns'>
                <div className='modal_crew_btns_cancel' onClick={()=>{delman(); setActive(!active)}}>Удалить</div>
                <div className='modal_crew_btns_plus' onClick={()=>{setActive(!active)}}>Отмена</div>
            </div>
        </div>



    )
}