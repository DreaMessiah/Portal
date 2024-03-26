import "./style.scss"
import {Link} from "react-router-dom";
import {useState} from "react";
import MainpageService from "../../../services/MainpageService";
import {useContext} from "react";
import {Context} from "../../../index";
import {useEffect} from "react";

export const HallOfFrame = () => {
    const  {store} = useContext(Context)
    const inn = store.user.inn
    const [listBM, setListBM] = useState([])
    const viewBoard = async () => {
        try{
            const bestMan = await MainpageService.viewBestMan({inn:inn})
            setListBM(bestMan.data)
            console.log(bestMan.data)
        } catch(e) {
            console.log(e)
        }
    }
    useEffect(() => {
        viewBoard()
    }, [])
    return (
        <div className="frame_block">
            <div className="frame_block_title">
                <div className="frame_block_title_name">Доска почёта</div>
                <Link to="/halledit" className="frame_block_title_edit">Редактировать</Link>
            </div>
            <div className="frame_block_plane backhall">
                {listBM.map((man, index) => (
                <div className="frame_block_plane_man" key={index}>
                    <div className="frame_block_plane_man_photo" style={{backgroundImage: `url("/profile/face.jpg")`, backgroundSize: '90%', backgroundRepeat: 'no-repeat', backgroundColor: '#FFF'}}></div>
                    <div className="frame_block_plane_man_text">
                        <div className="frame_block_plane_man_name">{man.name}</div>
                        <div className="frame_block_plane_man_slicer"></div>
                        <div className="frame_block_plane_man_dev">{man.developer}</div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}