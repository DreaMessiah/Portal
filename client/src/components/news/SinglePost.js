import React, {useContext, useEffect, useState} from "react";
import shortenText from "../functions/shortenText";
import formatDate from "../functions/formatDate";
import {Link} from "react-router-dom";
import PostService from "../../services/PostService";
import {Context} from "../../index";
import LoadingSpinner from "../loading/LoadingSpinner";

export const SinglePost = ({id}) => {
    const {store} = useContext(Context)
    const [post,setPost] = useState({})
    const [loading,setLoading] = useState(false)
    const [isLike,setIsLike] = useState(false)
    const loadingHandler = async () => {
        try {
            const response = await PostService.fetchSinglePost(+id)
            if(response.data){
                setPost(response.data)

                if(response.data.likes !== null && response.data.likes.includes(store.user.id)) setIsLike(true)
                else setIsLike(false)
            }
        }catch (e) {
            console.log(e)
        }
    }
    const setLike = async() => {
        try {
            setLoading(true)
            const {data} = await PostService.setLike(id)
            const newLikes = post

            if(!data && post.likes) {
                const indexToRemove = newLikes.likes.indexOf(store.user.id);
                if (indexToRemove > -1) {
                    newLikes.likes.splice(indexToRemove, 1);
                }
            }else {
                newLikes.likes.push(store.user.id)
            }
            setPost(newLikes)

            setIsLike(data)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadingHandler()
    },[])
    const rule = store.user.unit
    return(
        <>
            {post &&
                <div className="news_block_list_box">
                    <Link to={`/viewpost?post=${post.id}`} className={`link`}>
                        <div className="news_block_list_box_img" style={post.image ? {backgroundImage: `url(/files/news/images/${post.image})`} : {}}></div>
                        <div className="news_block_list_box_content">
                            <div className="news_block_list_box_content_a">
                                <div className="news_block_list_box_content_xyz">
                                    {/*<div className="news_block_list_box_content_xyz_x">2 часа назад</div>*/}

                                </div>
                                <div className="news_block_list_box_content_title">{post.title}</div>
                                <div className="news_block_list_box_content_description">{shortenText(post.content)}</div>
                            </div>
                        </div>
                    </Link>

                    <div className="news_block_list_box_content_btns">
                        <div className='left'>
                            <div className="news_block_list_box_content_btns_date">{formatDate(post.createdAt)}</div>
                            <div className="news_block_list_box_content_btns_like">
                                <i className="fa-solid fa-thumbs-up" style={{display: 'none'}}></i>
                            </div>
                            <span onClick={() => setLike()} className={`circle cliker `}>{!isLike ? <i className="fa-regular fa-heart"></i> : <i className="fa-solid fa-heart liked"></i>} {post.likes && post.likes.length ? post.likes.length : null}</span>
                            {post.comments ? <span className={`circle`}><i className="fa-regular fa-comments"></i>{post.comments}</span> : null}
                        </div>
                        <div className='rigth'>
                            <div className="views"><i className="fa-solid fa-eye"></i>{post.clicks}</div>
                        </div>
                    </div>

                </div>
            }
            {loading ? (<LoadingSpinner/>) : null}
        </>
    )
}
