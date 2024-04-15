import {MainHeader} from "../../components/header/Mainheader";
import {WorkPage} from "../../components/workpage/WorkPage";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import PollsList from "./PollsList";
import './polls.scss'
import SurveyPage from "./SurveyPage";
import {useLocation} from "react-router-dom";
export default function PollsPage(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const getSurvey = searchParams.get('survey') ? searchParams.get('survey') : 0
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {getSurvey ? <WorkPage data={<SurveyPage id={getSurvey} />}/> : <WorkPage data={<PollsList />}/>}
            </div>
        </div>
    )
}
