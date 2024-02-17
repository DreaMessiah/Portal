import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import AuthService from "../../services/AuthService";
import Navbar from "../../components/Navbar";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";
import {DataContext} from "../../context/DataContext";
import WrapButtonsObj from "../../components/WrapButtonsObj";
import SearchObj from "../../components/SearchObj";
import ChangeObj from "../../components/ChangeObj";

import "../../components/listtasks/listtask3.scss";
import NewsFooter from "../../components/NewsFooter";
function DocumentsPage(){
    const {mass_create, menu_mass,wrap_buttons} = useContext(DataContext)
    const [documents,setDocuments] = useState([])
    const rule = 3

    const docs = [
        { id: 1, title: 'Договор аренды', category: 'Юридические документы', size: '1.2 MB', fileType: 'PDF', fileName: 'dogovor_arendy.pdf' },
        { id: 2, title: 'Техническое задание', category: 'Проектная документация', size: '3.5 MB', fileType: 'DOCX', fileName: 'technical_specification.docx' },
        { id: 3, title: 'Финансовый отчет', category: 'Финансовые документы', size: '750 KB', fileType: 'XLSX', fileName: 'financial_report.xlsx' },
        { id: 4, title: 'Спецификация товаров', category: 'Торговая документация', size: '2.1 MB', fileType: 'PDF', fileName: 'specification_goods.pdf' },
        { id: 5, title: 'План маркетинга', category: 'Маркетинговые документы', size: '4.8 MB', fileType: 'PPTX', fileName: 'marketing_plan.pptx' },
        { id: 6, title: 'Трудовой договор', category: 'Кадровые документы', size: '980 KB', fileType: 'DOCX', fileName: 'employment_contract.docx' },
        { id: 7, title: 'Счет-фактура', category: 'Финансовые документы', size: '1.6 MB', fileType: 'PDF', fileName: 'invoice.pdf' },
        { id: 8, title: 'Проектный план', category: 'Проектная документация', size: '2.9 MB', fileType: 'PPTX', fileName: 'project_plan.pptx' },
        { id: 9, title: 'Устав организации', category: 'Юридические документы', size: '1.1 MB', fileType: 'PDF', fileName: 'charter.pdf' },
        { id: 10, title: 'Спецификация программного обеспечения', category: 'IT-документация', size: '6.2 MB', fileType: 'DOCX', fileName: 'software_specification.docx' },
        { id: 11, title: 'Справка по здоровью', category: 'Медицинские документы', size: '500 KB', fileType: 'PDF', fileName: 'health_certificate.pdf' },
        { id: 12, title: 'Бухгалтерская отчетность', category: 'Финансовые документы', size: '2.5 MB', fileType: 'XLSX', fileName: 'accounting_reports.xlsx' },
        { id: 13, title: 'Технический паспорт оборудования', category: 'Техническая документация', size: '1.8 MB', fileType: 'PDF', fileName: 'equipment_passport.pdf' },
        { id: 14, title: 'Уведомление о начислении заработной платы', category: 'Кадровые документы', size: '750 KB', fileType: 'DOCX', fileName: 'payroll_notification.docx' },
        { id: 15, title: 'Протокол собрания акционеров', category: 'Юридические документы', size: '3.3 MB', fileType: 'PDF', fileName: 'shareholders_meeting_protocol.pdf' }
    ];

    useEffect(()=> {
        setDocuments(docs)
    },[])

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
                            {documents.map( (item,index) => (
                                <div className='table_list_strock' key={index}>
                                    <div className='table_list_strock_datein flex_center'>{item.id}</div>
                                    <div className='table_list_strock_dateto flex_center'>{item.title}</div>
                                    <div className='table_list_strock_title flex_center'>{item.category}</div>
                                    <div className='table_list_strock_status flex_center'>{item.size}</div>
                                    <div className='table_list_strock_category flex_center'>{item.fileType}</div>
                                    <div className='table_list_strock_priority flex_center'>{item.fileName}</div>
                                    <div className='table_list_strock_edit flex_center'>
                                        <div className='edit_task_list_icon'></div>
                                    </div>
                                    <div className='table_list_strock_close flex_center'>
                                        <div className='del_task_list_icon'></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : ''}
                </div>
            </div>
            <NewsFooter/>
        </div>
    )
}
export default observer(DocumentsPage)