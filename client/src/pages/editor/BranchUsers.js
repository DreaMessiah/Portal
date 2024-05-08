import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "../econom/ogm.scss"
import {Context} from "../../index"
import UserService from "../../services/UserService"
import LoadingSpinner from "../../components/loading/LoadingSpinner"
import './editor.scss'
import formatDate from "../../components/functions/formatDate"
import {useMessage} from "../../hooks/message.hook";
const XLSX = require('xlsx')

function BranchUsers(){
    const [loading,setLoading] = useState(false)
    const message = useMessage()
    const [branchs,setBranchs] = useState([])
    const [users,setUsers] = useState([])
    const [selectedBranch,setSelectedBranch] = useState(-1)
    const {store} = useContext(Context)

    const loadingHandler = async () => {
        try {
            setLoading(true)
            const {data} = await UserService.getBranchs()
            if(data) {
                setBranchs(data)
                console.log(data)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }
    const selectBranchHandler = (index) => {
        if(selectedBranch === index) setSelectedBranch(-1)
        else setSelectedBranch(index)
    }
    const generateXLSX = (data) => {
        const flatData = [];

        data.forEach((item) => {
            item.tns.forEach((tn) => {
                const flatObject = {
                    Отдел: item.branch,
                    Имя: tn.name,
                    Должность: tn.developer,
                    ДатаРегистрации: formatDate(tn.createdUser)
                }
                flatData.push(flatObject)
            })
        })

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(flatData);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        return new Blob([wbout], { type: 'application/octet-stream' });
    }
    const downloadHandler = () => {
        if(branchs.length){
            const a = document.createElement('a')
            const url = window.URL.createObjectURL(generateXLSX(branchs))
            a.href = url
            a.download = 'data.xlsx'
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
        }else {
            message('Ошибка формирования xlsx')
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])

    return (
        <div className='workers'>
            <div className={`title`}>
                <h3>Список отделов</h3>
                <p>Для отображения работников выберете нужный отдел</p>
                <p>Для выгрузки в файл, нажмите на кнопку под таблицей</p>
            </div>
            <div className={`branch-table`}>
                {branchs.length && branchs.map( (item,index) => (
                    <>
                        <div key={index} className={`branch-item`}>
                            <div onClick={(e) => selectBranchHandler(index)} className={`row c1`}>{item.branch}</div>
                        </div>
                        {index === selectedBranch ?
                            <div className={'list'}>
                                {item.tns.map( (item,index) => (
                                    <div key={index} className={`srt`}>
                                        <div className={`user-row c1`}>{item.name}</div>
                                        <div className={`user-row c2`}>{item.developer}</div>
                                        <div className={`user-row c3`}>{item.tn}</div>
                                        <div className={`user-row c4`}>{formatDate(item.createdUser)}</div>
                                    </div>
                                ))}
                            </div>
                        :null}
                    </>
                ))}
            </div>
            <div className={'buttons'}>
                <div onClick={(e) => downloadHandler()} className={`button`}>Выгрузить в XLSX</div>
            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </div>
    )
}

export default observer(BranchUsers)