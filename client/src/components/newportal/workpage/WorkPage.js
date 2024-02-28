import {Slider} from "../slider/Slider";
import "./style.scss"
import {FastBtns} from "../fastbtns/FastBtns";


export const WorkPage = () => {
    return (
        <div className="workpage_block">
            <div className="workpage_block_slider">
                <Slider />
                <FastBtns />
            </div>
        </div>
    )
}