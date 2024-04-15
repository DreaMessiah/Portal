import React, { useEffect, useState } from "react";
import "./myobjs.scss";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import {ModalWin} from "../modalwin/ModalWin";
import {PlusMyObjModal} from "./PlusMyObjModal";
import ObjsService from "../../services/ObjsService";
import {Context} from "../../index";

export default function DriveOnProject({mass, page}) {

    let objsLoList = [];

    const  {store} = useContext(Context)

    const inn = store.user.inn
    const login = store.user.login

    const {btns_modules} = useContext(DataContext)

    console.log(btns_modules)

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    // const history = useHistory();
    let getId = searchParams.get('id_object');


    if(getId === null){
        getId = 0
    }


    const [thisURL, setThisURL] = useState(getId)




    const openShifrBlock = (putId) => {

        setThisURL(putId)
        if(thisURL !== 0){
        }

    }




    return (
        <div className='right-block'>
            <div className='top-box'>
                <div className='left-box-portal'>
                    <Link to={thisURL !== 0 ? openShifrBlock(0)  : `/objectsportal`} className='back-button'>
                        <p>Назад</p> <i className='fa-solid fa-rotate-left'></i>
                    </Link>
                    {/*<SearchObj/>*/}
                </div>
                <div className='right-box'>
                    {/*<ChangeObj/>*/}
                </div>
            </div>
            <div className='btn_projects'>
                {btns_modules.map((btn, index)=>(
                    <Link key={index} to={btn.url + '?id=' + getId}  className='btn_project_block'><i className={`${btn.icon}`}/><div>{btn.title}</div></Link>
                    )

                )}
            </div>
        </div>



    )
}