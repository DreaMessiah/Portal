import React, { useEffect, useState } from "react";
import "./myobjs.scss";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import {ModalWin} from "../modalwin/ModalWin";
import {PlusMyObjModal} from "./PlusMyObjModal";
import ObjsService from "../../services/ObjsService";
import {Context} from "../../index";
import ModalFiles from "../modalwin/ModalFiles";
import PassObj from "./modalactive/PassObj";

export default function DriveOnProject({mass, page}) {

    let objsLoList = [];

    const  {store} = useContext(Context)

    const inn = store.user.inn
    const login = store.user.login
    const rule = store.user.unit
    const {btns_modules} = useContext(DataContext)

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    // const history = useHistory();
    let getId = searchParams.get('id_object');


    if(getId === null){
        getId = 0
    }


    const [thisURL, setThisURL] = useState(getId)
    const [passactive, setPassactive] = useState(false)
    const [alluser, setAllusers] = useState([])
    const [listuser, setListusers] = useState([])
    const [activeusers, setActiveusers] = useState([])

    const openShifrBlock = (putId) => {

        setThisURL(putId)
        if(thisURL !== 0){
        }

    }

    const makeList = () => {
        let newarr = []
        let renameobj = {}
        listuser.forEach(user=>{
            renameobj = user
            alluser.forEach(man=> {
                if(user.user_id === man.id){
                    renameobj.full_name = man.full_name
                }
            })
            newarr.push(renameobj)
        })
        setActiveusers(newarr)
    }

    const getListusers = async () => {
        try{
            const users = await ObjsService.getUsersList()
            setAllusers(users.data)
            const {data} = await ObjsService.dataOfObj({idobj: getId})
            setListusers(data)

        }catch(e){

        }

    }

    useEffect(()=>{
       getListusers()
    }, [])

    useEffect(()=>{
        makeList()
    }, [alluser, listuser])
    return (
        <div className='right-block'>
            <div className='top-box'>
                <div className='left-box-portal'>
                    <Link to={thisURL !== 0 ? openShifrBlock(0)  : `/objectsportal`} className='back-button'>
                        <p>Назад</p> <i className='fa-solid fa-rotate-left'></i>
                    </Link>
                    <div className='back-button' onClick={()=>setPassactive(!passactive)}>
                        <p>Передать</p>
                    </div>
                    {/*<SearchObj/>*/}
                </div>
                <div className='right-box'>
                    {/*<ChangeObj/>*/}
                </div>
            </div>
            <div className='btn_projects'>
                {btns_modules.map((btn, index)=>(
                    <Link style={((rule > 1 && btn.title === 'Сварщики') || (rule > 0 && btn.title !== 'Сварщики'))?{display: 'flex'}:{display: 'none'}} key={index} to={btn.url + '?id=' + getId}  className='btn_project_block'><i className={`${btn.icon}`}/><div>{btn.title}</div></Link>
                    )

                )}
            </div>
            <div className="autrosblock">
                <div className="autrosblock_title">Создал (только этот пользователь может передать): </div>
                <div className="autrosblock_papa">
                    {activeusers.map((man, index)=>{
                        if(+man.papa === +man.user_id){return ( <div key={index}>{man.full_name}</div> )}}
                    )}
                </div>
                <div className="autrosblock_title">
                    Пользователи, которые работают с объектом:
                </div>
                <div className="autrosblock_users">
                    {activeusers.map((man, index)=>{
                            if(+man.papa !== +man.user_id){return ( <div key={index}>{man.full_name}; </div> )}
                    })}
                </div>
            </div>
            <ModalFiles data={<PassObj getId={getId} active={passactive} setActive={setPassactive} />} active={passactive} setActive={setPassactive} />
        </div>



    )
}