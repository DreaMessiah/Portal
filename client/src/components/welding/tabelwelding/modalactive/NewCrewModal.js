import "./newcrewmodal.scss";
import {useEffect} from "react";
import WeldingService from "../../../../services/WeldingService";
import {useMessage} from "../../../../hooks/message.hook";

export const NewCrewModal = ({sel, active, setActive, monther, year, idobj, allcrews, setAllcrews, setWeldingcrew, setMycrews}) => {
    let message
    const messages = useMessage()
    const btnPlus = document.querySelector('.modal_crew_btns_plus')
    const btnCancel = document.querySelector('.modal_crew_btns_cancel')
    const months = [
        'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
        'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    if(sel === '' || sel === 'отсутствует'){
        sel = 'отсутствует'
        message = `Выберете звено для добавления`
    } else {
        message = `Желаете добавить новое звено ${sel} в табель?`
    }
    const getMyCrews = async () => {
        try{
            const getShifr = idobj
            const obj = await WeldingService.getObgForHook({getShifr})
            const shifr = obj.data.shifr
            const getMonth = monther
            const getYear = year
            const response = await WeldingService.getMyCrews({shifr, getMonth, getYear})
            setMycrews(response.data)
            const month = months[monther]
            const tabel = await WeldingService.getTabelSv({shifr, month, getYear})
            const listtabels = tabel.data

            const crews = []
            const crewsman = []
            listtabels.forEach(item => {
                if(!crews.includes(item.crew)){
                    crews.push(item.crew)
                }
            })

            crews.forEach(crew=>{
                const zveno = {
                    crew: crew
                }
                const mans = []
                const views = []
                listtabels.forEach(item=>{
                    if(crew === item.crew && item.checkin === 'man'){
                        mans.push(item)
                    }
                    if(crew === item.crew && item.checkin === 'view'){
                        views.push(item)
                    }
                })
                zveno.mans = mans
                zveno.views = views
                crewsman.push(zveno)
            })
            setWeldingcrew(crewsman)
            setAllcrews(crews)
        }catch(e){
            console.log(e)
        }

    }

    const plusCrew = async () => {
        try{
            const createdCrew = await WeldingService.createCrew({sel, monther, year, idobj})
            setActive(!active)
            messages(createdCrew)
            getMyCrews()

console.log(createdCrew)
            // func()
        }catch(e){
            console.log(e)
        }
    }

    useEffect(()=>{

    }, [])
    return (
        <div className='modal_crew'>
            <div className='modal_crew_message'>{message}</div>
            <div className='modal_crew_btns'>
                <div className='modal_crew_btns_plus' style={sel === '' || sel === 'отсутствует' ? {display:"none"}:{display:"flex"}} onClick={()=>plusCrew()}>Добавить</div>
                <div className='modal_crew_btns_cancel' onClick={() => setActive(false)}>Отмена</div>
            </div>
        </div>
    )
}