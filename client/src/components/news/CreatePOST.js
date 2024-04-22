import "./style.scss"
import {Link, useLocation, useNavigate} from "react-router-dom";
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import FilesService from "../../services/FilesService";
import {useMessage} from "../../hooks/message.hook";
import PostService from "../../services/PostService";
import {Context} from "../../index";


export const CreatePOST = () => {
    const location = useLocation()
    const {store} = useContext(Context)
    const [temp, setTemp] = useState([])
    const [startRef,setStartRef] = useState([{id:-1,title:'',content:'',ref:useRef(null),image:''}])
    const [empty,setEmpty] = useState([])
    const [viewId,setViewId] = useState(0)
    const [oncomment,setOncomment] = useState(false)
    const navigate = useNavigate()
    const message = useMessage()
    const PlusBlock = (index, blck) => {
        const newParams = {id: index,name: blck, content: '',ref:[{ current: null },{ current: null },{ current: null }],images: ['','','']}
        const thisBlocksArr = [...temp]
        thisBlocksArr.splice(index-1, 0, newParams)
        setTemp(thisBlocksArr)
        setEmpty([])
    }
    const delBlock = (index)=>{
        let newblocks = [...temp]// Создаем копию массива temp
        newblocks.splice(index-1, 1); // Удаляем элемент по индексу
        setTemp(newblocks); // Обновляем состояние
    }
    const pushHeader = (event,type) => {
        if(empty.length) checkEmpty()
        const newblock = [...startRef]
        if(type) newblock[0].title = event.target.value
        else newblock[0].content = event.target.value
        setStartRef(newblock)
    }
    const pushValue = (event,index) => {
        if(empty.length) checkEmpty()
        let newblocks = [...temp]
        newblocks[index-1].content = event.target.value
        setTemp(newblocks)
    }
    const loadImage = async (e,index=0,num = 0) => {
        const response = await FilesService.loadImage(e.target.files[0])
        if(response.err) message('Файл не является изображением')
        if(response.data){
            if(index ===-1){
                const updatedStartRef = [...startRef]
                updatedStartRef[0].image = response.data.path
                setStartRef(updatedStartRef)
            }else{
                console.log(temp)
                const updatedInputs = [...temp]
                updatedInputs[index-1].images[num] = response.data.path
                console.log(updatedInputs[index])
                setTemp(updatedInputs)
            }
        }
        if(empty.length) checkEmpty()
    }
    const createDto = (data) => {
        if(data.length){
            return data.map( item => {
                return {name:item.name,content:item.content,images:item.images}
            })
        }
        return []
    }
    const checkEmpty = () => {
        const n = [...empty]

        n[105] = !!!startRef[0].title.trim().length
        n[106] = !!!startRef[0].image.trim().length
        n[107] = !!!startRef[0].content.trim().length

        if(temp.length){
            temp.map((item,index) => {
                const indexB = index + 1
                switch (item.name) {
                    case 'image':
                        n[indexB] = !!!item.images[0].length
                        break
                    case 'description':
                        n[indexB*100] = !!!item.images[0].length
                        n[indexB*100+1] = !!!item.content.trim().length
                        break
                    case 'title' || 'content':
                        n[indexB] = !!!item.content.trim().length
                        break
                    case 'triple':
                        n[indexB*100] = !!!item.images[0].length
                        n[indexB*100+1] = !!!item.images[1].length
                        n[indexB*100+2] = !!!item.images[2].length
                        break
                }
            })
        }
        const hasTrueValue = n.some(value => value === true);
        if( hasTrueValue ) setEmpty(n)
        else setEmpty([])
        return hasTrueValue
    }
    const createHandler = async () => {
        try {
            if(checkEmpty()) message('Заполните выделенные поля')
            else {
                const data = createDto(temp)
                const response = await PostService.createPost(viewId ? viewId : 'new',startRef[0].title,startRef[0].content,startRef[0].image,data,!oncomment)
                if(response.data) {
                    console.log(response.data)
                    message(viewId ? 'Новость Обновлена' : 'Новость Добавлена')
                    navigate('/alllistnews')
                }
            }
        }catch (e) {
            console.log(e?.message)
        }

    }
    const cancelHandler = () => {
        navigate('/alllistnews')
    }
    const loadingHandler = async (getPost) => {
        try {
            if(getPost){
                setViewId(getPost)
                const response = await PostService.fetchSetting(getPost)
                if(response.data){
                    const newStaff = response.data
                    const ref = [...startRef]
                    ref[0].id = newStaff.id
                    ref[0].title = newStaff.title
                    ref[0].content = newStaff.text
                    ref[0].image = newStaff.image

                    const newTemp = JSON.parse(newStaff.json_data).map( item => ({...item,ref:[{ current: null },{ current: null },{ current: null }]}))
                    setTemp(newTemp)
                    setStartRef(ref)
                    setOncomment(!newStaff.oncomment)
                    console.log(newStaff)
                }
            }
        }catch (e) {
            console.log(e?.message)
        }
    }
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const getPost = searchParams.get('post') ? searchParams.get('post') : 0
        loadingHandler(getPost)
    }, [location])

    const rule = store.user.unit
    return (
        <>
            {rule === 3 ?
        <div className="create_new_post">
            <div onClick={(e) => console.log(startRef)} className="create_new_post_title">Создание новости</div>
            <div className="create_new_post_tools">
                <div onClick={() => createHandler()} className="create_new_post_tools_publish">Опубликовать</div>
                <div onClick={() => cancelHandler()} className="create_new_post_tools_publish red-solid-border">Отменить</div>
            </div>
            <div className="create_new_post_worklist">
                <input value={startRef[0].title} className={`create_new_post_worklist_header ${empty[105] ? 'red-border' : ''}`} onChange={(e) => pushHeader(e,true)} placeholder="Введите заголовок новой публикации" />

                <div style={startRef[0].image.length ? {backgroundImage: `url(/files/news/images/${startRef[0].image})`} : {}} onClick={(e) => startRef[0].ref.current.click()} className={`create_new_post_worklist_mainimg ${empty[106] ? 'red-border' : ''}`}>
                    <i className="fa-solid fa-upload"></i>
                    <input onChange={(e) => loadImage(e,-1)} ref={startRef[0].ref} className='hidden-upload' type='file'/>
                </div>

                <div className="create_new_post_worklist_content">
                    <textarea value={startRef[0].content} onChange={(e) => pushHeader(e,false)} className={`create_new_post_worklist_content_smalltext ${empty[107] ? 'red-border' : ''}`} placeholder="Введите текст краткого содержания"></textarea>
                    <div className="plus_btn_create_strock">
                        <div className="plus_btn_create_strock_btn" onClick={()=>PlusBlock(1, 'content')} name="content">+ content text</div>
                        <div className="plus_btn_create_strock_btn" onClick={()=>PlusBlock(1, 'image')} name="image">+ image</div>
                        <div className="plus_btn_create_strock_btn" onClick={()=>PlusBlock(1, 'triple')} name="triple">+ triple block</div>
                        <div className="plus_btn_create_strock_btn" onClick={()=>PlusBlock(1, 'description')} name="description">+ description img</div>
                        <div className="plus_btn_create_strock_btn" onClick={()=>PlusBlock(1, 'title')} name="title">+ title</div>
                    </div>

                    {temp.map((block, index) => {
                        index = index+1
                        return (

                        <span key={index}>
                            {(block.name === 'content')?(<textarea value={block.content} className={`create_new_post_worklist_content_longtext ${empty[index] ? 'red-border' : ''}`} name={`content_${index}`} onChange={(e) => pushValue(e,index)}></textarea>):''}
                            {(block.name === 'image')?(
                                <div style={block.images[0].length ? {backgroundImage: `url(/files/news/images/${block.images[0]})`} : {}} onClick={(e) => block.ref[0].current.click()} className={`create_new_post_worklist_mainimg ${empty[index] ? 'red-border' : ''}`}>
                                    <i className="fa-solid fa-upload"></i>
                                    <input onChange={(e) => loadImage(e,index)} ref={block.ref[0]} className='hidden-upload' type='file'/>
                                </div>
                            ):''}
                            {(block.name === 'triple')?(
                                <div className={`create_new_post_worklist_content_tripleimgs ${empty[(index)*100] || empty[(index)*100+1] || empty[(index)*100 + 2] ? 'red-border' : ''}`}>
                                    <div style={block.images[0].length ? {backgroundImage: `url(/files/${block.images[0]})`} : {}} onClick={(e) => block.ref[0].current.click()} className={`create_new_post_worklist_content_tripleimgs_img ${empty[(index)*100] ? 'red-border' : ''}`}><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e,index,0)} ref={block.ref[0]} className='hidden-upload' type='file'/></div>
                                    <div style={block.images[1].length ? {backgroundImage: `url(/files/${block.images[1]})`} : {}} onClick={(e) => block.ref[1].current.click()} className={`create_new_post_worklist_content_tripleimgs_img ${empty[(index)*100+1] ? 'red-border' : ''}`}><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e,index,1)} ref={block.ref[1]} className='hidden-upload' type='file'/></div>
                                    <div style={block.images[2].length ? {backgroundImage: `url(/files/${block.images[2]})`} : {}} onClick={(e) => block.ref[2].current.click()} className={`create_new_post_worklist_content_tripleimgs_img ${empty[(index)*100+2] ? 'red-border' : ''}`}><i className="fa-solid fa-upload"></i><input onChange={(e) => loadImage(e,index,2)} ref={block.ref[2]} className='hidden-upload' type='file'/></div>
                                </div>
                            ):''}
                            {(block.name === 'description')?(
                                <div className={`create_new_post_worklist_content_imgtext ${empty[(index)*100] || empty[(index)*100+1]? 'red-border' : ''}`}>
                                    <div style={block.images[0].length ? {backgroundImage: `url(/files/news/images/${block.images[0]})`} : {}} onClick={(e) => block.ref[0].current.click()} className={`create_new_post_worklist_content_imgtext_img ${empty[(index)*100] ? 'red-border' : ''}`}>
                                        <i className="fa-solid fa-upload"></i>
                                        <input onChange={(e) => loadImage(e,index)} ref={block.ref[0]} className='hidden-upload' type='file'/>
                                    </div>
                                    <textarea value={block.content} className={`create_new_post_worklist_content_imgtext_text ${empty[(index)*100+1] ? 'red-border' : ''}`} placeholder="Введите текст описания изображения"  name={`description_${index}`} onChange={(e) => pushValue(e,index)}></textarea>
                                </div>
                            ):''}
                            {(block.name === 'title')?(<input value={block.content} className={`create_new_post_worklist_content_title ${empty[index] ? 'red-border' : ''}`} placeholder="Введите текст оглавления"  name={`title_${index}`} onChange={(e) => pushValue(e,index)}/>):''}
                            <div className="plus_btn_create_strock">
                                <div className="plus_btn_create_strock_btn"
                                     onClick={() => PlusBlock(index + 1, 'content')}
                                     name="content">+ content text </div>
                                <div className="plus_btn_create_strock_btn"
                                     onClick={() => PlusBlock(index + 1, 'image')} name="image">+ image</div>
                                <div className="plus_btn_create_strock_btn"
                                     onClick={() => PlusBlock(index + 1, 'triple')} name="triple">+ triple block</div>
                                <div className="plus_btn_create_strock_btn"
                                     onClick={() => PlusBlock(index + 1, 'description')} name="description">+ description img</div>
                                <div className="plus_btn_create_strock_btn"
                                     onClick={() => PlusBlock(index + 1, 'title')} name="title">+ title</div>
                                <div className="plus_btn_create_strock_btn" style={{border: '1px solid red', color: 'red !important'}}
                                     onClick={() => delBlock(index)} name="del"> Удалить </div>
                            </div>
                        </span>
                        )})}
                </div>
                <label className="checkbox-container">
                    <input type="checkbox" checked={oncomment} onChange={(e) => setOncomment(!oncomment)} />
                    <span className="checkmark"></span>
                    Запретить коментирование
                </label>
            </div>
        </div>
            :
            <div>У Вас нет прав на просмотр данного ресурса</div>
            }
        </>
    )
}