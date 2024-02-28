import "./styles/newportal/main.scss"
import {MainHeader} from "../components/newportal/header/Mainheader";
import {WorkPage} from "../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../components/newportal/navbar/Mainnavbar";

export default function NewstartPage(){


    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage />
            </div>
        </div>
    )
}
