import {useCallback} from "react"
import 'react-toastify/dist/ReactToastify.css';

export const useMonth = () => {
    return useCallback(num => {
        num = parseInt(num)
        const mounths = {
            0: 'январь',
            1: 'февраль',
            2: 'март',
            3: 'апрель',
            4: 'май',
            5: 'июнь',
            6: 'июль',
            7: 'август',
            8: 'сентябрь',
            9: 'октябрь',
            10: 'ноябрь',
            11: 'декабрь',
        }

        if(12 > num >= 0){
            return mounths[num]
        }
    },[])
}