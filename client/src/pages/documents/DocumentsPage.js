import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import FilesService from "../../services/FilesService";
import Navbar from "../../components/Navbar";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import {DataContext} from "../../context/DataContext";
import WrapButtonsObj from "../../components/WrapButtonsObj";
import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";
import "../../components/listtasks/listtask3.scss";
import NewsFooter from "../../components/NewsFooter";
import {useMessage} from "../../hooks/message.hook";
import {Context} from "../../index";

function DocumentsPage(){
    const {mass_create, menu_mass,wrap_buttons,icons} = useContext(DataContext)
    const {store} = useContext(Context)
    const [documents,setDocuments] = useState([])
    const [modeView,setModeView] = useState(true)
    const [selectFile,setSelectFile] = useState(-2)
    const [path,setPath] = useState([])

    const message = useMessage()
    const rule = 3

    const loadingHandler = async () => {
        try{
            const response = await FilesService.fetchFiles(store.user.id,0)
            if(response.data){
                setDocuments(response.data)
                return response.data
            }
        }catch (e){
            console.log(e.message+': Проблема загрузки списка документов')
        }
    }
    const selectPathHandler = async (parent,name = '') => {
        try{
            const response = await FilesService.fetchFiles(store.user.id,parent)
            console.log(parent)
            if(response.data){
                setDocuments(response.data)
                if(!parent) setPath([])
                const indexToDeleteFrom = path.findIndex(item => item.parent === parent);
                if (indexToDeleteFrom !== -1) {
                    const newPath = path.slice(0, indexToDeleteFrom + 1);
                    setPath(newPath);
                }else{
                    if(parent) setPath([...path,{parent:parent,name:name}])
                }
            }

        }catch (e){
            console.log(e.message+': Проблема загрузки списка документов')
        }
    }

    useEffect(()=> {
        loadingHandler()
        //setDocuments(docs)
    },[])

    const createDirHandler = async () => {
        try{
            const response = await FilesService.createDir(store.user.id,'3','dir',14)
            console.log(response.data.length)
            if(response.data){
                console.log(response.data)
            }
        }catch (e){
            console.log(e?.message)
        }
    }

    return(
        <div className='container'>
            <Navbar/>
            <div id='DocumentPage' >
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right-block'>
                    <div className='top-box'>
                        <div className='left-box'>
                            <WrapButtonsObj mass={wrap_buttons}/>
                            <SearchObj/>
                        </div>
                        <div className='right-box'>
                            <ChangeObj/>
                        </div>
                    </div>
                    <div className='file-manager'>
                        <div className='file-header'>
                            <div className='file-path'>
                                <div className='l'>
                                    <i onClick={() => selectPathHandler(0,'')} className="fa-solid fa-house"></i>
                                    {path.length ? (
                                        <div className='path'>
                                            {path.map( (item,index) => (
                                                <div className='path-item' key={index}>
                                                    <i className="fa-solid fa-chevron-right ch"></i>
                                                    <p onClick={() =>selectPathHandler(item.parent,item.name)}>{item.name}</p>
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
                        {documents.length ?
                            <div className={modeView ? 'files-list files' : 'files-table files'}>
                                {documents.map((item,index) => (
                                    <div key={index} onDoubleClick={(e) => selectPathHandler(item.id,item.name)} onClick={() => setSelectFile(index)} className={`${selectFile === index ? 'selected' : ''} file`}>
                                        <i className={`${selectFile !== index ? 'fa-regular':'fa-solid'} ${icons[item.type]}`}></i>
                                        <p>{item.name}</p>
                                    </div>
                                ))}
                                {!path.length ? (
                                <div onClick={() => setSelectFile(-1)} className={`${selectFile === -1 ? 'selected' : ''} file trash`}>
                                    <i className="fa-solid fa-trash"></i>
                                    <p>Корзина</p>
                                </div>
                                ): null}
                            </div>
                        :''}

                    </div>
                </div>
            </div>
            <NewsFooter/>

        </div>
    )
}
export default observer(DocumentsPage)