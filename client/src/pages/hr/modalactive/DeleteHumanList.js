
import {useEffect} from "react";
import {useMessage} from "../../../hooks/message.hook";
import ManService from "../../../services/ManService";

export const DeleteHumanList = ({func, mandel, setMandel, active, setActive}) => {

    const messages = useMessage()

    const deleteMan = async () => {
        try{
            const del = ManService.delManHumanList({idman: mandel[0]})
            // if(del.data){
            //     messages(`${mandel[1]} удален из списка сотрудников`)
            // } else {
            //     messages(`Что-то пошло не так`)
            // }
            messages(del.data)
            setMandel([])
            func()

        }catch{}
    }

    useEffect(()=>{

    }, [])
    return (
        <div className='modal_crew'>
            <div className='modal_crew_message'>Вы действительно желаете удалить: {mandel[1]} ?</div>
            <div className='modal_crew_btns'>
                <div className='modal_crew_btns_cancel' onClick={()=>{deleteMan(); setActive(!active)}}>Удалить</div>
                <div className='modal_crew_btns_plus' onClick={() => setActive(!active)}>Отмена</div>
            </div>
        </div>
    )
}