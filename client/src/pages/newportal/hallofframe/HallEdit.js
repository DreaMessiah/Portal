import "../../styles/newportal/main.scss"
import {MainHeader} from "../../../components/newportal/header/Mainheader";
import {WorkPage} from "../../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../../components/newportal/navbar/Mainnavbar";
import {TumblerHall} from "../../../components/newportal/hallofframe/TumblerHall";

export default function HallEdit(){


    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<TumblerHall />}/>
            </div>
        </div>
    )
}
