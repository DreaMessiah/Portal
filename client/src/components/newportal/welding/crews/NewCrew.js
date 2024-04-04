import "./crews.scss"
import {Link} from "react-router-dom";


export const NewCrew = () => {

    const plusCrew = () => {
alert('Кнопка работает')
    }
    //
    // 2:{
    //     name:'согласование',
    //         type:'pdf',
    //         link:'/'
    // },
    // <Link to={"/"}><div className={'img pdf'}></div><p>{'Допуск . pdf'}</p></Link>

    return (
       <div className="newcrew">
           <div className="newcrew_title">Список Звеньв и Бригад</div>
           <div className="newcrew_btn" onClick={()=>{plusCrew()}}>Добавить звено / бригаду</div>
           <div className="newcrew_list">
               <div className="newcrew_list_strs">
                   <div className="newcrew_list_strock">
                       <div className="newcrew_list_strock_pp">1</div>
                       <div className="newcrew_list_strock_name">Бригада Изомова Ш.Г</div>
                       <div className="newcrew_list_strock_num">Р-128</div>
                       <div className="newcrew_list_strock_open">Открыть</div>
                   </div>
                   <div className="block_docs">

                       <Link to={"/"}><div className={'img pdf'}></div><p>{'Допуск . pdf'}</p></Link>
                       <Link to={"/"}><div className={'img pdf'}></div><p>{'Допуск . pdf'}</p></Link>
                       <Link to={"/"}><div className={'img pdf'}></div><p>{'Допуск . pdf'}</p></Link>
                   </div>
               </div>
           </div>
       </div>
    )

}