import "../../styles/newportal/main.scss"
import {MainHeader} from "../../../components/newportal/header/Mainheader";
import {Mainnavbar} from "../../../components/newportal/navbar/Mainnavbar";
import {WorkPage} from "../../../components/newportal/workpage/WorkPage";
import {BTNsNodes} from "../../../components/newportal/fastbtns/BTNsNodes";

export default function ListFastBtns(){


    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<BTNsNodes />}/>
            </div>
        </div>
    )
}