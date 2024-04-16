import "./newtabelmodal.scss";
import {useEffect} from "react";
import WriteTabelService from "../../../services/WriteTabelService";
import ObjsService from "../../../services/ObjsService";
import {useMessage} from "../../../hooks/message.hook";

export const AllTabelSettBTN = ({func, tab, active, setActive}) => {
    const message = useMessage()
    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    const idobj = tab[0].id
    const monthtab = tab[1].month
    const yeartab = tab[1].year
    let checktab = 1
    let button = 'Подписать'
    if(tab[1].auto === 1){
        checktab = 0
        button = 'Разблокировать'
    }
    const writeCheck = async () => {
        try{

            console.log(tab)


            const getTabel = await WriteTabelService.blockedTabel({object_id: idobj, month: monthtab, year: yeartab, check: checktab})
            const result = getTabel.data
            if(result){
                func()
            }

        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className='modal_crew'>
            <div className='modal_crew_message'>Выбрать действие для табеля: {tab[0].shifr} {months[tab[1].month]} {tab[1].year}</div>

            <div className='modal_crew_btns'>
                <div className='modal_crew_btns_cancel' onClick={()=>{writeCheck(); setActive(!active)}}>{button}</div>
                <div className='modal_crew_btns_plus' onClick={()=>{setActive(!active)}}>Отмена</div>
            </div>
        </div>



    )
}