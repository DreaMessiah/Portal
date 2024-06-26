import {MainHeader} from "../components/header/Mainheader";
import {WorkPage} from "../components/workpage/WorkPage";
import {Mainnavbar} from "../components/navbar/Mainnavbar";
import PhoneBookList from "../components/newphonebook/PhoneBookList";

export default function NewPhoneBook(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<PhoneBookList />}/>
            </div>
        </div>
    )
}