import {MainHeader} from "../../components/header/Mainheader";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import {WorkPage} from "../../components/workpage/WorkPage";
import {WorkPageTask} from "../../components/tasks/WorkPageTask";

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
