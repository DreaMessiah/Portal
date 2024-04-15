import {MainHeader} from "../components/header/Mainheader";
import {WorkPage} from "../components/workpage/WorkPage";
import {Mainnavbar} from "../components/navbar/Mainnavbar";
import PaySlip from "../components/payslip/PaySlip";

export default function NewPayList(){
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={<PaySlip />}/>
            </div>
        </div>
    )
}
