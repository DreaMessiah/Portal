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
    const {mass_create, menu_mass,wrap_buttons} = useContext(DataContext)
    const {store} = useContext(Context)
    const [documents,setDocuments] = useState([])
    const message = useMessage()
    const rule = 3

    const loadingHandler = async () => {
        try{
            const response = await FilesService.fetchFiles(store.user.id)
            if(response.data){
                console.log(response.data)
                return response.data
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
            const response = await FilesService.createDir(store.user.id,'testName','dir')
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
                    {documents.length ?
                        <div className='table_list'>
                            <div className='table_list_cap'></div>

                        </div>
                        : ''}
                    <div onClick={() => createDirHandler()} className='button'>Запрос</div>
                </div>
            </div>
            <NewsFooter/>
        </div>
    )
}
export default observer(DocumentsPage)