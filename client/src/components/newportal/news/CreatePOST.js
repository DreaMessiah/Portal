import "./style.scss"
import {Link} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import FilesService from "../../../services/FilesService";
import useDynamicRefs from "../../../hooks/dinamicref.hook";


export const CreatePOST = () => {
    const thisPost = [];
    const [images,setImages] = useState([])

    // const { refs, addRef } = useDynamicRefs();

    const imgInputRef = {
        input1: useRef(null),
        input2: useRef(null),
        input3: useRef(null),
        input4: useRef(null),
        input5: useRef(null)
    }

    const newPost = {
        title: '',
        mainimage: '',
        blocks: [],
        default: [['maintitle',''],['mainimg',''],['smalltext','']]
    }

    const [post, setPost] = useState(newPost)
    const [blocks, setBlocks] = useState([])
    const [temp, setTemp] = useState(newPost.blocks)

    const plusBlock = (index, blck) => {
        const newParams = {name: blck, content: ''}
        const thisBlocksArr = temp
        //console.log(thisBlocksArr)
        thisBlocksArr.splice(index, 0, newParams)
        //console.log(thisBlocksArr)
        //console.log(index)
        //console.log(newPost)
        const newBlocks = newPost.blocks
        //console.log(newBlocks)
        setTemp(thisBlocksArr)
        setBlocks([...blocks,newBlocks])
        // console.log(newParams)
        //
        // console.log(newPost)
        // console.log(blocks)
    }

    const delBlock = (index)=>{
        let newblocks = [...temp]// Создаем копию массива temp
        newblocks.splice(index, 1); // Удаляем элемент по индексу
        setTemp(newblocks); // Обновляем состояние
    }
    const pushValue = event => {
        let index = event.target.name.split("_")
        index = index[1]
        let newblocks = [...temp]
        newblocks[index].content = event.target.value
        setTemp(newblocks)
        console.log(temp)
    }
    useEffect(()=>{
        if(blocks.length > 0) {
            //console.log(blocks)
            console.log(temp)
        }
    }, [blocks])
    //
    // useEffect(() => {
    //     addRef()
    // },[])

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
                    {/*<div className="plus_btn_create_strock">*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ content text</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ image</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ triple block</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ description img</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ title</div>*/}
                    {/*</div>*/}
                    <textarea className="create_new_post_worklist_content_smalltext" placeholder="Введите текст краткого содержания"></textarea>
                    <div className="plus_btn_create_strock">
                        <div className="plus_btn_create_strock_btn" onClick={()=>plusBlock(0, 'content')} name="content">+ content text</div>
                        <div className="plus_btn_create_strock_btn" onClick={()=>plusBlock(0, 'image')} name="image">+ image</div>
                        <div className="plus_btn_create_strock_btn" onClick={()=>plusBlock(0, 'triple')} name="triple">+ triple block</div>
                        <div className="plus_btn_create_strock_btn" onClick={()=>plusBlock(0, 'description')} name="description">+ description img</div>
                        <div className="plus_btn_create_strock_btn" onClick={()=>plusBlock(0, 'title')} name="title">+ title</div>
                    </div>

                    {temp.map((block, index) => {
                        // let rem = ''
                        // if(block[index].name === 'content'){
                        //     rem = `<textarea className="create_new_post_worklist_content_longtext"></textarea>`
                        // } else {
                        //     rem = `<textarea className="create_new_post_worklist_content_longtext"></textarea>`
                        // }
                        return (

                        <span key={index}>
                            {(block.name === 'content')?(<textarea className="create_new_post_worklist_content_longtext" name={`content_${index}`} onChange={pushValue}></textarea>):''}
                            {(block.name === 'image')?(
                                <div style={{backgroundImage: `url(${images[0]})`}} onClick={(e) => imgInputRef.input1.current.click()} className="create_new_post_worklist_mainimg">
                                    <i className="fa-solid fa-upload"></i>
                                    <input onChange={(e) => loadImage(e)} ref={imgInputRef.input1} className='hidden-upload' type='file'/>
                                </div>
                            ):''}
                            {(block.name === 'triple')?(
                                <div className="create_new_post_worklist_content_tripleimgs">
                                    <div style={{backgroundImage: `url(${images[2]})`}} onClick={(e) => imgInputRef.input3.current.click()} className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e)} ref={imgInputRef.input3} className='hidden-upload' type='file'/></div>
                                    <div style={{backgroundImage: `url(${images[3]})`}} onClick={(e) => imgInputRef.input4.current.click()} className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e)} ref={imgInputRef.input4} className='hidden-upload' type='file'/></div>
                                    <div style={{backgroundImage: `url(${images[4]})`}} onClick={(e) => imgInputRef.input5.current.click()} className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e)} ref={imgInputRef.input5} className='hidden-upload' type='file'/></div>
                                </div>
                            ):''}
                            {(block.name === 'description')?(
                                <div className="create_new_post_worklist_content_imgtext">
                                    <div style={{backgroundImage: `url(${images[1]})`}} onClick={(e) => imgInputRef.input2.current.click()} className="create_new_post_worklist_content_imgtext_img">
                                        <i className="fa-solid fa-upload"></i>
                                        <input onChange={(e) => loadImage(e)} ref={imgInputRef.input2} className='hidden-upload' type='file'/>
                                    </div>
                                    <textarea className="create_new_post_worklist_content_imgtext_text" placeholder="Введите текст описания изображения"  name={`description_${index}`} onChange={pushValue}></textarea>
                                </div>
                            ):''}
                            {(block.name === 'title')?(<input className="create_new_post_worklist_content_title" placeholder="Введите текст оглавления"  name={`title_${index}`} onChange={pushValue}/>):''}
                            <div className="plus_btn_create_strock">
                                <div className="plus_btn_create_strock_btn"
                                     onClick={() => plusBlock(index + 1, 'content')}
                                     name="content">+ content text </div>
                                <div className="plus_btn_create_strock_btn"
                                     onClick={() => plusBlock(index + 1, 'image')} name="image">+ image</div>
                                <div className="plus_btn_create_strock_btn"
                                     onClick={() => plusBlock(index + 1, 'triple')} name="triple">+ triple block</div>
                                <div className="plus_btn_create_strock_btn"
                                     onClick={() => plusBlock(index + 1, 'description')} name="description">+ description img</div>
                                <div className="plus_btn_create_strock_btn"
                                     onClick={() => plusBlock(index + 1, 'title')} name="title">+ title</div>
                                <div className="plus_btn_create_strock_btn" style={{border: '1px solid red', color: 'red !important'}}
                                     onClick={() => delBlock(index, blocks)} name="del"> Удалить </div>
                            </div>
                        </span>
                        )})}
                    {/*<input className="create_new_post_worklist_content_title" placeholder="Введите текст оглавления" />*/}
                    {/*<div className="plus_btn_create_strock">*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ content text</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ image</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ triple block</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ description img</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ title</div>*/}
                    {/*</div>*/}
                    {/*<textarea className="create_new_post_worklist_content_longtext"></textarea>*/}
                    {/*<div className="plus_btn_create_strock">*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ content text</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ image</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ triple block</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ description img</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ title</div>*/}
                    {/*</div>*/}
                    {/*<div className="create_new_post_worklist_content_imgtext">*/}
                    {/*    <div style={{backgroundImage: `url(${images[1]})`}} onClick={(e) => imgInputRef.input2.current.click()} className="create_new_post_worklist_content_imgtext_img">*/}
                    {/*        <i className="fa-solid fa-upload"></i>*/}
                    {/*        <input onChange={(e) => loadImage(e)} ref={imgInputRef.input2} className='hidden-upload' type='file'/>*/}
                    {/*    </div>*/}
                    {/*    <textarea className="create_new_post_worklist_content_imgtext_text" placeholder="Введите текст описания изображения"></textarea>*/}
                    {/*</div>*/}
                    {/*<div className="plus_btn_create_strock">*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ content text</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ image</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ triple block</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ description img</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ title</div>*/}
                    {/*</div>*/}
                    {/*<div className="create_new_post_worklist_content_tripleimgs">*/}
                    {/*    <div style={{backgroundImage: `url(${images[2]})`}} onClick={(e) => imgInputRef.input3.current.click()} className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e)} ref={imgInputRef.input3} className='hidden-upload' type='file'/></div>*/}
                    {/*    <div style={{backgroundImage: `url(${images[3]})`}} onClick={(e) => imgInputRef.input4.current.click()} className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e)} ref={imgInputRef.input4} className='hidden-upload' type='file'/></div>*/}
                    {/*    <div style={{backgroundImage: `url(${images[4]})`}} onClick={(e) => imgInputRef.input5.current.click()} className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e)} ref={imgInputRef.input5} className='hidden-upload' type='file'/></div>*/}
                    {/*</div>*/}
                    {/*<div className="plus_btn_create_strock">*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ content text</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ image</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ triple block</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ description img</div>*/}
                    {/*    <div className="plus_btn_create_strock_btn">+ title</div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}