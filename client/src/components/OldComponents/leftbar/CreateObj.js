import {Link} from "react-router-dom";

export default function CreateObj ({mass}) { // получается массив обьектов
    return (
        <div className='createobj'>

            {mass.map( (item,index) => (
                <div key={index}> <Link to={item.link}><p>{item.text}<span>+</span></p></Link> </div>
            ))}
        </div>
    )
}