import "./newtabelmodal.scss";
import {useEffect} from "react";
import WriteTabelService from "../../../services/WriteTabelService";
import ObjsService from "../../../services/ObjsService";
import {useMessage} from "../../../hooks/message.hook";

export const AllTabelSettBTN = ({tab, active, setActive}) => {
    const message = useMessage()
    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];

    const writeCheck = async () => {
        try{
            const getTabel = await WriteTabelService.getThisTabel({month: ''+tab[1].month, year: tab[1].year, object_id: tab[1].object_id})
            const result = getTabel.data

        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className='modal_crew'>
            <div className='modal_crew_message'>Выбрать действие для табеля: {tab[0].shifr} {months[tab[1].month]} {tab[1].year}</div>

            <div className='modal_crew_btns'>
                <div className='modal_crew_btns_cancel' onClick={()=>{setActive(!active)}}>Подписать</div>
                <div className='modal_crew_btns_plus' onClick={()=>{setActive(!active)}}>Отмена</div>
            </div>
        </div>



    )
}