import "./tabel.scss";
import "../welding/yearmounth/viewobj.scss";
import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../context/DataContext";
import ObjsService from "../../services/ObjsService";
import {Context} from "../../index";
import {useMessage} from "../../hooks/message.hook";
import {useMonth} from "../../hooks/month.hook";




export const TabelMY = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let getId = searchParams.get('id');
    const  {store} = useContext(Context)
    const inn = store.user.inn
    const login = store.user.login
    const [listObjs, setListObjs] = useState([])
    let now = new Date();
    let nowYear = now.getFullYear()
    const message = useMessage()
    const selectMonth = useMonth()

    const [listMonth, setListMonth] = useState([])

    const craftList = arr => {
        const listYears = []
        const newList = []
        arr.forEach(month => {
            if(!listYears.includes(month.year)){
                listYears.push(month.year)
            }
        })
        const shifrId = getId
        listYears.map((year, index) => {
            newList.push({
                id: index,
                year: year,
                idobj: shifrId,
                months: []
            })
        })
        newList.forEach(year => {
            const monthsProps = []
            arr.map((strock, index) => {
                if(year.year === strock.year){

                    monthsProps.push({
                        id: index,
                        shifr: year.idobj,
                        year: strock.year,
                        month: strock.month,
                        inn: inn
                    })
                }
            })
            year.months = monthsProps
        })



        console.log(newList)
        setListMonth(newList)
    }

    const plusMonth = async (e) => {
        const month = document.getElementById('selector_for_month')
        const year = document.getElementById('selector_for_year')
        if(month.value.length !== 0 && year.value.length !== 0){
            console.log(selectMonth(month.value))
            const selMonth = month.value
            const selYear = year.value
            try{
                const viewList = await ObjsService.createTabels({inn, getId, selMonth, selYear})
                message('Успешно, создан табель за' + selMonth + ' ' + selYear)
                console.log(viewList.data)
                craftList(viewList.data)
            }catch{
                message('Табель за' + selMonth + ' ' + selYear + ' не был добавлен. Попробуйте позже')
            }
        } else if(month.value.length === 0 && year.value.length !== 0) {
            message('Не выбран месяц')
        } else if(month.value.length !== 0 && year.value.length === 0) {
            message('Не выбран год')
        } else {
            message('Необходимо выбрать месяц и год для добавления')
        }

    }

    const viewAllTabels = async (e) => {
        // try{
            const viewList = await ObjsService.getAllTabels({inn, getId})

            // setListObjs(viewList.data)
            console.log(viewList.data)
            craftList(viewList.data)
        // }catch{
        //     console.log('ой, опаньки')
        // }
    }
    const viewAllObjs = async (e) => {

        const viewList = await ObjsService.getObjs({inn})
        setListObjs(viewList.data)
        console.log(viewList.data)
    }

    const {my_objs} = useContext(DataContext)

    const [newarr, setNewarr] = useState({})

    const makeObj = () => {
        const new_arr = []

        listObjs.forEach(item => {
            if(item.id === parseInt(getId)){
                new_arr.push(new_arr)
            }
        })

        // const new_arr = listObjs.filter(obj => {
        //     if (parseInt(getId) === parseInt(obj.id)) {
        //         return true
        //     } else {
        //         return false
        //     }
        // })[0]
        setNewarr(new_arr[0])
    }
        
    console.log(getId)
    console.log(newarr)

    useEffect(()=>{
        viewAllTabels()
        viewAllObjs()
        makeObj()
    }, [])


    return (
        <div className='right-block-ymwelding'>
            <div className='ymwelding_head'>
                <div className='ymwelding_head_btnlast'>Назад к объектам</div>
                <div className='ymwelding_head_nameobj'><span>{getId}</span>       </div>
                <div className='ymwelding_head_passobj'>Передать</div>
            </div>
            <div className='ymwelding_controller'>
                <div className='ymwelding_controller_ym'>
                    <select className='ymwelding_controller_ym_select' id='selector_for_month'>
                        <option></option>
                        <option value='0'>январь</option>
                        <option value='1'>февраль</option>
                        <option value='2'>март</option>
                        <option value='3'>апрель</option>
                        <option value='4'>май</option>
                        <option value='5'>июнь</option>
                        <option value='6'>июль</option>
                        <option value='7'>август</option>
                        <option value='8'>сентябрь</option>
                        <option value='9'>октябрь</option>
                        <option value='10'>ноябрь</option>
                        <option value='11'>декабрь</option>
                    </select>
                    <select className='ymwelding_controller_ym_select' id='selector_for_year'>
                        <option></option>
                        <option>{nowYear}</option>
                        <option>{nowYear+1}</option>
                        <option>{nowYear-1}</option>
                    </select>
                    <div onClick={()=>plusMonth()} className='ymwelding_controller_ym_pluss'>Создать</div>
                </div>
                <div className='ymwelding_controller_sistembtns'>
                    <div className='ymwelding_controller_sistembtns_crews'>Звенья / Бригады</div>
                    <div className='ymwelding_controller_sistembtns_itogs'>Отчеты</div>
                    <div className='ymwelding_controller_sistembtns_viewsjob'>Виды работ</div>
                </div>
            </div>
            <div className='ymwelding_slice'></div>
            {listMonth.map((year,index) => (
            <div key={index} className='ymwelding_years'>
                <div className='ymwelding_years_head'>{year.year}</div>
                <div className='ymwelding_years_body'>{  year.months.map((month,index) => (
                    <div key={index}>
                        <Link key={index} to={`/table-tabel/?id=${index}&shifr=${month.shifr}&month=${month.month}&year=${month.year}`} className='ymwelding_years_body_month'>
                            <div className='ymwelding_years_body_month_text'>{selectMonth(month.month)}</div>
                            <div className='ymwelding_years_body_month_settings'> ... </div>
                        </Link>
                    </div>
                        ))}
                </div>
            </div>
            ))
            }
            
        </div>
    )
}