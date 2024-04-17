import React, { useEffect, useState } from "react";
import "../myobjs.scss";
import Select from "react-select";
import ObjsService from "../../../services/ObjsService";
import {useMessage} from "../../../hooks/message.hook";

export default function PassObj({getId, active, setActive }) {

    const [thisuser, setThisuser] = useState([])
    const [listuser, setListuser] = useState([])
    const message = useMessage()
    const getUsers = async (e) => {
        try {
            const users = await ObjsService.getUsersList()

            let i = 0
            users.data.forEach(man => {
                man.label = man.full_name + '  ' + man.developer
                man.value = man.tn
                man.index = i
                i++
            })
            setListuser(users.data)
        }catch{
        }
    }

    const pullObj = async () => {
        try{
            const passresult = await ObjsService.passObj({object_id: getId, user_id: thisuser.id, login: thisuser.login})
            if(passresult.data){
                message('Объект передан')

            }
        }catch{
            message('Попробуйте позже')
        }
        setActive(!active)

    }

    useEffect(()=>{
        getUsers()
    }, [])

    return (
        <div className='pass_block'>
            <div className='pass_block_title'>Необходимо выбрать получателя</div>
            <Select onChange={(e) => setThisuser(listuser[e.index])} value={thisuser} options={listuser} styles={{container:(baseStyles, state) => ({...baseStyles,width:'290px'})}}/>
            <div className='pass_block_btns'>
                <div className='pass_block_btns_pass' onClick={()=>pullObj()}>Передать</div>
                <div className='pass_block_btns_cancel' onClick={()=>setActive(!active)}>Отмена</div>
            </div>
        </div>
    )
}