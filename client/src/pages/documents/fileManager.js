import React, {useContext, useEffect, useRef, useState} from "react";
import {observer} from "mobx-react-lite";
import FilesService from "../../services/FilesService";
import {DataContext} from "../../context/DataContext";
import "../../components/listtasks/listtask3.scss";
import {useMessage} from "../../hooks/message.hook";
import {Context} from "../../index";
import {ModalWin} from "../../components/modalwin/ModalWin";

import ModalUpload from "../../components/modalwin/ModalUpload";
import CircularProgress from "../../components/CircularProgress";
import {useLocation} from "react-router-dom";
import ModalFiles from "../../components/modalwin/ModalFiles";
import Select from "react-select";

function FileManager(){
    const {icons} = useContext(DataContext)
    const {store} = useContext(Context)
    const [documents,setDocuments] = useState([])
    const [modeView,setModeView] = useState(true)
    const [selectFile,setSelectFile] = useState(-2)
    const [path,setPath] = useState([])
    const [parentId,setParentId] = useState(0)
    const [activeM,setActiveM] = useState(false)
    const [indexM,setIndexM] = useState()
    const [activeCopyM,setActiveCopyM] = useState(false)
    const [activeUploadM,setActiveUploadM] = useState(false)
    const [activeCreateM,setActiveCreateM] = useState(false)
    const [files, setFiles] = useState([])
    const [progress, setProgress] = useState({})
    const [copyOptions,setCopyOptions] = useState([])
    const filesInputRef = useRef(null)
    const containerRef = useRef(null)

    const [newDirName, setNewDirName] = useState('')

    const location = useLocation();
    const message = useMessage()
    const rule = 3

    const searchParams = new URLSearchParams(location.search)
    const getParent = searchParams.get('parent') ? searchParams.get('parent') : 0

    const loadingHandler = async () => {
        try{
            console.log('Parent = ', getParent)
            const response = await FilesService.fetchFiles(store.user.id,getParent)
            selectPathHandler(getParent)
            if(response.data){
                setDocuments(response.data)
                return response.data
            }
        }catch (e){
            console.log(e.message+': Проблема загрузки списка документов')
        }
    }
    const selectPathHandler = async (parent,type = 'dir') => {
        try{
            if(type === 'dir'){
                const response = await FilesService.fetchFiles(store.user.id,parent)
                updateQueryStringParameter('parent',parent)
                setParentId(parent)
                if(response.data){
                    setDocuments(response.data)
                    const pathResponce = await FilesService.getPath(parent)
                    if(pathResponce.data) setPath(pathResponce.data)
                }
            }else{
                message('Это не директория')
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


    function Inmodal({index}) {
        return(
            <div className='delete-modal'>
                <div className='text'>
                    <p>{`Вы уверены, что хотите удалить файл?`}</p>
                </div>
                <div className='buttons'>
                    <div className='button da'>Да</div>
                    <div onClick={(e) => setActiveM(false)} className='button'>Нет</div>
                </div>
            </div>
        )
    }
    function Upload() {
        const handleUploadProgress = (progressEvent,name) => {
            const percentCompleted = (progressEvent.loaded / progressEvent.total)
            console.log(percentCompleted)
            setProgress(prevState => ({
                ...prevState,
                [name]: percentCompleted,
            }))
        }

        const selectFilesHandler = async (e) => {
            const selectedFiles = e.target.files
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
                    <div className='draganddrop'>
                        <div onClick={(e) => filesInputRef.current.click()} className='upload-button'>Выберите файлы
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
                    <h5>Обьект: {selectFile>0 ? documents[selectFile].name : null}</h5>
                    <div className='inputs'>
                        <Select className='file-select' options={copyOptions}></Select>
                    </div>
                    <div className='file-buttons'>
                        <div id='btn' onClick={(e) => copyHandler(newDirName)} className='button grey'><i className="fa-solid fa-upload"></i>Копировать</div>
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
        <div ref={containerRef} className='file-manager' onClick={(e) => console.log(path,parentId)}>
            <div className='file-buttons'>
                <div onClick={(e) => setActiveUploadM(true)} className='button grey'><i className="fa-solid fa-upload"></i>Загрузить</div>
                <div onClick={(e) => setActiveCreateM(true)} className='button'><i className="fa-solid fa-folder-plus"></i>Создать</div>
                {selectFile !== -2 ?
                    <>
                        <div onClick={(e) => setActiveCopyM(true)} id='btn' className='button'><i className="fa-solid fa-copy"></i>Копировать</div>
                        <div id='btn' className='button'><i className="fa-solid fa-file-export"></i>Переместить</div>
                        <div id='btn' onClick={(e) => setActiveM(true)} className='button'><i className="fa-solid fa-trash-arrow-up"></i>Удалить</div>
                        <div id='btn' className='button'><i className="fa-solid fa-file-pen"></i>Переименовать</div>
                        {selectFile !== 'dir' ?
                            <div id='btn' className='button'><i className="fa-solid fa-download"></i>Скачать</div>
                            :null}
                    </>
                    : null}
            </div>
            <div className='file-header'>
                <div className='file-path'>
                    <div className='l'>
                        <i onClick={() => selectPathHandler(0,'dir')} className="fa-solid fa-house"></i>
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
                <div onClick={(e) => setSelectFile(-3)} onDoubleClick={(e) => selectPathHandler(path[path.length-2] ? path[path.length-2].parent : 0,'dir')} className={`file back`}>
                    <i className="fa-regular fa-circle-left"></i>
                    <p>Назад</p>
                </div>
            ) : null}
            {documents.length ?
                <>
                    {documents.map((item,index) => (
                        <div key={index} onDoubleClick={(e) => selectPathHandler(item.id,item.type)} onClick={() => setSelectFile(index)} className={`${selectFile === index ? 'selected' : ''} file`}>
                            <i className={`${selectFile !== index ? 'fa-regular':'fa-solid'} fa-file-lines ${icons[item.type]}`}></i>
                            <p>{item.name}</p>
                        </div>
                    ))}
                    {!path.length ? (
                        <div onClick={() => setSelectFile(-1)} className={`${selectFile === -1 ? 'selected' : ''} file trash`}>
                            <i className="fa-solid fa-trash"></i>
                            <p>Корзина</p>
                        </div>
                    ): null}
                </>
                :''}
            </div>
            <ModalWin data={<Inmodal index={indexM}/>} active={activeM} setActive={setActiveM}/>

            <ModalUpload data={<Upload />} active={activeUploadM} setActive={setActiveUploadM}/>
            <ModalFiles data={<Create />} active={activeCreateM} setActive={setActiveCreateM}/>
            <ModalFiles heigth='50vh' data={<Copy />} active={activeCopyM} setActive={setActiveCopyM}/>
        </div>
    )
}
export default observer(FileManager)