import "./style.scss"
import React,{Link,useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import PostService from "../../services/PostService";
import formatDate from "../functions/formatDate";
import shortenText from "../functions/shortenText";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import LoadingSpinner from "../loading/LoadingSpinner";


export const AllListPOSTS = () => {
    const [posts,setPosts] = useState([])
    const [loading,setLoading] = useState(false)

    const {store} = useContext(Context)
    const navigate = useNavigate()
    const rule = store.user.unit
    const loadingHandler = async () => {
        try{
            const response = await PostService.fetch()
            if(response.data){
                setPosts(response.data)
            }
        }catch (e) {
            console.log(e?.message)
        }
    }
    const setLike = async(index) => {
        try {
            setLoading(true)
            const {data} = await PostService.setLike(posts[index].id)
            const newLikes = [...posts]

            if(!data && posts[index].user_id_likes) {
                const indexToRemove = newLikes[index].user_id_likes.indexOf(store.user.id);
                if (indexToRemove > -1) {
                    newLikes[index].user_id_likes.splice(indexToRemove, 1)
                }
            }else {
                newLikes[index].user_id_likes.push(store.user.id)
            }
            setPosts(newLikes)

        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])

    return (
        <div className="news_block">
            <div className="news_block_title">
                <div className="news_block_title_name">НОВОСТИ</div>
                {(rule === 99 || store.user.account==='superadmin') &&
                    <>
                        <Link to="/createnews" className="news_block_title_create">СОЗДАТЬ</Link>
                        <Link to={`/settingnews`} className="news_block_title_create">РЕДАКТИРОВАТЬ</Link>
                    </>
                }
            </div>
            {posts &&
                <div className="news_block_list">
                    {posts.map((item,index) => (

                        <div key={index} className="news_block_list_box">
                            <Link to={`/viewpost?post=${item.id}`} className={`link`}>
                                <div className="news_block_list_box_img" style={item.image ? {backgroundImage: `url(/files/news/images/${item.image})`} : {}}></div>
                                <div className="news_block_list_box_content">
                                    <div className="news_block_list_box_content_a">
                                        <div className="news_block_list_box_content_xyz">
                                            {/*<div className="news_block_list_box_content_xyz_x">2 часа назад</div>*/}
                                        </div>
                                        <div className="news_block_list_box_content_title">{item.title}</div>
                                        <div className="news_block_list_box_content_description">{shortenText(item.text)}</div>
                                    </div>
                                </div>
                            </Link>
                            <div className="news_block_list_box_content_btns">
                                <div className='left'>
                                    <div className="news_block_list_box_content_btns_date">{formatDate(item.createdAt)}</div>
                                    <div className="news_block_list_box_content_btns_like">
                                        <i className="fa-solid fa-thumbs-up" style={{display: 'none'}}></i>
                                    </div>
                                    <span onClick={() => setLike(index)} className={`circle cliker `}>{!item.user_id_likes.includes(store.user.id) ? <i className="fa-regular fa-heart"></i> : <i className="fa-solid fa-heart liked"></i>} {item.user_id_likes && item.user_id_likes.length ? item.user_id_likes.length : null}</span>
                                    {item.comments ? <span className={`circle`}><i className="fa-regular fa-comments"></i>{item.comments}</span> : null}
                                </div>
                                <div className='rigth'>
                                    <div className="views"><i className="fa-solid fa-eye"></i>{item.clicks}</div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            }
            {loading ? (<LoadingSpinner/>) : null}
        </div>
    )
}
