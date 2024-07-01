import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "./analitics.scss"
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import HistoryService from "../../services/HistoryService";
import formatDateTime from "../../components/functions/formatDateTime";
import CmsSelect from "../../components/inputs/CmsSelect";
import {DatePicker} from "rsuite";
import UserService from "../../services/UserService";
import CmsDatePicket from "../../components/inputs/CmsDatePicket";
import AuthService from "../../services/AuthService";
import PollsService from "../../services/PollsService";


function Survey73(){
    const [loading,setLoading] = useState(false)
    const [an,setAn] = useState([])

    const loadingHandler = async () => {
        try{
            const response = await PollsService.fetchSurvey(73)
            if(response.data){
                const mass = response.data.AN
                const sortedData = [...mass].sort((a, b) => (a.ans > b.ans ? 1 : -1))
                setAn(sortedData)
                console.log(sortedData)
            }
        }catch (e){
            console.log(e.message+': Проблема загрузки опроса')
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])
    return (
        <>
            <div>
                <h2>Ответы по Нейросети</h2>
                <div className="flex-table">
                    <div className="flex-row">
                        <div className="flex-cell">
                            Имя
                        </div>
                        <div className="flex-cell">
                            Должность
                        </div>
                        <div className="flex-cell">
                            Ответ
                        </div>
                    </div>
                    {an.map((item, index) => (
                        <div className="flex-row" key={index}>
                                <div className="flex-cell">
                                    {item.full_name}
                                </div>
                            <div className="flex-cell">
                                {item.developer}
                            </div>
                            <div className="flex-cell">
                                {item.ans}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </>
    )
}
export default observer(Survey73)