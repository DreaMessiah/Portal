import "./style.scss"
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import PollsService from "../../services/PollsService";

export const Slider = () => {
    const [checkContest,setCheckContest] = useState(true)
    const [checkAnswers,setCheckAnswers] = useState(false)

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
        <div className="slider_block" style={{backgroundImage: `url('/news/contest/imgrussia.jpg')`, backgroundColor: 'rgba(255,255,255,0.9)'}}>
            <div style={(!checkContest && !checkAnswers) ? {marginTop:'-10px'}:{}} className={`data`}>
                <div className='text'>
                    <p  style={{backgroundColor: 'rgba(255,255,255,0.7)', padding: '0 5px'}}>Конкурс детского рисунка</p>
                    <p  style={{backgroundColor: 'rgba(255,255,255,0.7)', padding: '0 5px'}} className='big'>"Я рисую мою Россию"</p></div>
                    {!checkContest ? <Link to={'/load-contest'} className={`button`}>подать заявку</Link> : null}
                    {/*{!checkAnswers ? <Link to={'/kids-contest'} className={`button`}>Проголосовать</Link> : null}*/}
                    { (checkAnswers && checkContest) ? <Link to={'/kids-contest'} className={`button`}>Посмотреть работы</Link> : null}
                    <Link style={{backgroundColor: 'rgba(255,255,255,0.7)', padding: '0 5px'}} className={`small-link`} to={'/viewpost?post=35'}> условия конкурса </Link>
            </div>

            <div className={`overlay`}></div>
        </div>
    )
}