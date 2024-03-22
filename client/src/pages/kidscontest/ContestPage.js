import {MainHeader} from "../../components/newportal/header/Mainheader";
import {WorkPage} from "../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";

import '../survey/polls.scss'
import './contest.scss'
import {useLocation} from "react-router-dom";
import ListContest from "./ListContest";

export default function ContestPage(){
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search)
    // const getSurvey = searchParams.get('survey') ? searchParams.get('survey') : 0

    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<ListContest />}/>
            </div>
        </div>
    )
}
