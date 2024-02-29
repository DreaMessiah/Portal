import "./styles/newportal/main.scss"
import {MainHeader} from "../components/newportal/header/Mainheader";
import {WorkPage} from "../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../components/newportal/navbar/Mainnavbar";
import {NewMain} from "../components/newportal/main/Main";

export default function NewstartPage(){


    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<NewMain />}/>
            </div>
        </div>
    )
}
