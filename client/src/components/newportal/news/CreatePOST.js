import "./style.scss"
import {Link} from "react-router-dom";
import {useEffect} from "react";
import FilesService from "../../../services/FilesService";


export const CreatePOST = () => {
    const thisPost = [];

    const loadImage = async () => {
        const response = FilesService.loadImage()
        console.log(response.data)
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

                <div onClick={(e) => loadImage()} className="create_new_post_worklist_mainimg">
                    <i className="fa-solid fa-upload"></i>
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
                        <div className="create_new_post_worklist_content_imgtext_img">
                            <i className="fa-solid fa-upload"></i>
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
                        <div className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i></div>
                        <div className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i></div>
                        <div className="create_new_post_worklist_content_tripleimgs_img"><i className="fa-solid fa-upload"></i></div>
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