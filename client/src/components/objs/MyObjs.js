import React, { useEffect, useState } from "react";
import "./myobjs.scss";
import {Link, useLocation} from "react-router-dom";
import {useContext} from "react";
import {DataContext} from "../../context/DataContext";



export default function MyObjs({mass, page}) {

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

    console.log(btnsModals)
    useEffect(()=> {
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
        <div className='objs_list'>
            {mass.map((item,index) => (
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
        </div>
    )
}