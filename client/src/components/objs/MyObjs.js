import React, { useEffect, useState } from "react";
import "./myobjs.scss";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import {ModalWin} from "../modalwin/ModalWin";
import {PlusMyObjModal} from "./PlusMyObjModal";
import ObjsService from "../../services/ObjsService";
import {Context} from "../../index";

export default function MyObjs({mass, page}) {
    const  {store} = useContext(Context)
    const location = useLocation()

    const [modal, setModal] = useState(false)
    const [listObjs, setListObjs] = useState([])
    const [viewMyObjs, setViewMyObjs] = useState([])
    const [thisURL, setThisURL] = useState(0)

    const activeModal = active => {
        if(active === false){
            setModal(!active)
            console.log(modal)
        } else {
            setModal(!active)
            console.log(modal)
        }

    }
    const loadingHandler = async () => {
        try {
            const {data} = await ObjsService.listObjsSV()
            if(data) setViewMyObjs(data)
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
                <div className='left-box'>
                    <div className='obj_block_button'>
                        <div className='button' onClick={()=>activeModal(modal)}><p>Добавить обьект</p> <i className='fa-regular fa-plus'></i></div>
                        <Link to={thisURL !== 0 ? openShifrBlock(0)  : `/main`}><div className='button'><p>Назад</p> <i className='fa-solid fa-rotate-left'></i></div></Link>
                    </div>
                    {/*<SearchObj/>*/}
                </div>
                <div className='right-box'>
                    {/*<ChangeObj/>*/}
                </div>
            </div>
            <div className='next-box'>
                <div className='objs_list'>
                    {viewMyObjs.map((item,index) => (
                        <Link key={index} to={'/thisproject?id_object=' + item.id} className='objs_list_item' id={`this_obg_${item.id}`}>
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
                    {/*<ModalWin data={<CreateObjModal inn={inn} user={login} arr={objsLoList} title={title} setTitle={setTitle} active={modal} setActive={setModal} listObj={listObjs} stateMass={setListObjs}/>} active={modal} setActive={setModal}/>*/}

                    {/*<ModalWin data={<PlusMyObjModal inn={inn} user={login} arr={objsLoList} title={title} setTitle={setTitle} active={modal} setActive={setModal} listObj={listObjs} stateMass={setListObjs}/>} active={modal} setActive={setModal}/>*/}

                </div>
            </div>
        </div>



    )
}