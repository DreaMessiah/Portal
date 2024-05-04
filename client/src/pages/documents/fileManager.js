import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import FilesService from "../../services/FilesService";
import {DataContext} from "../../context/DataContext";
import "../../components/OldComponents/listtasks/listtask3.scss";
import {useMessage} from "../../hooks/message.hook";
import {Context} from "../../index";
import {ModalWin} from "../../components/modalwin/ModalWin";
import ModalUpload from "../../components/modalwin/ModalUpload";
import CircularProgress from "../../components/OldComponents/old/CircularProgress";
import {useLocation} from "react-router-dom";
import ModalFiles from "../../components/modalwin/ModalFiles";
import Select from "react-select";
import './draganddrop.scss'
import LoadingSpinner from "../../components/loading/LoadingSpinner";
function FileManager(){
    const {icons} = useContext(DataContext)
    const {store} = useContext(Context)
    const [documents,setDocuments] = useState([])
    const [modeView,setModeView] = useState(true)
    const [selectFile,setSelectFile] = useState(-2)
    const [path,setPath] = useState([])
    const [parentId,setParentId] = useState(0)
    const [activeDelete,setActiveDelete] = useState(false)
    const [indexDelete,setIndexDelete] = useState()
    const [activeCopyM,setActiveCopyM] = useState(false)
    const [activeUploadM,setActiveUploadM] = useState(false)
    const [activeCreateM,setActiveCreateM] = useState(false)
    const [files, setFiles] = useState([])
    const [progress, setProgress] = useState({})
    const [copyOptions,setCopyOptions] = useState([])
    const [loading,setLoading] = useState(false)
    const filesInputRef = useRef(null)
    const containerRef = useRef(null)
    const [newDirName, setNewDirName] = useState('')
    const [onBasket,setOnBasket] = useState(false)

    const location = useLocation();
    const message = useMessage()

    const rule = 3

    const searchParams = new URLSearchParams(location.search)
    const getParent = searchParams.get('parent') ? searchParams.get('parent') : 0

    const openImgInNewWindow = () => {
        window.open("https://srsuportal.ru/files/" + store.user.id + '/' + documents[selectFile].name, "_blank")
    }
    const openDocInNewWindow = () => {
        window.open("https://docs.google.com/viewer?url=https://srsuportal.ru/files/" + store.user.id + '/' + documents[selectFile].name, "_blank")
    }
    const loadingHandler = async () => {
        try{
            const response = await FilesService.fetchFiles(store.user.id,getParent,onBasket)
            selectPathHandler(getParent)
            if(response.data){
                setDocuments(response.data)
                return response.data
            }
        }catch (e){
            console.log(e.message+': Проблема загрузки списка документов')
        }
    }
    const selectPathHandler = async (parent,type = 'dir',basket= false) => {
        try{
            const TYPE = type.toLowerCase()
            if(TYPE === 'dir'){
                setSelectFile(-2)
                const response = await FilesService.fetchFiles(store.user.id,parent,basket)
                updateQueryStringParameter('parent',parent)
                setParentId(parent)
                if(response.data){
                    setDocuments(response.data)
                    const pathResponce = await FilesService.getPath(parent)
                    if(pathResponce.data) setPath(pathResponce.data)
                }
            }else{
                if(TYPE === 'pdf' || TYPE === 'doc' || TYPE === 'docx' || TYPE === 'xls' || TYPE === 'xlsx'){
                    openDocInNewWindow()
                }else{
                    if(TYPE === 'png' || TYPE === 'jpg' || TYPE === 'jpeg'){
                        openImgInNewWindow()
                    }else{
                        message('Файл не доступен для просмотра')
                    }
                }
            }
        }catch (e){
            console.log(e.message+': Проблема загрузки списка документов')
        }
    }
    const createDirHandler = async (name) => {
        try{
            const response = await FilesService.createDir(store.user.id,name,'dir',parentId)
            console.log(response.data.length)
            if(response.data){
                console.log(response.data)
                window.location.reload()
            }
        }catch (e){
            console.log(e?.message)
        }
    }
    const copyHandler = async () => {

    }
    const downloadHandler = async () => {
        console.log(documents[selectFile])
        try {
            const response = await FilesService.downloadFile(documents[selectFile].id)
            if(response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', documents[selectFile].name)
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (e) {
            console.log(e)
        }
    }
    const deleteHandler = async () => {
        try{
            setLoading(true)
            const {data} = await FilesService.fileToTrash(documents[selectFile].id)
            if(data) {
                setActiveDelete(false)
                setSelectFile(-2)
                const updatedItems = documents.filter((item, index) => index !== selectFile)
                setDocuments(updatedItems)
                message(`Файл ${documents[selectFile].name} помещен в корзину`)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const goToBasketHandler = async () => {
        try {
            setLoading(true)
            setOnBasket(true)
            await selectPathHandler(0,'dir',true)
            //...................
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const getFromBasketHandler = async () => {
        try {
            setLoading(true)
            const {data} = await FilesService.fileFromTrash(documents[selectFile].id)
            if(data) {
                setActiveDelete(false)
                setSelectFile(-2)
                const updatedItems = documents.filter((item, index) => index !== selectFile)
                setDocuments(updatedItems)
                message(`Файл ${documents[selectFile].name} восстановлен`)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const goHome = async () => {
        try {
            setLoading(true)
            setOnBasket(false)
            await selectPathHandler(0,'dir',false)
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    useEffect(()=> {
        function handleOutsideClick(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setSelectFile(-2);
            }
        }

        loadingHandler()

        document.addEventListener('click', handleOutsideClick)
        return () => {
            document.removeEventListener('click', handleOutsideClick)
        }
        //setDocuments(docs)
    },[])

    function Upload() {
        const [dragEnter,setDragEnter] = useState(false)
        function dragEnterHandler(event){
            event.preventDefault()
            event.stopPropagation()
            setDragEnter(true)
        }
        function dragLeaveHandler(event){
            event.preventDefault()
            event.stopPropagation()
            setDragEnter(false)
        }
        function dropHandler(event){
            event.preventDefault()
            event.stopPropagation()
            setDragEnter(false)
            selectFilesHandler(event,[...event.dataTransfer.files])
        }
        const handleUploadProgress = (progressEvent,name) => {
            const percentCompleted = (progressEvent.loaded / progressEvent.total)
            console.log(percentCompleted)
            setProgress(prevState => ({
                ...prevState,
                [name]: percentCompleted,
            }))
        }

        const selectFilesHandler = async (e,drop = null) => {
            let selectedFiles
            if(drop===null) selectedFiles = e.target.files
            else selectedFiles = drop
            setFiles(selectedFiles)
            try{
                for (const file of selectedFiles) {
                    const response = await FilesService.uploadFile(file, store.user.id, parentId, (progressEvent) => handleUploadProgress(progressEvent, file.name))
                    if (response.data) {
                        console.log(response.data)
                    }
                }
                console.log('Файлы загружены')
                window.location.reload()
            }catch (e){
                console.log(e+': Проблема загрузки списка документов')
            }

        }
        const pro = 0.6
        return(
            <>
                {files.length ? (
                    <div className='files-list files'>
                        {Array.from(files).map((item,index) => (
                            <div key={index} className={`file list`}>
                                <div className='l'>
                                    <i className={`${selectFile !== index ? 'fa-regular':'fa-solid'} fa-file-lines ${icons[item.name.split('.').pop()]}`}></i>
                                    <p>{item.name}</p>
                                </div>
                                <div className='l'>
                                    <CircularProgress progress={progress[item.name] ? progress[item.name] : 0}/>
                                    <i className="fa-solid fa-xmark del"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler} onDrop={dropHandler} className='draganddrop'>
                        <div onClick={(e) => filesInputRef.current.click()} className='upload-button'>{dragEnter ? <i className="fa-solid fa-upload">…</i> : 'Выберите файлы'}
                            <input onChange={(e) => selectFilesHandler(e)} multiple ref={filesInputRef} className='hidden-upload' type='file'/>
                        </div>
                    </div>
                )}
            </>
        )
    }
    function Create() {
        const dirNameHandler = (e) => {
            setNewDirName(e.target.value)
        }
        return(
            <>
                <div className='create-dir'>
                    <h4>Создание папки</h4>
                    <div className='inputs'>
                        <input autoFocus onChange={dirNameHandler} value={newDirName} type="text" placeholder='Имя папки' autoComplete="off"/>
                    </div>
                    <div className='file-buttons'>
                        <div id='btn' onClick={(e) => createDirHandler(newDirName)} className='button grey'><i className="fa-solid fa-upload"></i>Создать</div>
                    </div>
                </div>
            </>
        )
    }
    function Copy() {
        const dirNameHandler = (e) => {
            setNewDirName(e.target.value)
        }
        return(
            <>
                <div className='copy'>
                    <h4>Копирование</h4>
                    <h5>Обьект: </h5>
                    <div className='inputs'>
                        <Select className='file-select'></Select>
                    </div>
                    <div className='file-buttons'>
                        <div id='btn' onClick={(e) => copyHandler(newDirName)} className='button grey'><i className="fa-solid fa-upload"></i>Копировать</div>
                    </div>
                </div>
            </>
        )
    }
    function Delete() {
        return(
            <>
                <div className='copy'>
                    <h4>Вы действительно хотели бы удалить {(documents.length && selectFile>=0) ? documents[selectFile].name : ''}</h4>
                    <div className='file-buttons'>
                        <div className='buttons files-btns'>
                            <div onClick={() => deleteHandler()} className='button da'>Да</div>
                            <div onClick={() => setActiveDelete(false)} className='button'>Нет</div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    function updateQueryStringParameter(key, value) {
        const { protocol, host, pathname, search, hash } = window.location;
        const queryParams = new URLSearchParams(search);
        queryParams.set(key, value);
        const newUrl = `${protocol}//${host}${pathname}?${queryParams}${hash}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }

    return (
        <div ref={containerRef} className='file-manager'>
            <div className='file-buttons'>
                {!onBasket ? <div onClick={(e) => setActiveUploadM(true)} className='button grey'><i className="fa-solid fa-upload"></i>Загрузить</div> : <div style={{opacity:'0',marginTop:'15px'}} className={`button grey`}> </div>}
                {!onBasket ? <div onClick={(e) => setActiveCreateM(true)} className='button'><i className="fa-solid fa-folder-plus"></i>Создать</div> : null}
                {selectFile !== -2 ?
                    <>
                        {/*<div onClick={(e) => setActiveCopyM(true)} id='btn' className='button'><i className="fa-solid fa-copy"></i>Копировать</div>*/}
                        {/*<div id='btn' className='button'><i className="fa-solid fa-file-export"></i>Переместить</div>*/}
                        {/*<div id='btn' className='button'><i className="fa-solid fa-file-pen"></i>Переименовать</div>*/}
                        { ( selectFile>=0 && documents[selectFile].type !== 'dir' && !onBasket ) ?
                            <>
                                <div id='btn' onClick={() => downloadHandler()} className='button'><i className="fa-solid fa-download"></i>Скачать</div>
                                <div id='btn' onClick={(e) => setActiveDelete(true)} className='button'><i className="fa-solid fa-trash-arrow-up"></i>Удалить</div>
                            </>
                            :null}
                        {selectFile>=0 && onBasket ?
                            <>
                                <div id='btn' onClick={(e) => getFromBasketHandler()} className='button'><i className="fa-solid fa-trash-arrow-up"></i>Восстановить</div>
                            </>
                            : null}
                    </>
                    : null}

            </div>
            <div className='file-header'>
                <div className='file-path'>
                    <div className='l'>
                        <i onClick={() => goHome()} className="fa-solid fa-house"></i>
                        {onBasket ? <div className="path"><div className='path-item'>
                            <i className="fa-solid fa-chevron-right ch"></i>
                            <p id='btn' onClick={() => selectPathHandler(0,'dir',true)}>Корзина</p>
                        </div></div> : null}
                        {path.length ? (
                            <div className='path'>
                                {path.map( (item,index) => (
                                    <div id='btn' className='path-item' key={index}>
                                        <i className="fa-solid fa-chevron-right ch"></i>
                                        <p id='btn' onClick={() =>selectPathHandler(item.parent,item.type)}>{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        ) : ''}
                    </div>
                    <div className='r'>
                        <i onClick={(e) => setModeView(true)} className={`${modeView ? 'selected': ''} fa-solid fa-list`}></i>
                        <i onClick={(e) => setModeView(false)} className={`${modeView ? '': 'selected'} fa-solid fa-table-cells`}></i>
                    </div>
                </div>
            </div>

            <div className={modeView ? 'files-list files' : 'files-table files'}>
            {path.length ? (
                <div onClick={(e) => setSelectFile(-3)} onDoubleClick={(e) => selectPathHandler(path[path.length-2] ? path[path.length-2].parent : 0,'dir',onBasket)} className={`file back`}>
                    <i className="fa-regular fa-circle-left"></i>
                    <p>Назад</p>
                </div>
            ) : null}
                {!path.length && onBasket? (
                    <div onClick={(e) => setSelectFile(-3)} onDoubleClick={(e) => goHome()} className={`file back`}>
                        <i className="fa-regular fa-circle-left"></i>
                        <p>Назад</p>
                    </div>
                ) : null}


            {documents.length ?
                <>
                    {documents.map((item,index) => (
                        <div key={index} onDoubleClick={(e) => selectPathHandler(item.id,item.type,onBasket)} onClick={() => setSelectFile(index)} className={`${selectFile === index ? 'selected' : ''} file`}>
                            <i className={`${selectFile !== index ? 'fa-regular':'fa-solid'} fa-file-lines ${icons[item.type]}`}></i>
                            <p>{item.name}</p>
                        </div>
                    ))}
                    {!path.length && !onBasket ? (
                        <div onDoubleClick={(e) => goToBasketHandler()} onClick={() => setSelectFile(-1)} className={`${selectFile === -1 ? 'selected' : ''} file trash`}>
                            <i className="fa-solid fa-trash"></i>
                            <p>Корзина</p>
                        </div>
                    ): null}
                </>
                :''}
            </div>
            <ModalFiles data={<Delete index={indexDelete}/>} active={activeDelete} setActive={setActiveDelete} />
            <ModalUpload data={<Upload />} active={activeUploadM} setActive={setActiveUploadM}/>
            <ModalFiles data={<Create />} active={activeCreateM} setActive={setActiveCreateM}/>
            <ModalFiles heigth='50vh' data={<Copy />} active={activeCopyM} setActive={setActiveCopyM}/>
            {loading ? (<LoadingSpinner/>) : null}
        </div>
    )
}
export default observer(FileManager)