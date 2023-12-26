import {Link} from "react-router-dom";

export default function createobj ({mass}) { // получается массив обьектов
    //const massiv = Array.from(mass)
    //console.log(mass)
    return (
        <div className='createobj'>
            {mass.map( (item,index) => (
                <div key={index}> <Link to={item.link}><p>{item.text}<span>+</span></p></Link> </div>
            ))}
        </div>
    )
}