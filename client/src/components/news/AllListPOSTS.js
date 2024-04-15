import "./style.scss"
import {Link,useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import PostService from "../../services/PostService";
import formatDate from "../functions/formatDate";
import shortenText from "../functions/shortenText";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

export const AllListPOSTS = () => {
    const [posts,setPosts] = useState([])
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

    useEffect(() => {
        loadingHandler()
    },[])

    return (
        <div className="news_block">
            <div className="news_block_title">
                <div className="news_block_title_name">НОВОСТИ</div>
                {rule === 3 &&
                    <>
                        <Link to="/createnews" className="news_block_title_create">СОЗДАТЬ</Link>
                        <Link to={`/settingnews`} className="news_block_title_create">РЕДАКТИРОВАТЬ</Link>
                    </>
                }
            </div>
            {posts &&
                <div className="news_block_list">
                    {posts.map((item,index) => (
                        <Link key={index} to={`/viewpost?post=${item.id}`} className="news_block_list_box">
                            <div className="news_block_list_box_img" style={item.image ? {backgroundImage: `url(/files${item.image})`} : {}}></div>
                            <div className="news_block_list_box_content">
                                <div className="news_block_list_box_content_a">
                                    <div className="news_block_list_box_content_xyz">
                                        {/*<div className="news_block_list_box_content_xyz_x">2 часа назад</div>*/}
                                    </div>
                                    <div className="news_block_list_box_content_title">{item.title}</div>
                                    <div className="news_block_list_box_content_description">{shortenText(item.text)}</div>
                                </div>
                                <div className="news_block_list_box_content_btns">
                                    <div className='left'>
                                        <div className="news_block_list_box_content_btns_date">{formatDate(item.createdAt)}</div>
                                        <div className="news_block_list_box_content_btns_like">
                                            <i className="fa-regular fa-thumbs-up"></i><i className="fa-solid fa-thumbs-up" style={{display: 'none'}}></i>
                                        </div>
                                        <div className="news_block_list_box_content_btns_comment"><i className="fa-regular fa-comments"></i></div>
                                    </div>
                                    <div className='rigth'>
                                        {rule === 5 && <div onClick={() => navigate(`/createnews?post=${item.id}`)}><i className="fa-solid fa-gear"></i></div>}
                                        <div className="views">{item.clicks} просмотров</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}
