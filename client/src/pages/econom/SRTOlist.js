import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import {Context} from "../../index"
import "./ogm.scss"
import Select from "react-select";
import ObjsService from "../../services/ObjsService";


function SRTOlist(){
    const {store} = useContext(Context)
    const [priory, setPriory] = useState([])
    const iam = store.user
    const rule = iam.unit
    const months = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь']
    const yearnow = new Date().getFullYear()
    const monthnow = new Date().getMonth()
    const [selmonth, setSelmonth] = useState({index: 10, value: 10, label: months[monthnow]})
    const [selyear, setSelyear] = useState(yearnow)
    const [tabels, setTabels] = useState([])
    const [oldtabels, setOldTabels] = useState([])
    const [mainlist, setMainlist] = useState([])
    const makeList = () => {
        const fulltabel = [...tabels]
        const newlist = []
        const filterlist = []
        const itogytabel = []
        fulltabel.forEach(line=>{
            if(!filterlist.includes(line.tn)){
                filterlist.push(line.tn);
                for(let i = 1; i<=31; i++){
                    line[`d${i}`] = ''
                    line[`c${i}`] = ''
                    line[`dop${i}`] = ''
                    line[`m${i}`] = ''
                }
                newlist.push(line)
            }
        })
        newlist.sort((a, b) => {
            if (a.name < b.name) {
                return -1
            }
            if (a.name > b.name) {
                return 1
            }
            return 0
        })
        console.log(newlist)


        setMainlist(newlist)

    }

    const getPriory = async () => {
        try{
            const {data} = await ObjsService.getPriory()
            setPriory(data)
        }catch(e){console.log(e)}
    }

    const getTabel = async () => {
        try{
            const objs = [...priory]
            const nameobj = []
            objs.forEach(obj => {
                nameobj.push(obj.objects.shifr)
            })

            if(priory.length > 0){
                const {data} = await ObjsService.getTabelSRTO({nameobj,selmonth,selyear})
                if(data.length){
                    setTabels(data.map(item => ({ ...item })))
                    setOldTabels(data.map(item => ({ ...item })))
                    return data
                }
            }
        }catch(e){console.log(e)}
    }

    const monthsList = [
        {index: 0, value: 0, label: 'январь'},
        {index: 1, value: 1, label: 'февраль'},
        {index: 2, value: 2, label: 'март'},
        {index: 3, value: 3, label: 'апрель'},
        {index: 4, value: 4, label: 'май'},
        {index: 5, value: 5, label: 'июнь'},
        {index: 6, value: 6, label: 'июль'},
        {index: 7, value: 7, label: 'август'},
        {index: 8, value: 8, label: 'сентябрь'},
        {index: 9, value: 9, label: 'октябрь'},
        {index: 10, value: 10, label: 'ноябрь'},
        {index: 11, value: 11, label: 'декабрь'},
    ]
    const yearsList = [
        {index: 0, value: `${yearnow}`, label: `${yearnow}`},
        {index: 1, value: `${yearnow-1}`, label: `${yearnow-1}`},
        {index: 2, value: `${yearnow-2}`, label: `${yearnow-2}`}
    ]

    useEffect(()=>{
        getPriory()
    },[])
    useEffect(()=>{
        if(priory.length) getTabel()
    },[priory])
    useEffect(()=>{
        if(tabels.length) makeList()
    },[tabels])
    return (
        <div>
            <div className="filter">
                <Select onChange={(e) => {setSelmonth(monthsList[e.index]);getTabel()}} value={selmonth} options={monthsList} placeholder="Выбрать месяц" styles={{container:(baseStyles, state) => ({...baseStyles,width:'250px'})}}/>
                <Select onChange={(e) => {setSelyear(yearsList[e.index]);getTabel()}} value={selyear} options={yearsList} placeholder="Выбрать год" styles={{container:(baseStyles, state) => ({...baseStyles,width:'250px'})}}/>
                <div>сбросить</div>
            </div>
            <div>
                <tbody>
                <table style={{ borderCollapse: 'collapse' }}>
                    <tr style={{position: 'sticky', top: '59px', backgroundColor: '#FFFFFF'}}>
                        <th style={{ border: '1px solid black' }}>П/П</th><th style={{ border: '1px solid black' }}>ФИО</th><th style={{ border: '1px solid black' }}>должность</th><th style={{ border: '1px solid black' }}>отдел</th>
                        {[...Array(31)].map((_, dayi) => (
                            <th style={{ border: '1px solid black' }} key={dayi}>{dayi + 1}</th>
                        ))}<th style={{ border: '1px solid black' }}>Дней</th><th style={{ border: '1px solid black' }}>Ставка</th><th style={{ border: '1px solid black' }}>Таб. номер</th>
                    </tr>
                    {mainlist&&mainlist.map((strock, index)=>{
                        const man = {}
                        for(let i = 1; i<=31; i++){
                            man[`m${i}`] = ''
                            man[`sum${i}`] = 0
                        }
                        oldtabels.forEach(line => {
                            for(let i = 1; i<=31; i++){
                                let cost = 0
                                if(strock.tn === line.tn && man[`m${i}`] === '' && line[`m${i}`] !== '' && strock.branch !== 'механики'){man[`m${i}`] = line[`m${i}`];if(line.transport.split('|')[1])man[`sum${i}`] = +line.transport.split('|')[1];}
                            }
                        })
                        oldtabels.forEach(line => {
                            for(let i = 1; i<=31; i++){
                                if(strock.tn === line.tn && man[`m${i}`] === '' && line[`m${i}`] !== '' && strock.branch === 'механики'){man[`m${i}`] = line[`m${i}`];if(line.transport.split('|')[1])man[`sum${i}`] = +line.transport.split('|')[1];}
                            }
                        })
                        let itogy = 0
                        let fullcost = 0
                        for(let i = 1; i<=31; i++){
                            if(man[`m${i}`] !== ''){itogy++;fullcost=fullcost+man[`sum${i}`]}
                        }

                        return(
                            <tr key={index}>
                                <td style={{ border: '1px solid black' }}>{index+1}</td>
                                <td style={{ border: '1px solid black' }}>{strock.name}</td>
                                <td style={{ border: '1px solid black' }}>{strock.developer}</td>
                                <td style={{ border: '1px solid black' }}>{strock.branch}</td>
                                <td style={{ border: '1px solid black' }}>{man.m1}</td>
                                <td style={{ border: '1px solid black' }}>{man.m2}</td>
                                <td style={{ border: '1px solid black' }}>{man.m3}</td>
                                <td style={{ border: '1px solid black' }}>{man.m4}</td>
                                <td style={{ border: '1px solid black' }}>{man.m5}</td>
                                <td style={{ border: '1px solid black' }}>{man.m6}</td>
                                <td style={{ border: '1px solid black' }}>{man.m7}</td>
                                <td style={{ border: '1px solid black' }}>{man.m8}</td>
                                <td style={{ border: '1px solid black' }}>{man.m9}</td>
                                <td style={{ border: '1px solid black' }}>{man.m10}</td>
                                <td style={{ border: '1px solid black' }}>{man.m11}</td>
                                <td style={{ border: '1px solid black' }}>{man.m12}</td>
                                <td style={{ border: '1px solid black' }}>{man.m13}</td>
                                <td style={{ border: '1px solid black' }}>{man.m14}</td>
                                <td style={{ border: '1px solid black' }}>{man.m15}</td>
                                <td style={{ border: '1px solid black' }}>{man.m16}</td>
                                <td style={{ border: '1px solid black' }}>{man.m17}</td>
                                <td style={{ border: '1px solid black' }}>{man.m18}</td>
                                <td style={{ border: '1px solid black' }}>{man.m19}</td>
                                <td style={{ border: '1px solid black' }}>{man.m20}</td>
                                <td style={{ border: '1px solid black' }}>{man.m21}</td>
                                <td style={{ border: '1px solid black' }}>{man.m22}</td>
                                <td style={{ border: '1px solid black' }}>{man.m23}</td>
                                <td style={{ border: '1px solid black' }}>{man.m24}</td>
                                <td style={{ border: '1px solid black' }}>{man.m25}</td>
                                <td style={{ border: '1px solid black' }}>{man.m26}</td>
                                <td style={{ border: '1px solid black' }}>{man.m27}</td>
                                <td style={{ border: '1px solid black' }}>{man.m28}</td>
                                <td style={{ border: '1px solid black' }}>{man.m29}</td>
                                <td style={{ border: '1px solid black' }}>{man.m30}</td>
                                <td style={{ border: '1px solid black' }}>{man.m31}</td>
                                <td style={{ border: '1px solid black' }}>{itogy}</td>
                                <td style={(itogy>0 && fullcost === 0)?{ border: '1px solid black', backgroundColor: 'skyblue' }:{ border: '1px solid black' }}>{(itogy!==0)?Math.round(fullcost/itogy):0}</td>
                                <td style={{ border: '1px solid black' }}>{strock.tn}</td>
                            </tr>
                        )
                    })}

                </table>
                </tbody>
            </div>
        </div>
    )
}

export default observer(SRTOlist)