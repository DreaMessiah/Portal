import "../../styles/newportal/main.scss"
import {MainHeader} from "../../../components/newportal/header/Mainheader";
import {Mainnavbar} from "../../../components/newportal/navbar/Mainnavbar";
import {WorkPage} from "../../../components/newportal/workpage/WorkPage";
import {WorkPageTask} from "../../../components/newportal/tasks/WorkPageTask";

export default function ThisTask(){


    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<WorkPageTask />}/>
            </div>
        </div>
    )
}
