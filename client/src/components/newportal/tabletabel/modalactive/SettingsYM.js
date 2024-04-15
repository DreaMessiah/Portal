import "./newtabelmodal.scss";
import {useEffect} from "react";
import WriteTabelService from "../../../../services/WriteTabelService";
import ObjsService from "../../../../services/ObjsService";
import {useMessage} from "../../../../hooks/message.hook";

export const SettingsYM = ({func, idym, active, setActive}) => {
    const message = useMessage()

    const delym = async () => {
        try{
            const trashym = await WriteTabelService.trashYm({id: idym})
            const mess = trashym.data
            console.log('это ответ с сервера:'+mess)
            if(mess === 'ok'){
                message('табель скрыт')
                func()
            }else{
                message('Невозможно удалить табель')
            }

        }catch(e){

        }
    }

    return (
        <div className='modal_crew'>
            <div className='modal_crew_message'>Выбрать действие {idym}</div>

            <div className='modal_crew_btns'>
                <div className='modal_crew_btns_cancel' onClick={()=>{delym(); setActive(!active)}}>Удалить</div>
                <div className='modal_crew_btns_plus' onClick={()=>{setActive(!active)}}>Отмена</div>
            </div>
        </div>



    )
}