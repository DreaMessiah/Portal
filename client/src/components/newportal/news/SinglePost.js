import React, {useEffect, useState} from "react";
import shortenText from "../../functions/shortenText";
import formatDate from "../../functions/formatDate";
import {Link} from "react-router-dom";
import PostService from "../../../services/PostService";

export const SinglePost = ({id}) => {
    const [post,setPost] = useState({})
    const loadingHandler = async () => {
        try {
            const response = await PostService.fetchSinglePost(+id)
            if(response.data){
               setPost(response.data)
            }
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])
    const rule = 2
    return(
        <>
            {post &&
            <Link to={`/viewpost?post=${post.id}`} className="news_block_list_box">
                <div className="news_block_list_box_img" style={post.image ? {backgroundImage: `url(/files${post.image})`} : {}}></div>
                <div className="news_block_list_box_content">
                    <div className="news_block_list_box_content_a">
                        <div className="news_block_list_box_content_xyz">
                            {/*<div className="news_block_list_box_content_xyz_x">2 часа назад</div>*/}

                        </div>
                        <div className="news_block_list_box_content_title">{post.title}</div>
                        <div className="news_block_list_box_content_description">{shortenText(post.content)}</div>
                    </div>
                    <div className="news_block_list_box_content_btns">
                        <div className='left'>
                            <div className="news_block_list_box_content_btns_date">{formatDate(post.createdAt)}</div>
                            <div className="news_block_list_box_content_btns_like">
                                <i className="fa-regular fa-thumbs-up"></i><i className="fa-solid fa-thumbs-up" style={{display: 'none'}}></i>
                            </div>
                            <div className="news_block_list_box_content_btns_comment"><i className="fa-regular fa-comments"></i></div>
                        </div>
                        <div className='rigth'>
                            {rule === 3 && <Link to={`/createnews?post=${post.id}`}><i className="fa-solid fa-gear"></i></Link>}
                            <div className="views">{post.clicks} просмотров</div>
                        </div>
                    </div>
                </div>
            </Link>
            }
        </>
    )
}
