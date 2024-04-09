import "./constrollwelding.scss"
import {ModalBigWin} from "../../../modalwin/ModaBiglWin";
import {NewCrewModal} from "../tabelwelding/modalactive/NewCrewModal";
import React, {useEffect, useState} from "react";
import {NewControll} from "./modal/NewControll";
import WeldingService from "../../../../services/WeldingService";
import {useLocation} from "react-router-dom";
import {useMonth} from "../../../../hooks/month.hook";

export const ControllWeldingNew = () => {


    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);


    const thisMonth = useMonth()

    let getId = searchParams.get('id');
    let getShifr = searchParams.get('shifr');
    let getMonth = searchParams.get('month');
    let getYear = searchParams.get('year');


    const [active, setActive] = useState(false);



    const [thisobj, setThisobj] = useState({})

    const getParamObj = async (e) =>{
        const response = await WeldingService.getObgForHook({getShifr})
        console.log(response.data)
        setThisobj(response.data)
    }

    useEffect(()=>{
        getParamObj()
    }, [])

    return (
        <div className="controll_welding">

            <div className="controll_welding_cap">
                <div className="controll_welding_cap_controller">
                    <div className="controll_welding_cap_controller_plus" onClick={() => setActive(true)}></div>
                    <div className="controll_welding_cap_controller_filter"></div>
                </div>
                <div className="controll_welding_cap_title">
                    <div className="controll_welding_cap_title_text">{thisobj.shifr}</div>
                    <div className="controll_welding_cap_title_ym">{thisMonth(getMonth)} {getYear}</div>
                </div>

            </div>
            <div className="controll_welding_list" id="controll_welding_list">
                <div className="controll_welding_list_strock" id="list_strock">
                    <div className="controll_welding_list_strock_pp">п/п</div>
                    <div className="controll_welding_list_strock_num">Заявка</div>
                    <div className="controll_welding_list_strock_date">Дата</div>
                    <div className="controll_welding_list_strock_total">Кол-во</div>
                    <div className="controll_welding_list_strock_autor">Инициатор</div>
                    <div className="controll_welding_list_strock_obj">Объект</div>
                    <div className="controll_welding_list_strock_status">Статус</div>
                    <div className="controll_welding_list_strock_comm">Комментарий</div>
                    <div className="controll_welding_list_strock_editor_up">Управление</div>
                </div>

                <div className="controll_welding_list_strock">
                    <div className="controll_welding_list_strock_pp">1</div>
                    <div className="controll_welding_list_strock_num">А4654864</div>
                    <div className="controll_welding_list_strock_date">28-01-2024</div>
                    <div className="controll_welding_list_strock_total">10</div>
                    <div className="controll_welding_list_strock_autor">Аббасов Артур Яшарович</div>
                    <div className="controll_welding_list_strock_obj">390</div>
                    <div className="controll_welding_list_strock_status">Завершено</div>
                    <div className="controll_welding_list_strock_comm">нет</div>
                    <div className="controll_welding_list_strock_editor">
                        <div className="controll_welding_list_strock_editor_open">Открыть</div>
                        <div className="controll_welding_list_strock_editor_del"></div>
                    </div>
                </div>
            </div>
            {/*<ModalBigWin data={<NewCrewModal sel={select} active={crew} setActive={setCrew}/>} active={crew} setActive={setCrew}/>*/}
            <ModalBigWin plusform={<NewControll list={document.getElementById('list_strock')} active={active} setActive={setActive}/>} active={active} setActive={setActive}/>
        </div>
    )
}