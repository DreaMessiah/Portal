import {useState,useContext} from "react";
import Navbar from "../components/Navbar"
import CreateObj from "../components/leftbar/CreateObj"
import GraphObj from "../components/GraphObj"
import SelectMonth from "../components/SelectMonth"
import CalendarObj from "../components/CalendarObj"
import WorksObj from "../components/WorksObj"
import WorksDocObj from "../components/WorksDocObj"
import WorksTmcObj from "../components/WorksTmcObj"
import LeftMenuObj from "../components/leftbar/LeftMenuObj"
import BlocksObj from "../components/BlocksObj"
import BridgeLeftBar from "../components/leftbar/BridgeLeftBar";
import {DataContext} from "../context/DataContext";

export default function MainPage(){
    const [selMonth,setSelMonth] = useState(9)

    const {mass_create, menu_mass, mass_blocks, graphmass1, titlegraph1, graphmass2, titlegraph2, calendarmass, works1mass, works2mass, works3mass } = useContext(DataContext)

    const onRightClick = () => {
        if(selMonth === 12) setSelMonth(1)
        else setSelMonth(selMonth+1)
    }
    const onLeftClick = () => {
        if(selMonth === 1) setSelMonth(12)
        else setSelMonth(selMonth-1)
    }

    return (
        <div className='container'>
            <Navbar/>
            <div className='flex'>
                <BridgeLeftBar arrcreate={mass_create} arrmenu={menu_mass}/>
                <div className='right_block'>
                    <div className='stroka'>
                        <BlocksObj mass={mass_blocks} />

                        <div className='rows'>
                            <SelectMonth selectedMonth={selMonth} onLeftClick={onLeftClick} onRightClick={onRightClick}/>
                            <GraphObj mass={graphmass1} title={titlegraph1}/>
                            <GraphObj mass={graphmass2} title={titlegraph2}/>
                        </div>

                        <CalendarObj mass={calendarmass}/>
                    </div>
                    <p className='title'>Актуальные задачи</p>
                    <WorksObj mass={works1mass}/>
                    <p className='title'>Документы в движении</p>
                    <WorksDocObj mass={works2mass}/>
                    <p className='title'>Движения ТМЦ</p>
                    <WorksTmcObj mass={works3mass}/>
                </div>
            </div>
        </div>
    );
};
