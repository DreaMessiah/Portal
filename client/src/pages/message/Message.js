import {MainHeader} from "../../components/header/Mainheader";
import {Mainnavbar} from "../../components/navbar/Mainnavbar";
import {WorkPage} from "../../components/workpage/WorkPage";
import {ListMessages} from "../../components/messages/ListMessages";

export default function Message(){


    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<ListMessages />}/>
            </div>
        </div>
    )
}