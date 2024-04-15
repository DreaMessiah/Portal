import React, { useEffect, useState } from "react";
import "./myobjs.scss";
import {Link, useLocation} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../../context/DataContext";
import {ModalWin} from "../../modalwin/ModalWin";
import {PlusMyObjOnModal} from "./PlusMyObjModal";
import ObjsService from "../../../services/ObjsService";
import {Context} from "../../../index";

export default function MyListObjs() {
    const  {store} = useContext(Context)

    const inn = store.user.inn
    const login = store.user.login

    const location = useLocation();

    const [modal, setModal] = useState(false)
    const [listObjs, setListObjs] = useState([])
    const [viewMyObjs, setViewMyObjs] = useState([])
    const [thisURL, setThisURL] = useState(0)

    const loadingHandler = async () => {
        try {
            const {data} = await ObjsService.listObjsSV()
            if(data) setViewMyObjs(data)
            console.log(data)
            const viewList = await ObjsService.getObjs()
            setListObjs(viewList.data)
        }catch (e) {
            console.log(e)
        }
    }

    const openShifrBlock = (putId) => {
        setThisURL(putId)
        if(thisURL !== 0){
            console.log(thisURL)
        }
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const getId = searchParams.get('id') ? searchParams.get('id') : 0;
        setThisURL(getId)
        loadingHandler()
    }, [])

    return (
        <div className='right-block'>
            <div className='top-box'>
                <div className='left-box-portal'>
                        <div className='back-button' onClick={(e) => setModal(true)}><p>Добавить обьект</p> <i className='fa-regular fa-plus'></i></div>
                        <Link to={thisURL !== 0 ? openShifrBlock(0)  : `/`} className='back-button'><p>Назад</p> <i className='fa-solid fa-rotate-left'></i></Link>
                </div>
                <div className='right-box'>
                </div>
            </div>
            <div className='next-box'>
                <div className='objs_list'>
                    {viewMyObjs.map((item,index) => (
                        <Link key={index} to={'/thisobjsportal?id_object=' + item.id} className='objs_list_item' id={`this_obg_${item.id}`}>
                            <div className="objs_list_item_header"><span>{item.shifr}</span></div>
                            <div className="objs_list_item_body">
                                <div className="objs_list_item_body_description">
                                    {item.nameobject}
                                </div>
                                <div className="objs_list_item_body_bottom">
                                    <div className="objs_list_item_body_bottom_dateinto">
                                        {/*Последнее изменение: */}
                                    </div>
                                    <div className="objs_list_item_body_bottom_btn">. . .</div>
                                </div>
                            </div>
                            <div id={`btns_module_${item.id}`} className='btns_module'>

                            </div>
                        </Link>
                    ))}
                    <ModalWin data={<PlusMyObjOnModal loading={loadingHandler} list={listObjs} active={modal} setActive={setModal} setViewMyObjs={setViewMyObjs}/>} active={modal} setActive={setModal}/>
                </div>
            </div>
        </div>



    )
}