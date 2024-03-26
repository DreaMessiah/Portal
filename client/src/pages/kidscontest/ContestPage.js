import {MainHeader} from "../../components/newportal/header/Mainheader";
import {WorkPage} from "../../components/newportal/workpage/WorkPage";
import {Mainnavbar} from "../../components/newportal/navbar/Mainnavbar";

import '../survey/polls.scss'
import './contest.scss'
import {useLocation} from "react-router-dom";
import ListContest from "./ListContest";
import {useEffect, useState} from "react";
import PollsService from "../../services/PollsService";
import KidsGallery from "./KidsGallery";
import {useMessage} from "../../hooks/message.hook";

export default function ContestPage(){
    const [isVote,setIsVote] = useState(false)
    const message = useMessage()
    // const location = useLocation();
    // const searchParams = new URLSearchParams(location.search)
    // const getSurvey = searchParams.get('survey') ? searchParams.get('survey') : 0

    const loadingHandler = async () => {
        try {
            const check = await PollsService.checkVoteKids()
            if(check.data.check){
                setIsVote(check.data.check)
                if(check.data.check){
                    //message('Вы уже проголосовали')
                }
            }
        }catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        loadingHandler()
    },[])
    return (
        <div className='new_container'>
            <div className="up_path"><MainHeader /></div>
            <div className="main_path">
                <Mainnavbar />
                <WorkPage data={isVote ? <KidsGallery/>: <ListContest /> }/>
            </div>
        </div>
    )
}
