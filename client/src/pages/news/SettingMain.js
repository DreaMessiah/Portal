import React,{useEffect, useState} from "react";
import PostService from "../../services/PostService";
import PollsService from "../../services/PollsService";
import "./settings.scss";
import {Link, useNavigate} from "react-router-dom";
import {useMessage} from "../../hooks/message.hook";

export default function SettingMain(){
    const [news,setNews] = useState([])
    const [polls,setPolls] = useState([])
    const [blocks,setBlocks] = useState([])
    const [draggingItem, setDraggingItem] = useState(null)
    const [draggingOver, setDraggingOver] = useState(null)
    const [activeItems, setActiveItems] = useState(0);
    const message = useMessage()
    const navigate = useNavigate()

    const handleDragStart = (e, item) => {
        console.log(item)
        setDraggingItem(item)
    }
    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const handleDragEnter = (e,indexzone) => {
        if (e.relatedTarget && e.currentTarget){
            if(!e.currentTarget.contains(e.relatedTarget)) {
                setActiveItems(activeItems + 1)
                setDraggingOver(blocks.map(item => ({ ...item })))
                const newblocks = [...blocks]
                newblocks[indexzone].block_id = draggingItem.item.id
                newblocks[indexzone].image = draggingItem.item.image
                newblocks[indexzone].title = draggingItem.item.title
                newblocks[indexzone].type = draggingItem.type
                newblocks[indexzone].name = draggingItem.type === 1 ? 'Новость' : 'Опрос'
                setBlocks(newblocks)
            }
        }
    }
    const handleDragLeave = (e) => {
        if (e.relatedTarget && e.currentTarget) {
            if (!e.currentTarget.contains(e.relatedTarget)) {
                setActiveItems(activeItems - 1)
                setBlocks(draggingOver.map(item => ({...item})))
            }
        }
    }
    const handleDrop = (e, zone) => {
        e.preventDefault();

        if (draggingItem) {
            console.log(`Item ${draggingItem.id} dropped into zone ${zone}`)
            setDraggingItem(null)
        }
    }

    const handleSave = async() => {
        try {
            const response = await PostService.saveBlocks(blocks)
            if(response.data){
                message('Расположение элементов записано')
                navigate('/')
            }
        }catch (e) {
            console.log(e)
        }
    }
    const loadingHandler = async () => {
        try{
            const news = await PostService.fetch()
            const polls = await PollsService.fetchPolls()
            const blocks = await PostService.fetchBlocks()

            if(news.data)setNews(news.data)
            if(polls.data)setPolls(polls.data)
            if(blocks.data){
                const settings = [...blocks.data]
                settings.map(item => {
                    let data
                    switch (item.type){
                        case 1:
                            item.name = 'Новость'
                            data = news.data.find(n => n.id === item.block_id)
                            break
                        case 2:
                            item.name = 'Опрос'
                            data = polls.data.find(n => n.id === item.block_id)
                            break
                        default:
                            break
                    }
                    item.title = data.title
                    item.image = data.image
                })
                setBlocks(settings)
            }
        }catch (e) {
            console.log(e?.message)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])
    // useEffect(() => {
    //     if(news && polls && blocks){
    //         blocks.map( item => {
    //
    //             if(item.type === 1){
    //
    //             }
    //         })
    //     }
    // },[news,polls])
    return (
        <div className='setting-main'>
            {news &&
                <div className={`list left`}>
                    <div className={`head`}>Новости</div>
                    {news.map( (item,index) => (
                        <div key={index} draggable onDragStart={(e) => handleDragStart(e, {item,type:1})} className={`item`}>
                            <div className={`title`}>{item.title}</div>
                        </div>
                    ))}
                </div>
            }
            {blocks &&
                <div className={`setting-blocks`}>
                    <div className={`link`}><Link to='/' style={{marginBottom:'30px'}} className='back-button'><i className="fa-solid fa-arrow-left"></i>Назад</Link></div>
                    <h5 onClick={(e) => console.log(blocks)}>Редактирование расположения новостей и опросов на главной странице портала</h5>
                    <div className={`header-btns`}>
                        <div onClick={(e) => handleSave()} className={`button green`}>Опубликовать</div>
                        <Link to={'/'} className={`button red-solid-border`}>Отменить</Link>
                    </div>
                    <div className={`box`}>
                    {blocks.map( (item,index) => (
                        <div onDragLeave={(e) => handleDragLeave(e)} onDragEnter={(e)=> handleDragEnter(e,index)} onDragOver={(e) => handleDragOver(e)} onDrop={(e) => handleDrop(e, item.id)} style={item.image ? item.type === 1 ? {backgroundImage:`url(/files${item.image})`} : {backgroundImage:`url(/files/polls/${item.image})`} : {}} key={index} className={`setting zone`}>
                            <div style={!item.image ? {color:'black'} : {}} className={`name text`}>{item.name}</div>
                            <div style={!item.image ? {color:'black'} : {}} className={`title text`}>{item.title}</div>
                            <div className={item.image && `overlay`}></div>
                        </div>
                    ))}
                    </div>
                </div>
            }
            {polls &&
                <div className={`list rigth`}>
                    <div className={`head`}>Опросы</div>
                    {polls.map( (item,index) => (
                        <div key={index} draggable onDragStart={(e) => handleDragStart(e, {item,type:2})} className={`item`}>
                            <div className={`title`}>{item.title}</div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )

}