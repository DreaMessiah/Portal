import "./style.scss"
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import FilesService from "../../../services/FilesService";


export const CreatePOST = () => {
    const thisPost = [];
    const [images,setImages] = useState([])

    const imgInputRef = {
        input1: useRef(null),
        input2: useRef(null),
        input3: useRef(null),
        input4: useRef(null),
        input5: useRef(null)
    }

    const loadImage = async (e) => {
        console.log(e.target.files[0])
        const response = await FilesService.loadImage(e.target.files[0])
        console.log(response.data)

        if(response.data){
            setImages([...images,response.data.path])
        }

    }

    return (
        <div className="create_new_post">
            <div className="create_new_post_title">Создание новости</div>
            <div className="create_new_post_tools">
                <div className="create_new_post_tools_plusblock">+ Блок</div>
                <div className="create_new_post_tools_devbtn">in dev</div>
                <div className="create_new_post_tools_publish">Опубликовать</div>
            </div>
            <div className="create_new_post_worklist">
                <input className="create_new_post_worklist_header" placeholder="Введите заголовок новой публикации" />

                <div style={{backgroundImage: `url(${images[0]})`}} onClick={(e) => imgInputRef.input1.current.click()} className="create_new_post_worklist_mainimg">
                    <i className="fa-solid fa-upload"></i>
                    <input onChange={(e) => loadImage(e)} ref={imgInputRef.input1} className='hidden-upload' type='file'/>
                </div>

                <div className="create_new_post_worklist_content">
                    <div className="plus_btn_create_strock">
                        <div className="plus_btn_create_strock_btn">+ content text</div>
                        <div className="plus_btn_create_strock_btn">+ image</div>
                        <div className="plus_btn_create_strock_btn">+ triple block</div>
                        <div className="plus_btn_create_strock_btn">+ description img</div>
                        <div className="plus_btn_create_strock_btn">+ title</div>
                    </div>
                    <textarea className="create_new_post_worklist_content_smalltext" placeholder="Введите текст краткого содержания" ></textarea>
                    <div className="plus_btn_create_strock">
                        <div className="plus_btn_create_strock_btn">+ content text</div>
                        <div className="plus_btn_create_strock_btn">+ image</div>
                        <div className="plus_btn_create_strock_btn">+ triple block</div>
                        <div className="plus_btn_create_strock_btn">+ description img</div>
                        <div className="plus_btn_create_strock_btn">+ title</div>
                    </div>
                    <input className="create_new_post_worklist_content_title" placeholder="Введите текст оглавления" />
                    <div className="plus_btn_create_strock">
                        <div className="plus_btn_create_strock_btn">+ content text</div>
                        <div className="plus_btn_create_strock_btn">+ image</div>
                        <div className="plus_btn_create_strock_btn">+ triple block</div>
                        <div className="plus_btn_create_strock_btn">+ description img</div>
                        <div className="plus_btn_create_strock_btn">+ title</div>
                    </div>
                    <textarea className="create_new_post_worklist_content_longtext"></textarea>
                    <div className="plus_btn_create_strock">
                        <div className="plus_btn_create_strock_btn">+ content text</div>
                        <div className="plus_btn_create_strock_btn">+ image</div>
                        <div className="plus_btn_create_strock_btn">+ triple block</div>
                        <div className="plus_btn_create_strock_btn">+ description img</div>
                        <div className="plus_btn_create_strock_btn">+ title</div>
                    </div>
                    <div className="create_new_post_worklist_content_imgtext">
                        <div style={{backgroundImage: `url(${images[1]})`}} onClick={(e) => imgInputRef.input2.current.click()} className="create_new_post_worklist_content_imgtext_img">
                            <i className="fa-solid fa-upload"></i>
                            <input onChange={(e) => loadImage(e)} ref={imgInputRef.input2} className='hidden-upload' type='file'/>
                        </div>
                        <textarea className="create_new_post_worklist_content_imgtext_text" placeholder="Введите текст описания изображения"></textarea>
                    </div>
                    <div className="plus_btn_create_strock">
                        <div className="plus_btn_create_strock_btn">+ content text</div>
                        <div className="plus_btn_create_strock_btn">+ image</div>
                        <div className="plus_btn_create_strock_btn">+ triple block</div>
                        <div className="plus_btn_create_strock_btn">+ description img</div>
                        <div className="plus_btn_create_strock_btn">+ title</div>
                    </div>
                    <div className="create_new_post_worklist_content_tripleimgs">
                        <div style={{backgroundImage: `url(${images[2]})`}} onClick={(e) => imgInputRef.input3.current.click()} className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e)} ref={imgInputRef.input3} className='hidden-upload' type='file'/></div>
                        <div style={{backgroundImage: `url(${images[3]})`}} onClick={(e) => imgInputRef.input4.current.click()} className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e)} ref={imgInputRef.input4} className='hidden-upload' type='file'/></div>
                        <div style={{backgroundImage: `url(${images[4]})`}} onClick={(e) => imgInputRef.input5.current.click()} className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e)} ref={imgInputRef.input5} className='hidden-upload' type='file'/></div>
                    </div>
                    <div className="plus_btn_create_strock">
                        <div className="plus_btn_create_strock_btn">+ content text</div>
                        <div className="plus_btn_create_strock_btn">+ image</div>
                        <div className="plus_btn_create_strock_btn">+ triple block</div>
                        <div className="plus_btn_create_strock_btn">+ description img</div>
                        <div className="plus_btn_create_strock_btn">+ title</div>
                    </div>
                </div>
            </div>
        </div>
    )
}