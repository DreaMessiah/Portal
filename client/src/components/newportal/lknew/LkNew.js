import "./style.scss"
import {useContext, useEffect, useRef, useState} from "react";
import UserService from "../../../services/UserService";
import {observer} from "mobx-react-lite";
import {Context} from "../../../index";


const LkNew = () => {
    const {store} = useContext(Context)
    const [face,setFace] = useState(store.user.avatar.length ? store.user.avatar : 'face.png')
    const faceRef = useRef()


    const [editParams, setEditParams] = useState(false)
    const btnEdit = document.getElementById('edit_personal_data')
    const btnSave = document.getElementById('save_personal_data')
    const blockFIO = document.getElementById('blockFIO')
    const inputFIO = document.getElementById('inputFIO')
    const blockDEV = document.getElementById('blockDEV')
    const inputDEV = document.getElementById('inputDEV')
    const blockOTDEL = document.getElementById('blockOTDEL')
    const inputOTDEL = document.getElementById('inputOTDEL')
    const blockTN = document.getElementById('blockTN')
    const inputTN = document.getElementById('inputTN')
    const editPROFILE = document.getElementById('editPROFILE')

    const openEditor = () => {
        if(editParams === false){
            setEditParams(true)
        }
        btnEdit.style.display = 'none'
        btnSave.style.display = 'flex'
        blockFIO.style.display = 'none'
        inputFIO.style.display = 'flex'
        blockDEV.style.display = 'none'
        inputDEV.style.display = 'flex'
        blockOTDEL.style.display = 'none'
        inputOTDEL.style.display = 'flex'
        blockTN.style.display = 'none'
        inputTN.style.display = 'flex'
    }

    const saveEditor = () => {
        if(editParams === true){
            setEditParams(false)
        }
        btnEdit.style.display = 'flex'
        btnSave.style.display = 'none !important'
        blockFIO.style.display = 'flex'
        inputFIO.style.display = 'none !important'
        blockDEV.style.display = 'flex'
        inputDEV.style.display = 'none !important'
        blockOTDEL.style.display = 'flex'
        inputOTDEL.style.display = 'none !important'
        blockTN.style.display = 'flex'
        inputTN.style.display = 'none !important'
    }

    const loadImage = async (e) => {
        try {
            const response = await UserService.loadAvatar(e.target.files[0])
            if(response.data){
                store.setAvatar(response.data.path)
                setFace(response.data.path)
                this.forceUpdate()
            }
        }catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="lk_block">
            <div className="lk_block_params">
                    <div className="lk_block_params_photo" style={face.length ? {backgroundImage: `url(/files/profile/${face})`} : {}}>
                        <div className="lk_block_params_photo_black"></div>
                        <div className="lk_block_params_photo_open"><i className="fa-solid fa-maximize"></i></div>
                        <div onClick={(e) => faceRef.current.click()} className="lk_block_params_photo_upload"><i className="fa-solid fa-upload"></i></div>
                        <input onChange={(e) => loadImage(e)} ref={faceRef} className='hidden-upload' type='file'/>
                    </div>

                    <div className="lk_block_params_personaldata">
                        <div className="lk_block_params_personaldata_edit">
                            <div className="lk_block_params_personaldata_edit_btn" id="edit_personal_data" onClick={()=>openEditor(editParams)}>Редактировать</div>
                            <div className="lk_block_params_personaldata_edit_btn" id="save_personal_data" onClick={()=>saveEditor(editParams)}>Сохранить</div>
                        </div>
                        <div onClick={(e) => console.log(store.user.avatar)} className="lk_block_params_personaldata_fio" id="blockFIO">Барахтянский Владимир Алексеевич</div>
                        <input className="lk_block_params_personaldata_fio displaynone" id="inputFIO" value="Барахтянский Владимир Алексеевич" />
                        <div className="lk_block_params_personaldata_dev" id="blockDEV">Разработчик ПО</div>
                        <input className="lk_block_params_personaldata_dev displaynone" id="inputDEV" value="Разработчик ПО" />
                        <div className="lk_block_params_personaldata_otdel" id="blockOTDEL">Одтел Управления инновационной деятельности</div>
                        <input className="lk_block_params_personaldata_otdel displaynone" id="inputOTDEL" value="Одтел Управления инновационной деятельности" />
                        <div className="lk_block_params_personaldata_tn" id="blockTN">00ЗП-0456789</div>
                        <input className="lk_block_params_personaldata_tn displaynone" id="inputTN" value="00ЗП-0456789"/>
                        <div className="lk_block_params_personaldata_login">
                            <div className="lk_block_params_personaldata_login_name">логиин: barahtasurgut</div>
                            <div className="lk_block_params_personaldata_login_btnpassword" id="editPROFILE">Сменить пароль</div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default observer(LkNew)