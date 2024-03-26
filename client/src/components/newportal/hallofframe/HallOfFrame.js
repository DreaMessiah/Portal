import "./style.scss"
import {Link} from "react-router-dom";
import {useState} from "react";
import MainpageService from "../../../services/MainpageService";
import {useContext} from "react";
import {Context} from "../../../index";
import {useEffect} from "react";
import AuthService from "../../../services/AuthService";

export const HallOfFrame = () => {
    const  {store} = useContext(Context)
    const inn = store.user.inn
    const [listBM, setListBM] = useState([])
    const viewBoard = async () => {
        const newArr = []
        try{
            const bestMan = await MainpageService.viewBestMan({inn:inn})

            bestMan.data.forEach(man => {
                man.avatar = 'face.png'
                newArr.push(man)
            })




            const list = await AuthService.getusers()

            newArr.map( item => {
                list.data.users.map( row => {
                    if(item.tn === row.tn){
                        item.avatar = row.avatar ? row.avatar : 'face.png'
                    }
                })

            })

            console.log(newArr)
            setListBM([...newArr])

            // setListBM(bestMan.data)
            // console.log(bestMan.data)
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
                    <div className="frame_block_plane_man_photo" style={{backgroundImage: `url("files/profile/${man.avatar}")`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundColor: '#FFF'}}></div>
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