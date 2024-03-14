import {MainHeader} from "../../components/newportal/header/Mainheader";
import {WorkPage} from "../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";
import {useLocation} from "react-router-dom";
import './polls.scss'
import CmsPage from "./CmsPage";
export default function PollsCms(){
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search)
    const getSurvey = searchParams.get('survey') ? searchParams.get('survey') : 0

    const rule = 3

    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                {rule === 3 ? <WorkPage data={<CmsPage />}/> : <WorkPage data={<p>404</p>}/>}
            </div>
        </div>
    )
}
