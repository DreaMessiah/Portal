import './objs.scss'
import WeldingService from "../../../services/WeldingService";
// import axios from "axios";
import {useState} from "react";
import {useMessage} from "../../../hooks/message.hook";

export const CreateObjModal = ({inn, user, active, setActive, title, setTitle}) => {


    const plusObjOnDisplay = () => {

    }

    const message = useMessage()

    const [thisobj, setThisobj] = useState(0)

    const [objList, setObjList] = useState([]);

    const readInn = async (e) => {
        console.log(inn)
        const response = await WeldingService.getObjs({inn})
        console.log(response.data)
        setObjList(response.data)
    }

    const viewTitle = e => {
        let newTitle;
        console.log(e.target.value)
        setThisobj(e.target.value)
        console.log(e.target.selectedOptions[0].innerHTML)
        objList.forEach(obj=>{
            if(obj.id === +e.target.value){
                newTitle = obj.nameobject
            }
        })

        setTitle(newTitle)
    }



    const insertObj = async () => {
        console.log(thisobj)
        if(thisobj !== 0) {
            let myObj;

            objList.forEach(elem => {
                if(elem.id == thisobj){
                    myObj = elem
                    console.log(myObj)
                }
            })
            const listobj = await WeldingService.insertObjs({myObj, user})
            // await WeldingService.insertObjs({myObj, user})
            message('Объект ' + listobj.data.shifr + ' успешно добавлен')
            console.log(listobj.data)
            setActive(!active)
        }
        // console.log(listobj.data)
        console.log(title)


  }


    ///// itle по умолчанию

    ///

    return (
        <div className="new_obj">
            <div className="new_obj_title" id="new_obj_title">{title}</div>
            <select onFocus={e =>{readInn()}} onChange={e =>{viewTitle(e)}} id="select_obj">
                {objList.map((obj, index) => (
                    <option key={index} value={obj.id} >{obj.shifr}</option>
                ))}

            </select>
            <div onClick={()=>insertObj()} className="new_obj_btn">Добавить</div>
        </div>
    )
}