import "./tabel.scss";
import "../welding/yearmounth/viewobj.scss";
import {Link, useLocation} from "react-router-dom";
import {useContext, useEffect} from "react";
import {DataContext} from "../../context/DataContext";
import ObjsService from "../../services/ObjsService";
import {Context} from "../../index";


const arr_welding_tabel = [
    {
        id: 1,
        year: 2024,
        idobj: 1,
        months: [
                    
            {
                id: 2,
                shifr: '386',
                year: '2024',
                month: 'январь',
                inn: '8617014209'
            },

            {
                id: 1,
                shifr: '386',
                year: '2024',
                month: 'февраль',
                inn: '8617014209'
            }
        ]
    },
    {
        id: 2,
        year: 2023,
        idobj: 1,
        months: [
        
            {
                id: 6,
                shifr: '386',
                year: '2023',
                month: 'март',
                inn: '8617014209'
            },
        
            {
                id: 7,
                shifr: '386',
                year: '2023',
                month: 'апрель',
                inn: '8617014209'
            },
        
            {
                id: 8,
                shifr: '386',
                year: '2023',
                month: 'май',
                inn: '8617014209'
            },
        
            {
                id: 9,
                shifr: '386',
                year: '2023',
                month: 'июнь',
                inn: '8617014209'
            },
        
            {
                id: 10,
                shifr: '386',
                year: '2023',
                month: 'июль',
                inn: '8617014209'
            },
        
            {
                id: 11,
                shifr: '386',
                year: '2023',
                month: 'август',
                inn: '8617014209'
            },
        
            {
                id: 12,
                shifr: '386',
                year: '2023',
                month: 'сентябрь',
                inn: '8617014209'
            },
        
            {
                id: 13,
                shifr: '386',
                year: '2023',
                month: 'октябрь',
                inn: '8617014209'
            },
        
            {
                id: 14,
                shifr: '386',
                year: '2023',
                month: 'ноябрь',
                inn: '8617014209'
            },
        
            {
                id: 15,
                shifr: '386',
                year: '2023',
                month: 'декабрь',
                inn: '8617014209'
            }
        ]
    },

    
    
];

export const TabelMY = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    let getId = searchParams.get('id');
    const  {store} = useContext(Context)
    const inn = store.user.inn
    const login = store.user.login

    const viewAllTabels = async (e) => {
        const viewList = await ObjsService.getAllTabels({inn})

        // setListObjs(viewList.data)
        console.log(viewList.data)
    }


    const {my_objs} = useContext(DataContext)

    const new_arr = my_objs.filter(obj => {
        if(parseInt(getId) === parseInt(obj.id)){
            return true
        } else {
            return false
        }
    })[0]
        
    console.log(getId)
    console.log(new_arr)

    useEffect(()=>{
        viewAllTabels()
    },)


    return (
        <div className='right-block-ymwelding'>
            <div className='ymwelding_head'>
                <div className='ymwelding_head_btnlast'>Назад к объектам</div>
                <div className='ymwelding_head_nameobj'><span>{new_arr.name}</span>        {new_arr.description}</div>
                <div className='ymwelding_head_passobj'>Передать</div>
            </div>
            <div className='ymwelding_controller'>
                <div className='ymwelding_controller_ym'>
                    <select className='ymwelding_controller_ym_select'>
                        <option>январь</option>
                        <option>февраль</option>
                    </select>
                    <select className='ymwelding_controller_ym_select'>
                        <option>2023</option>
                        <option>2024</option>
                    </select>
                    <div className='ymwelding_controller_ym_pluss'>Создать</div>
                </div>
                <div className='ymwelding_controller_sistembtns'>
                    <div className='ymwelding_controller_sistembtns_crews'>Звенья / Бригады</div>
                    <div className='ymwelding_controller_sistembtns_itogs'>Отчеты</div>
                    <div className='ymwelding_controller_sistembtns_viewsjob'>Виды работ</div>
                </div>
            </div>
            <div className='ymwelding_slice'></div>
            {arr_welding_tabel.map((year,index) => (
            <div key={index} className='ymwelding_years'>
                <div className='ymwelding_years_head'>{year.year}</div>
                <div className='ymwelding_years_body'>{  year.months.map((month,index) => (
                    <div key={index}>
                        <Link key={index} to={`/table-tabel/?id=${index}&shifr=${month.shifr}&month=${month.month}&year=${month.year}`} className='ymwelding_years_body_month'>
                            <div className='ymwelding_years_body_month_text'>{month.month}</div>
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