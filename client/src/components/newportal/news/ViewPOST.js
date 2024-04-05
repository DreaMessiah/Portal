import "./style.scss"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import PostService from "../../../services/PostService";
import formatDate from "../../functions/formatDate";
import {check} from "express-validator";
import {useMessage} from "../../../hooks/message.hook";
import formatDateTime from "../../functions/formatDateTime";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import ModalFiles from "../../modalwin/ModalFiles";
import shortenText from "../../functions/shortenText";


export const ViewPOST = observer( () => {
    const location = useLocation();
    const {store} = useContext(Context)
    const navigate = useNavigate()
    const [viewId,setViewId] = useState(0)
    const [post,setPost] = useState()
    const [next,setNext] = useState()
    const [prev,setPrev] = useState()
    const [deleteIndex,setDeleteIndex] = useState(-1)
    const [deleteActive,setDeleteActive] = useState(false)

    const [changeComment,setChangeComment] = useState(-1)
    const [changeCommentText,setChangeCommentText] = useState('')

    const [comment,setComment] = useState('')
    const [comments,setComments] = useState([])
    const [visibleCount,setVisibleCount] = useState(3)
    const message = useMessage()



    const loadingHandler = async (getPost) => {
        try {
            setViewId(getPost)
            const response = await PostService.fetchPost(getPost)
            if(response.data){
                setPost(response.data)
                const ids = await PostService.fetchList()
                if(ids.data){
                    const newsIds = ids.data
                    const currentIndex = newsIds.indexOf(+getPost);
                    const nextIndex = currentIndex !== -1 && currentIndex !== newsIds.length - 1 ? currentIndex + 1 : null;
                    const prevIndex = currentIndex !== -1 && currentIndex !== 0 ? currentIndex - 1 : null;
                    setNext(nextIndex !== null ? newsIds[nextIndex] : null)
                    setPrev(prevIndex !== null ? newsIds[prevIndex] : null)
                }
                const comm = await PostService.getComments(getPost)
                if(comm.data.length){
                    setComments(comm.data)
                }else {
                    setComments([])
                }
            }
        }catch (e) {
            console.log(e?.message)
        }
    }
    const blockNext = (event,to) => {
        if (!next) event.preventDefault()
        else navigate(to)
    }
    const blockPrev = (event,to) => {
        if (!prev) event.preventDefault()
        else navigate(to)
    }
    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 10)
    }
    const saveCommentHandler = async (index) => {
        try {
            if(changeCommentText.length){
                const response = await PostService.changeComment(comments[index].id,changeCommentText)
                if(response.data){
                    const newComments = [...comments]
                    newComments[index].text = changeCommentText
                    setComments(newComments)
                }
                setChangeComment(-1)
            }else{
                message('Комментарий не может быть пустым')
            }
        }catch (e) {
            console.log(e)
        }
    }
    const changeCommentHandler = (index) => {
        setChangeComment(index)
        setChangeCommentText(comments[index].text)
    }
    const commentWriteHandler = (value) => {
        if(value.length<1000){
            setComment(value)
        }
    }
    const sendCommentHandler = async () => {
        try {
            if(comment.length) {
                const response = await PostService.newComment(viewId, comment)
                if (response.data) {
                    const newComment = {...response.data, avatar: store.user.avatar,full_name:store.user.full_name}
                        setComments([newComment,...comments])
                        setComment('')
                } else {
                    message('Напишите коментарий перед отправкой')
                }
            }
        }catch (e) {
            console.log(e)
        }
    }
    const deleteCommentHandler = async (index) => {
        try {
            const response = await PostService.deleteComment(comments[index].id)
            console.log(response.data)
            if(response.data){
                const newComments = [...comments]
                newComments.splice(index, 1);
                setComments(newComments)
                setDeleteIndex(-1)
                setDeleteActive(false)
                message('Комментарий удален')
            }
            setChangeComment(-1)
        }catch (e) {
            console.log(e)
        }
    }
    const deleteButtonHandler = (index) => {
        setDeleteActive(true)
        setDeleteIndex(index)
    }
    const cancelDeleteHandler = () => {
        setDeleteActive(false)
        setDeleteIndex(-1)
    }

    function Delete(){
        return(
            <div className={`delete-box`}>
                <p>Вы действиельно желаете удалить комментарий <span>"{comments[deleteIndex] && shortenText(comments[deleteIndex].text,6)}"</span>?</p>
                <div className={`buttons`}>
                    <div onClick={(e) => deleteCommentHandler(deleteIndex)} className={`button`}>Да</div>
                    <div onClick={(e) => cancelDeleteHandler()} className={`button`}>Нет</div>
                </div>
            </div>
        )
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const getPost = searchParams.get('post') ? searchParams.get('post') : 0
        loadingHandler(getPost)
    }, [location])

    const rule = store.user.unit
    return (
        <div className="view_new_post">
            <div className="view_new_post_tools">
                <Link to='/alllistnews' className="view_new_post_tools_plusblock">Все новости</Link>
                <span>
                    <Link to={`/viewpost?post=${prev}`} onClick={(e) => blockPrev(e,`/viewpost?post=${prev}`)} className={`view_new_post_tools_publish ${!prev && 'disable'}`}>Предыдущая новость</Link>
                    <Link to={`/viewpost?post=${next}`} onClick={(e) => blockNext(e,`/viewpost?post=${next}`)} className={`view_new_post_tools_publish ${!next && 'disable'}`}>Следующая новость</Link>
                </span>

            </div>
            {post &&
                <div className="view_new_post_worklist">
                    <div className="view_new_post_worklist_header" >{post[0].title}</div>
                    <div style={post[0].image.length ? {backgroundImage:`url(/files${post[0].image})`} : {}} className={`view_new_post_worklist_mainimg ${+viewId === 15 && 'biggest'}`}></div>
                    <div className="view_new_post_worklist_content">
                        <div className="view_new_post_worklist_content_smalltext">{post[0].content}</div>

                        {post.slice(1).map((item,index) => (
                            <span key={index}>
                            {item.name === 'title' && <div className="view_new_post_worklist_content_title">{item.content}</div>}
                                {item.name === 'content' && <div className="view_new_post_worklist_content_longtext">{item.content}</div>}
                                {item.name === 'image' && <div style={item.image[0].length ? {backgroundImage:`url(/files${item.image[0]})`} : {}} className="view_new_post_worklist_mainimg big"></div>}
                                {item.name === 'triple' &&
                                    <div className="view_new_post_worklist_content_tripleimgs">
                                        <div style={item.image[0].length ? {backgroundImage:`url(/files${item.image[0]})`} : {}} className="view_new_post_worklist_content_tripleimgs_img"></div>
                                        <div style={item.image[1].length ? {backgroundImage:`url(/files${item.image[1]})`} : {}} className="view_new_post_worklist_content_tripleimgs_img"></div>
                                        <div style={item.image[2].length ? {backgroundImage:`url(/files${item.image[2]})`} : {}} className="view_new_post_worklist_content_tripleimgs_img"></div>
                                    </div>
                                }
                                {item.name === 'description' &&
                                    <div className="view_new_post_worklist_content_imgtext">
                                        <div style={item.image[0].length ? {backgroundImage:`url(/files${item.image[0]})`} : {}} className="view_new_post_worklist_content_imgtext_img"></div>
                                        <div className="view_new_post_worklist_content_imgtext_text">{item.content}</div>
                                    </div>
                                }
                        </span>
                        ))}

                    </div>
                    {post && post[0].oncomment ?
                    <div className={`history_messs`} >
                        <div className={`title`} onClick={(e) => console.log(post)}>Коментарии</div>
                        <div className="history_mess_pen" >
                            <textarea className="history_mess_pen_letter" id='textmess' value={comment} onChange={(e)=>commentWriteHandler(e.target.value)}/>
                            <div className="history_mess_pen_btn" onClick={() => sendCommentHandler()}>Отправить<i className="fa-regular fa-paper-plane"/></div>
                        </div>

                        <div className="history_mess_list">
                            {comments && comments.slice(0,visibleCount).map((mess, index) => (
                                <div className="history_mess_list_block " key={index}>
                                    <div className="history_mess_list_block_ava" onClick={() => console.log(mess)} style={mess.avatar.length ? {backgroundImage: `url("files/profile/${mess.avatar}")` } : {backgroundImage: `url("files/profile/face.png")` }}></div>
                                    <div className="history_mess_list_block_content" >
                                        <div className="history_mess_list_block_content_name" >
                                            <p>{mess.full_name} {changeComment===index && '(Редактирование комментария)'}</p>
                                            { ( rule === 3 || store.user.tn === mess.creator_tn ) ?
                                            <p className={`icons`} >
                                                {store.user.tn === mess.creator_tn &&
                                                    <>
                                                        {changeComment !== index ?
                                                            <i onClick={(e) => changeCommentHandler(index)}
                                                               className="fa-solid fa-pencil small"></i> : <>
                                                                <div onClick={(e) => saveCommentHandler(index)}
                                                                     className={`savechange`}>{changeComment === index && 'Сохранить изменения'}</div>
                                                                <div onClick={(e) => setChangeComment(-1)}
                                                                     className={`cancel`}>Отменить
                                                                </div>
                                                            </>}
                                                    </>
                                                }
                                                <i onClick={(e) => deleteButtonHandler(index)} className="fa-solid fa-xmark"></i>
                                            </p>
                                            : null}

                                        </div>
                                        {changeComment!==index &&<div className="history_mess_list_block_content_message" >{mess.text}</div>}
                                        {changeComment===index && <textarea className={`change-text`} value={changeCommentText} onChange={(e) => setChangeCommentText(e.target.value)}/>}
                                        <div className="history_mess_list_block_content_dateandstatus" >
                                            <div></div>
                                            <div className="history_mess_list_block_content_date" >{formatDateTime(mess.createdAt)}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {comments && comments.length > visibleCount && (
                                <div className={`showmore`} onClick={handleShowMore}>Показать следующие коментарии</div>
                            )}
                            {comments && comments.length <= visibleCount && comments.length > 3 && (
                                <div className={`showmore`} onClick={(e) => setVisibleCount(3)}>Скрыть коментарии</div>
                            )}
                        </div>
                    </div> : null}
                    <ModalFiles data={<Delete />} active={deleteActive} setActive={setDeleteActive} />
                </div>
            }
        </div>
    )
})