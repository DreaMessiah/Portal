import {Slider} from "../slider/Slider";
import "../workpage/style.scss"
import "./style.scss"
import {FastBtns} from "../fastbtns/FastBtns";
import {NewsBlock} from "../news/NewsBlock";


export const NewMain = () => {
    return (
        <div className="main_block">
            <div className="workpage_block_slider">
                <Slider />
                <FastBtns />
            </div>
            <div className="workpage_block_news">
                <NewsBlock />
            </div>
        </div>
    )
}