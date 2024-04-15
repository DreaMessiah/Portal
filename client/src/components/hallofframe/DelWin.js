
import React from "react";
import {useMessage} from "../../hooks/message.hook";
import MainpageService from "../../services/MainpageService";

export const DelWin = ({active, setActive, inn, man, list, setList, ind, setInd}) => {

    const message = useMessage()

    const delMan = async () => {
        try{
            const deleted = await MainpageService.delBestMan({id:man.id})
            // setListBM(bestMan.data)
            console.log(deleted.data)
        } catch(e) {
            console.log(e)
        }
    }

    const deleteMan = (id) => {
        setActive(false)
        message('Удален из доски почета: ' + man.name)
        delMan()
        let newList = [...list]
        newList.splice(ind, 1)
        console.log(newList)
        setList(newList)
        setInd(undefined)
    }
    console.log(man)
    return (
        <div className="del_hall_edit">
            <div className="del_hall_edit_mess">
                Вы действитель но хотите удалить из доски почета <br/> <span>{man.name} ({man.developer})</span>?
            </div>
            <div className="del_hall_edit_btns">
                <div className="del_hall_edit_btns_cancel" onClick={()=>setActive(false)}>Отмена</div>
                <div className="del_hall_edit_btns_delete" onClick={()=>deleteMan(man.id)}>Удалить</div>
            </div>
        </div>
    )
}