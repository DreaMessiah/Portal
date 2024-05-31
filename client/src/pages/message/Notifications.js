import {MainHeader} from "../../components/header/Mainheader";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import {WorkPage} from "../../components/workpage/WorkPage";
import {ListMessages} from "../../components/messages/ListMessages";

export default function Notifications(){

    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <div className="workpage_block">

                </div>
            </div>
        </div>
    )
}