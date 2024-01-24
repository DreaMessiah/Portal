import "./newcrewmodal.scss";
import {useEffect} from "react";

export const NewCrewModal = ({sel, active, setActive}) => {
    let message
    const btnPlus = document.querySelector('.modal_crew_btns_plus')
    const btnCancel = document.querySelector('.modal_crew_btns_cancel')

    if(sel === '' || sel === 'отсутствует'){
        sel = 'отсутствует'
        message = `Выберете звено для добавления`
    } else {
        message = `Желаете добавить новое звено ${sel} в табель?`
    }
    useEffect(() => {
        if(sel === '' || sel === 'отсутствует'){
            btnPlus.style.display = 'none'
            btnCancel.innerHTML = 'Закрыть'
        } else {
            btnPlus.style.display = 'flex'
            btnCancel.innerHTML = 'Отмена'
        }
    }, [])

    return (
        <div className='modal_crew'>
            <div className='modal_crew_message'>{message}</div>

            <div className='modal_crew_btns'>
                <div className='modal_crew_btns_plus'>Добавить</div>
                <div className='modal_crew_btns_cancel' onClick={() => setActive(false)}>Отмена</div>
            </div>
        </div>
    )
}