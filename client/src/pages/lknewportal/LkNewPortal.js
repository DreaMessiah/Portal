import "../styles/newportal/main.scss"
import {MainHeader} from "../../components/newportal/header/Mainheader";
import {WorkPage} from "../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";
import {LkNew} from "../../components/newportal/lknew/LkNew";

export default function LkNewPortal(){


    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<LkNew />}/>
            </div>
        </div>
    )
}
