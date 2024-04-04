import "./style.scss"
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PollsService from "../../../services/PollsService";

export const Slider = () => {
    const [checkContest,setCheckContest] = useState(true)
    const [checkAnswers,setCheckAnswers] = useState(true)

    const loadingHandler = async () => {
        try {
            const contest = await PollsService.checkExitsContests()
            const answers = await PollsService.checkVoteKids()
            setCheckContest(contest.data)
            setCheckAnswers(answers.data.check)
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        loadingHandler()
    },[])
    return (
        <div className="slider_block" style={{backgroundImage: `url('/files/news/contest/2.jpeg')`}}>
            <div style={(!checkContest && !checkAnswers) ? {marginTop:'-10px'}:{}} className={`data`}>
                <div className='text'>
                    <p>Конкурс детского рисунка</p>
                    <p className='big'>"День Победы глазами детей"</p></div>
                    {!checkContest ? <Link to={'/load-contest'} className={`button`}>подать заявку</Link> : null}
                    {!checkAnswers ? <Link to={'/kids-contest'} className={`button`}>Проголосовать</Link> : null}
                    { (checkAnswers && checkContest) ? <Link to={'/kids-contest'} className={`button`}>Посмотреть работы</Link> : null}
                    <Link className={`small-link`} to={'/viewpost?post=23'}>условия конкурса</Link>
            </div>

            <div className={`overlay`}></div>
        </div>
    )
}