import React, {useEffect, useRef, useState} from "react";

import LoadingSpinner from "../../components/loading/LoadingSpinner";
import PollsService from "../../services/PollsService";

export default function ResultsKidsContest(){
    const [loading,setLoading] = useState(false)

    const loadingHandler = async () => {
        try{
            setLoading(true)
            const {data} = await PollsService.getRe()
            if(data){
                const {answers,nominations} = data
                console.log(answers)
                console.log(nominations)
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

            {loading ? (<LoadingSpinner/>) : null}
        </>
    )
}



