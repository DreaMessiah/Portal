import "./style.scss"
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import PostService from "../../../services/PostService";


export const ViewPOST = () => {
    const location = useLocation();

    const navigate = useNavigate()
    const [viewId,setViewId] = useState(0)
    const [post,setPost] = useState()
    const [next,setNext] = useState()
    const [prev,setPrev] = useState()

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
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search)
        const getPost = searchParams.get('post') ? searchParams.get('post') : 0
        loadingHandler(getPost)
    }, [location])

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
                </div>
            }
        </div>
    )
}