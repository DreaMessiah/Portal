import "./newcrewmodal.scss";

export const NewCrewModal = ({sel, active, setActive}) => {
    const btnPlus = document.querySelector('.modal_crew_btns_plus')
    const btnCancel = document.querySelector('.modal_crew_btns_cancel')
    let message
    if(sel === '' || sel === 'отсутствует'){
        sel = 'отсутствует'

        btnPlus.style.display = 'none'
        btnCancel.innerHTML = 'Закрыть'
        message = `Выберете звено для добавления`
    } else {
        sel = sel
        btnPlus.style.display = 'flex'
        btnCancel.innerHTML = 'Отмена'
        message = `Желаете добавить новое звено ${sel} в табель?`
    }





    return (
        <div className='modal_crew'>
            <div className='modal_crew_message'>{message}</div>

            <div className='modal_crew_btns'>
                <div className='modal_crew_btns_plus'>Добавить</div>
                <div className='modal_crew_btns_cancel'  onClick={() => setActive(false)}>Отмена</div>
            </div>
        </div>
    )
}