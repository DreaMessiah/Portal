import "./style.scss"
import {useContext, useEffect, useRef, useState} from "react";
import UserService from "../../services/UserService";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import {useMessage} from "../../hooks/message.hook";
import ModalFiles from "../modalwin/ModalFiles";
import LoadingSpinner from '../loading/LoadingSpinner'
import checkPassword from "../functions/checkPassword";
import {Link} from "react-router-dom";
import CmsSelect from "../inputs/CmsSelect";
import {DataContext} from "../../context/DataContext";

const LkNew = () => {
    const {store} = useContext(Context)

    const [face,setFace] = useState(store.user.avatar.length ? store.user.avatar : 'face.png')
    const [loading,setLoading] = useState(false)
    const message = useMessage()
    const faceRef = useRef()

    const [editParams, setEditParams] = useState(false)
    const [activeModalSizes, setActiveModalSizes] = useState(false)
    const [activeModalPass, setActiveModalPass] = useState(false)

    function ChangePassword(){
        const [oldPass,setOldPass] = useState('')
        const [newPassFirst,setNewPassFirst] = useState('')
        const [newPassSecond,setNewPassSecond] = useState('')
        const [empty,setEmpty] = useState([])

        const check = () => {
            const n = [...empty]
            n[0] = !!! oldPass.length
            n[1] = !!! newPassFirst.length
            n[2] = !!! newPassSecond.length

            const emp = n[0] || n[1] || n[2]
            if(emp){
                message('Заполните пустые поля')
            }

            const check = checkPassword(newPassFirst,newPassSecond)
            if(check.err){
                n[1]= true
                n[2]= true
                message(message(check.message))
            }
            setEmpty(n)
            return emp || check.err
        }
        const changeHandler = async () => {
            try {
                if(!check()){
                    setLoading(true)
                    const response = await UserService.changePassword(oldPass,newPassFirst)
                    console.log(response)
                    setLoading(false)
                    if(response.data){
                        if(response.data.err) setEmpty(prevState => [true, ...prevState.slice(1)])
                        else cancelHandler()
                        message(response.data.message)
                    }
                }else {
                    console.log('111')
                }
            }catch (e) {
                setLoading(false)
                console.log('Ошибка изменения пароля',e)
            }
        }
        const cancelHandler = () => {
            setOldPass('')
            setOldPass('')
            setOldPass('')
            setActiveModalPass(false)
        }
      return(
          <div className='change-password-form'>
              <div className={`info`}>
                  <h3>Изменить пароль</h3>
              </div>
              <div className={`inputs`}>
                  <label>Старый пароль</label>
                  <input className={`${empty[0] && 'red-solid-border'}`} placeholder={'Введите старый пароль'} value={oldPass} onChange={(e) => setOldPass(e.target.value)} type={"password"} />
                  <hr/>
                  <label>Новый пароль</label>
                  <input className={`${empty[1] && 'red-solid-border'}`} placeholder={'Введите новый пароль'} value={newPassFirst} onChange={(e) => setNewPassFirst(e.target.value)} type={"password"} />
                  <input className={`${empty[2] && 'red-solid-border'}`} placeholder={'Повторите новый пароль'} value={newPassSecond} onChange={(e) => setNewPassSecond(e.target.value)} type={"password"} />
              </div>

              <div className={`buttons`}>
                  <div onClick={(e) => changeHandler()} className={`button`}>Изменить</div>
                  <div onClick={(e) => cancelHandler()} className={`button`}>Отменить</div>
              </div>
          </div>
      )
    }
    function ChangeSizes(){
        const {sizesWear,sizesShoes} = useContext(DataContext)
        const [sizeWear,setSizeWear] = useState(null)
        const [sizeShoes,setSizeShoes] = useState(null)
        const [sizeHeight,setSizeHeight] = useState('')
        const loadingHandler = async () => {
            try {
                setLoading(true)
                const {data} = await UserService.getSizes()
                console.log(data)
                if(data){
                    setSizeWear({value:parseInt(data[0]),label:parseInt(data[0])})
                    setSizeShoes({value:parseInt(data[1]),label:parseInt(data[1])})
                    setSizeHeight(data[2])
                }
            }catch (e){
                console.log(e)
            }finally {
                setLoading(false)
            }
        }
        const changeHandler = async() => {
            try {
                setLoading(true)
                if(sizeWear && setSizeShoes){
                    const sizes = sizeWear.label + '-' + sizeShoes.label + '-' + sizeHeight
                    const {data} = await UserService.setSizes(sizes)
                    if(data){
                        message('Данные сохранены, Спасибо!')
                        cancelHandler()
                    }
                }else{
                    message('Введены не корректные данные')
                }

            }catch (e) {
                console.log(e)
            }finally {
                setLoading(false)
            }
        }
        const cancelHandler = async() => {
            setActiveModalSizes(false)
            // setSizeWear(null)
            // setSizeShoes(null)
            // setSizeHeight('')
        }
        useEffect(() => {
            loadingHandler()
        },[])
        useEffect(() => {
            console.log(sizeWear)
            console.log(sizeShoes)
        },[sizeWear,sizeShoes])
        return (
            <div className='change-password-form'>
                <div className={`info`}>
                    <h3>Укажите Ваши актуальные размеры для получения спец одежды</h3>
                </div>
                <div className={`inputs`}>
                    <label>Размер одежды</label>
                    <div className={'lk-select select'}>
                        <CmsSelect value={sizeWear} radius={'0'} onChange={setSizeWear} options={sizesWear} placeholder={"Выберите размер одежды"} />
                    </div>
                    <label>Размер обуви</label>
                    <div className={'lk-select select'}>
                        <CmsSelect value={sizeShoes} radius={'0'} onChange={setSizeShoes} options={sizesShoes} placeholder={"Выберите размер обуви"} />
                    </div>
                    <label>Рост</label>
                    <input type={'text'} onChange={(e) => setSizeHeight(e.target.value)} value={sizeHeight} placeholder={'Введите Ваш рост'}/>
                </div>

                <div className={`buttons sizes-form`}>
                    <div onClick={(e) => changeHandler()} className={`button`}>Сохранить</div>
                    <div onClick={(e) => cancelHandler()} className={`button`}>Отменить</div>
                </div>
            </div>
        )
    }
    const loadImage = async (e) => {
        setLoading(true)
        try {
            const response = await UserService.loadAvatar(e.target.files[0])
            if(response){
                if(response.err) message(response.message)
                else {
                    store.setAvatar(response.data.path)
                    setFace(response.data.path)
                }
            }
        }catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
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
                        <div className="lk_block_params_personaldata_fio" id="blockFIO">{store.user.full_name}</div>
                        <div onClick={() => console.log(store.t13)} className="lk_block_params_personaldata_dev" id="blockDEV">{store.t13.developer}</div>
                        <div className="lk_block_params_personaldata_otdel" id="blockOTDEL">{store.t13.branch}</div>
                        <div className="lk_block_params_personaldata_tn" id="blockTN">{store.t13.tn}</div>
                        <div className="lk_block_params_personaldata_login">
                            <div className="lk_block_params_personaldata_login_name">Логин: {store.user.login}</div>
                            <div onClick={(e) => setActiveModalPass(true)} className="lk_block_params_personaldata_login_btnpassword" id="editPROFILE">Сменить пароль</div>
                        </div>
                    </div>

            </div>
            <div className="lk_block_params_navigation">
                <Link to='/createsocial' className="lk_block_params_navigation_btn" >Заявление на мат.помощь</Link>
                <div onClick={() => setActiveModalSizes(true)} className="lk_block_params_navigation_btn" >Мои размеры (Спецодежда)</div>
            </div>
            <ModalFiles data={<ChangePassword/>} active={activeModalPass} setActive={setActiveModalPass} heigth={"40vh"}/>
            <ModalFiles data={ChangeSizes()} active={activeModalSizes} setActive={setActiveModalSizes} heigth={"50vh"}/>
            {loading ? (<LoadingSpinner/>) : null}

        </div>
    )
}
export default observer(LkNew)