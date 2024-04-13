import "../styles/newportal/main.scss"
import {MainHeader} from "../../components/newportal/header/Mainheader";
import {WorkPage} from "../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";
import PaySlip from "../../components/newportal/payslip/PaySlip";

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
