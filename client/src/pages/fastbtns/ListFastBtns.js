import {MainHeader} from "../../components/header/Mainheader";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import {WorkPage} from "../../components/workpage/WorkPage";
import {BTNsNodes} from "../../components/fastbtns/BTNsNodes";

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