import "./crews.scss"


export const NewCrew = () => {

    const plusCrew = () => {
alert('Кнопка работает')
    }

    return (
       <div className="newcrew">
           <div className="newcrew_title">Список Звеньв и Бригад</div>
           <div className="newcrew_btn" onClick={()=>{plusCrew()}}>Добавить звено / бригаду</div>
           <div className="newcrew_list"></div>
       </div>
    )

}