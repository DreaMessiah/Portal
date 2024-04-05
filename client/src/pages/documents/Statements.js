import React, {useContext, useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import FilesService from "../../services/FilesService";
import {useMessage} from "../../hooks/message.hook";
import {MainHeader} from "../../components/newportal/header/Mainheader";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";
import formatDate from "../../components/functions/formatDate";
import './statements.scss'

function Statements(){
    const {store} = useContext(Context)
    const message = useMessage()
    const [statements,setStatements] = useState([])
    const loadingHandler = async () => {
        try {
            const response = await FilesService.fetchStatements()
            if(response.data) setStatements(response.data)
        }catch (e) {
            console.log(e)
        }
    }
    const handleDownload = async (item) => {
        try {
            const response = await FilesService.downloadStatement(item.id)
            if(response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', item.file)
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <div className="workpage_block">
                    <div className={`statements`}>
                        <div className={`title`}>Бланки заявлений</div>

                        <div className="statement-table">
                            <div className="table_list_cap"></div>
                            <div className="statement-table-header">
                                <div className="column с1">Дата обновления</div>
                                <div className="column с2">Наименование</div>
                                <div className="column с3">Загрузить</div>
                            </div>
                            <div className="statement-table-body">
                                {statements && statements.map((item,index)=> (
                                    <div key={index} className={`statement-row`}>
                                        <div className="column с1">{formatDate(item.updatedAt)}</div>
                                        <div className="column с2">{item.name}</div>
                                        <div className="column с3"><i onClick={() => handleDownload(item)} className="fa-solid fa-download"></i></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Statements)