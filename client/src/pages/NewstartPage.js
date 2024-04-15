import {MainHeader} from "../components/header/Mainheader";
import {WorkPage} from "../components/workpage/WorkPage";
import {Mainnavbar} from "../components/navbar/Mainnavbar";
import {NewMain} from "../components/main/Main";

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
