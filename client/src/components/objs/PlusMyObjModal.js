import '../welding/mainpage/objs.scss'
// import WeldingService from "../../../services/WeldingService";
// import axios from "axios";
import {useState} from "react";
import ObjsService from "../../services/ObjsService";
// import {useMessage} from "../../../hooks/message.hook";

export const PlusMyObjModal = ({inn, login, list, active, setActive, setViewMyObjs}) => {

    const [title, setTitle] = useState('Добавить объект')
    const [thisobj, setThisobj] = useState(0)
    // export const PlusMyObjModal = ({inn, user, active, setActive, title, setTitle, listObj, stateMass}) => {

    // const plusObjOnDisplay = (obj) => {
    //     const newList = listObj.push(obj)
    //
    // }

    // const message = useMessage()

    //

    // const readInn = async (e) => {
    //     console.log(inn)
    //     const response = await WeldingService.getObjs({inn})
    //     console.log(response.data)
    //     setObjList(response.data)
    // }

    const viewTitle = e => {
        let newTitle;
        console.log(e.target.value)
        // setThisobj(e.target.value)
        console.log(e.target.selectedOptions[0].innerHTML)
        list.forEach(obj=>{
            if(obj.id === +e.target.value){
                newTitle = obj.nameobject
            }
        })

        setTitle(newTitle)
    }

    const createObj = async () => {
        try{
            console.log(thisobj)
            console.log(login)
            console.log(inn)
            const idobj = thisobj
            const thisObj = await ObjsService.insertObjs({idobj, login, inn})
            setActive(!active)
            setViewMyObjs(thisObj.data)
        } catch {

        }

    }


  //   const insertObj = async () => {
  //       console.log(thisobj)
  //       if(thisobj !== 0) {
  //           let myObj;
  //
  //           objList.forEach(elem => {
  //               if(elem.id == thisobj){
  //                   myObj = elem
  //                   console.log(myObj)
  //               }
  //           })
  //           const listobj = await WeldingService.insertObjs({myObj, user})
  //           // await WeldingService.insertObjs({myObj, user})
  //           message('Объект "' + listobj.data.shifr + '" успешно добавлен')
  //           console.log(listobj.data)
  //           plusObjOnDisplay(listobj.data)
  //           setActive(!active)
  //       }
  //       // console.log(listobj.data)
  //       console.log(title)
  //
  //
  // }


    ///// itle по умолчанию

    ///

    return (
        <div className="new_obj">
            <div className="new_obj_title" id="new_obj_title">{title}</div>
            {/*<div className="new_obj_title" id="new_obj_title">{title}</div>*/}
            <select onChange={e =>{setThisobj(e.target.value)}} id="select_obj">
                {/*<select onFocus={e =>{readInn()}} onChange={e =>{viewTitle(e)}} id="select_obj">*/}
                <option value={''} ></option>
                {list.map((obj, index) => (
                    <option key={index} value={obj.id} >{obj.shifr}</option>
                ))}

            </select>
            {/*<div onClick={()=>createObj()} className="new_obj_btn">Добавить</div>*/}
            <div onClick={()=>createObj()} className="new_obj_btn">Добавить</div>
        </div>
    )
}