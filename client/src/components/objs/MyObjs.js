import React, { useEffect, useState } from "react";
import "./myobjs.scss";
import {Link, useLocation} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../context/DataContext";
import {ModalWin} from "../modalwin/ModalWin";
import {PlusMyObjModal} from "./PlusMyObjModal";
import ObjsService from "../../services/ObjsService";
import {Context} from "../../index";

export default function MyObjs({mass, page}) {
    console.log(mass)
    let objsLoList = [];

    const  {store} = useContext(Context)

    const inn = store.user.inn
    const login = store.user.login

    const {btns_modules} = useContext(DataContext)

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let getId = searchParams.get('id');


    if(getId === null){
        getId = ''
        console.log(getId)
    }
    const btnsModals = document.querySelectorAll('.btns_module')

    const linkPage = link => {

    }  

    const [modal, setModal] = useState(false)
    const [listObjs, setListObjs] = useState([])
    const [viewMyObjs, setViewMyObjs] = useState([])
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

    const viewAllObjs = async (e) => {

        const viewList = await ObjsService.getObjs({inn})
        setListObjs(viewList.data)
        console.log(viewList.data)
        // setListObjs(viewList.data)
    }

    const getMyObjs = async (e) => {

        const viewList = await ObjsService.listObjsSV({inn, login})
        setViewMyObjs(viewList.data)
        console.log(viewList.data)
    }



    useEffect(() => {
        viewAllObjs()
        getMyObjs()
    }, [])

    console.log(listObjs)
    useEffect(()=> {
        //

        btnsModals.forEach(block => {
            block.innerHTML = ''
        })
        const bottomParams = document.querySelectorAll('.objs_list_item_body_bottom')
        const allObjs = document.querySelectorAll('.objs_list_item')
        if (getId) {

            allObjs.forEach(obj => {

                if (obj.id !== `this_obg_${getId}`) {
                    obj.style.display = 'none'
                } else {

                    bottomParams.forEach(strock => {
                        strock.style.display = 'none'
                    })

                    obj.classList = 'objs_list_item open_obj_anim'

                    const blockIntoBtns = document.getElementById(`btns_module_${getId}`)


                        btnsModals.forEach(block => {
                            block.innerHTML = ''
                        })



                        btns_modules.map((btn,indexBtn) => {
                            let indicate
                            switch (btn.toid) {
                                case 0:
                                    indicate = ''
                                    break
                                case 1:
                                    indicate = getId
                                    break
                            }
                            blockIntoBtns.insertAdjacentHTML('beforeend', `
                           <div class="btn_on_object block_obj_anim" key=${indexBtn} onClick=" window.location.href = '${btn.url}/${indicate}?id=${getId}'">${btn.title}</div>
                           
                            `)
                        })

                    console.log(obj.id)
                }

            })
        }else {
            allObjs.forEach(obj => {
                obj.classList = 'objs_list_item'
                obj.style.width = '30%'
                obj.style.minHeight = '222px'
                obj.style.display = 'flex'


                    btnsModals.forEach(block => {
                        block.innerHTML = ''
                    })

                bottomParams.forEach(strock=>{
                    strock.style.display = 'flex'
                })
            })
        }
    })


    return (
        <div className='right-block'>
            <div className='top-box'>
                <div className='left-box'>
                    <div className='obj_block_button'>
                        <div className='button' onClick={()=>activeModal(modal)}><p>Добавить обьект</p> <i className='fa-regular fa-plus'></i></div>
                        <Link to={getId?`/objects`:`/main`}><div className='button'><p>Назад</p> <i className='fa-solid fa-rotate-left'></i></div></Link>
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
                        <Link key={index} to={`/${page}${page === 'objects' ? '?id=' + item.id : '/' + item.id}`} className='objs_list_item' id={`this_obg_${item.id}`}>
                            <div className="objs_list_item_header"><span>{item.name}</span></div>
                            <div className="objs_list_item_body">
                                <div className="objs_list_item_body_description">
                                    {item.description}
                                </div>
                                <div className="objs_list_item_body_bottom">
                                    <div className="objs_list_item_body_bottom_dateinto">Последнее изменение: {item.dateinto}</div>
                                    <div className="objs_list_item_body_bottom_btn">. . .</div>
                                </div>
                            </div>
                            <div id={`btns_module_${item.id}`} className='btns_module'>

                            </div>
                        </Link>
                    ))}
                    {/*<ModalWin data={<CreateObjModal inn={inn} user={login} arr={objsLoList} title={title} setTitle={setTitle} active={modal} setActive={setModal} listObj={listObjs} stateMass={setListObjs}/>} active={modal} setActive={setModal}/>*/}
                    <ModalWin data={<PlusMyObjModal inn={inn} login={login} list={listObjs} active={modal} setActive={setModal} setViewMyObjs={setViewMyObjs}/>} active={modal} setActive={setModal}/>
                    {/*<ModalWin data={<PlusMyObjModal inn={inn} user={login} arr={objsLoList} title={title} setTitle={setTitle} active={modal} setActive={setModal} listObj={listObjs} stateMass={setListObjs}/>} active={modal} setActive={setModal}/>*/}

                </div>
            </div>
        </div>



    )
}