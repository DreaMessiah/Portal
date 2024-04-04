import React, { useEffect, useState } from "react";
import "./myobjs.scss";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../../context/DataContext";
import {ModalWin} from "../../modalwin/ModalWin";
import {PlusMyObjModal, PlusMyObjOnModal} from "./PlusMyObjModal";
import ObjsService from "../../../services/ObjsService";
import {Context} from "../../../index";

export default function MyListObjs({mass, page}) {
    console.log(mass)
    let objsLoList = [];

    const  {store} = useContext(Context)

    const inn = store.user.inn
    const login = store.user.login

    const {btns_modules} = useContext(DataContext)

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    // const history = useHistory();
    let getId = searchParams.get('id');


    if(getId === null){
        getId = 0
        console.log(getId)
    }
    const btnsModals = document.querySelectorAll('.btns_module')

    const linkPage = link => {

    }  

    const [modal, setModal] = useState(false)
    const [listObjs, setListObjs] = useState([])
    const [viewMyObjs, setViewMyObjs] = useState([])
    const [thisURL, setThisURL] = useState(getId)
    const [thisU, setThisU] = useState('')
    const [mapObjs, setMapObjs] = useState([])
    const [title, setTitle] = useState('Добавить объект')
    const activeModal = active => {
        if(active === false){
            setModal(!active)
            // setTitle('Добавить объект')
            console.log(modal)
        } else {
            setModal(!active)
            console.log(modal)
        }

    }




    const getMyObjs = async (ist) => {

            const viewList = await ObjsService.listObjsSV({inn, login})

            // const newList = craftList(viewMyObjs, listObjs)
            setViewMyObjs(viewList.data)
            console.log(viewList.data)
            // setMapObjs(newList)
    }

    const viewAllObjs = async (e) => {

        const viewList = await ObjsService.getObjs({inn})
        setListObjs(viewList.data)
        console.log(viewList.data)
    }






    const openShifrBlock = (putId) => {

        setThisURL(putId)
        if(thisURL !== 0){
            console.log(thisURL)
        }

    }

    useEffect(() => {

        viewAllObjs()
        getMyObjs()

    }, [])



    return (
        <div className='right-block'>
            <div className='top-box'>
                <div className='left-box-portal'>
                        <div className='back-button' onClick={()=>activeModal(modal)}><p>Добавить обьект</p> <i className='fa-regular fa-plus'></i></div>
                        <Link to={thisURL !== 0 ? openShifrBlock(0)  : `/main`} className='back-button'><p>Назад</p> <i className='fa-solid fa-rotate-left'></i></Link>
                    {/*<SearchObj/>*/}
                </div>
                <div className='right-box'>
                    {/*<ChangeObj/>*/}
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
                    {/*<ModalWin data={<CreateObjModal inn={inn} user={login} arr={objsLoList} title={title} setTitle={setTitle} active={modal} setActive={setModal} listObj={listObjs} stateMass={setListObjs}/>} active={modal} setActive={setModal}/>*/}
                    <ModalWin data={<PlusMyObjOnModal inn={inn} login={login} list={listObjs} active={modal} setActive={setModal} setViewMyObjs={setViewMyObjs}/>} active={modal} setActive={setModal}/>
                    {/*<ModalWin data={<PlusMyObjModal inn={inn} user={login} arr={objsLoList} title={title} setTitle={setTitle} active={modal} setActive={setModal} listObj={listObjs} stateMass={setListObjs}/>} active={modal} setActive={setModal}/>*/}

                </div>
            </div>
        </div>



    )
}