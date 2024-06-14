import React, {useEffect, useRef, useState} from "react";

import LoadingSpinner from "../../components/loading/LoadingSpinner";
import PollsService from "../../services/PollsService";
import './contest.scss'
import YearsSting from "../../components/functions/yearsSting";

export default function ResultsKidsContest(){
    const [loading,setLoading] = useState(false)
    const [works,setWorks] = useState([])
    const [granpri,setGranpri] = useState(null)
    const [winWorks,setWinWorks] = useState([])

    const icons = ["fa-solid fa-medal","fa-solid fa-brain","fas fa-lightbulb","fa-solid fa-palette","fas fa-puzzle-piece"]

    const loadingHandler = async () => {
        try{
            setLoading(true)
            const {data} = await PollsService.getRe()
            if(data){
                const {answers,nominations,contests} = data
                 console.log(contests)
                // console.log(nominations)

                const answerCounts = answers.reduce((acc, obj) => {
                    const answer = obj.contest_id
                    if (acc[answer]) {
                        acc[answer] += 1
                    } else {
                        acc[answer] = 1
                    }
                    return acc
                }, {})

                let maxAnswer = null
                let maxCount = 0

                for (const [answer, count] of Object.entries(answerCounts)) {
                    if (count > maxCount) {
                        maxAnswer = answer
                        maxCount = count
                    }
                }
                const key = 'id'
                const cont = contests.find(element => element[key] === +maxAnswer);
                const resultData = { id: maxAnswer, count: maxCount, contest: cont};

                setGranpri(resultData)

                const UzheEst = [maxAnswer]
                console.log(UzheEst)
                const groupedAnswers = answers.reduce((acc, answer) => {
                    if (!acc[answer.nomination_id]) {
                        acc[answer.nomination_id] = {}
                    }
                    if (!acc[answer.nomination_id][answer.contest_id]) {
                        acc[answer.nomination_id][answer.contest_id] = 0;
                    }
                    if(!UzheEst.includes(answer.contest_id)) acc[answer.nomination_id][answer.contest_id] += 1;
                    return acc
                }, {})
                console.log(groupedAnswers)


/*                const winners = nominations.map(nomination => {
                    const answers = groupedAnswers[nomination.id];
                    if (!answers) {
                        return { nomination: nomination.name, winner: null, count: 0 };
                    }

                    let maxCount = 0;
                    let winnerUserId = null;

                    for (const [contestId, count] of Object.entries(answers)) {
                        if (count > maxCount && !UzheEst.includes(contestId)) {
                            maxCount = count;
                            winnerUserId = contestId;
                            UzheEst.push(contestId)
                        }
                    }
                    return { nomination: nomination.name, winner: winnerUserId, count: maxCount };
                })*/
                const winners = nominations.map(nomination => {
                    const answers = groupedAnswers[nomination.id];
                    if (!answers) {
                        return { nomination: nomination.name, winner: null, count: 0 };
                    }

                    let maxCount = 0;
                    let winnerUserId = null;
                    let candidateFound = false;

                    while (!candidateFound) {
                        maxCount = 0;
                        winnerUserId = null;

                        for (const [contestId, count] of Object.entries(answers)) {
                            if (count > maxCount && !UzheEst.includes(contestId)) {
                                maxCount = count;
                                winnerUserId = contestId;
                            }
                        }

                        if (winnerUserId !== null) {
                            UzheEst.push(winnerUserId);
                            candidateFound = true;
                        } else {
                            break;
                        }
                    }

                    return { nomination: nomination.name, winner: winnerUserId, count: maxCount };
                })

                winners.map( item => {
                    item.contest = contests.find(element => element[key] === +item.winner)
                })
                setWinWorks(winners)
                console.log(winners)
            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false)
        }
    }



    useEffect(() => {
        loadingHandler()
    },[])
    return (
        <>
            <div className={`results-contest`}>
                <div className={`granpri`}>
                    <h2>Результаты конкурса</h2>
                    <h3>Гран-при</h3>
                    <i className="fa-solid fa-trophy"></i>
                    {granpri ?
                        <div className={`work`}>
                            <div className={`name`}>{granpri.contest.name + ' ' + YearsSting(granpri.contest.age)}</div>
                            <div style={{backgroundImage:`url(/files/polls//${granpri.contest.image})` }} className={`kidwork`} ></div>
                        </div>
                        : null}
                </div>
                <div className={`win-nomi`}>
                {winWorks.length ? winWorks.map( (item,index) => (
                    <div key={index} className={`work`}>
                        <h3>{item.nomination}</h3>
                        <i className={icons[index] ? icons[index] : `fa-solid fa-trophy`}></i>
                        <div className={`name`}>{item.contest.name + ' ' + YearsSting(item.contest.age)}</div>
                        <div style={{backgroundImage:`url(/files/polls//${item.contest.image})` }} className={`kidwork`} ></div>
                    </div>
                )):null}
                </div>

            </div>
            {loading ? (<LoadingSpinner/>) : null}
        </>
    )
}



