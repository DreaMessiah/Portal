import "./newtabelmodal.scss";
import {useEffect} from "react";
import WriteTabelService from "../../../services/WriteTabelService";

export const WritedTabel = ({write, setWrite, active, setActive, month, year, getShifr}) => {

const upload = async () => {
    try{
        const updateBlocked = await WriteTabelService.blockedTabel({month: ''+month, year: year, object_id: getShifr})
        const result = updateBlocked.data
        console.log(result)
        setWrite(!write)
    }catch(e){
        console.log(e)
    }
}

    return (
        <div className='modal_crew'>
            <div className='modal_crew_message'>После подписания табеля, редактирование закрывается</div>

            <div className='modal_crew_btns'>
                <div className='modal_crew_btns_plus' onClick={()=>{upload(); setActive(!active)}}>Подписать</div>
                <div className='modal_crew_btns_cancel' onClick={()=>{setActive(!active)}}>Отмена</div>
            </div>
        </div>



    )
}