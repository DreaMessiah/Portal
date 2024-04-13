import React, {useContext} from "react";
import { DataContext } from '../../context/DataContext';
import Navbar from "../../components/old/Navbar";
import DocumentWay from "../../components/old/DocumentWay";
import SearchObj from "../../components/old/SearchObj";
import ChangeObj from "../../components/old/ChangeObj";
import WrapButtonsObj from "../../components/old/WrapButtonsObj";
import WorksTasksObj from "../../components/old/WorkTasksObj";
import AttachObj from "../../components/old/AttachObj";
import PerformersObj from "../../components/old/PerformersObj";
import ResultsObj from "../../components/old/ResultsObj";
import BridgeLeftBar from "../../components/leftbar/BridgeLeftBar";

export default function DocumentPage(){
    const { mass_create, menu_mass, wrap_buttons, task1, attach1, performers, results, dwm1} = useContext(DataContext)
    return (
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

                    <div className='next-box'>
                        <div className='left-box'>
                            <DocumentWay dwm1={dwm1}/>
                        </div>
                        <div className='right-box'>
                            <div className='top-box-inside'>
                                <div className='top-box-inside-left'>
                                    <WorksTasksObj obj={task1}/>
                                    <AttachObj obj={attach1}/>
                                </div>
                                <div className='top-box-inside-right'>
                                    <PerformersObj obj={performers}/>
                                </div>
                            </div>
                            <div className='bottom-box'>
                                <ResultsObj obj={results}/>
                                <div className='docbuttons'>
                                    <div className='button'><p>Подписать/Направить</p></div>
                                    <div className='button'><p>Вернуть на доработку</p></div>
                                    <div className='button'><p>Закрыть</p></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
