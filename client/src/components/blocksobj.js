import {Link} from "react-router-dom";

export default function blocksobj ({mass}) { // получается массив обьектов
    //const massiv = Array.from(mass)
    //console.log(mass)
    return (
        <div className='blocksobj'>
            {mass.map( (item,index) => (
                <div key={index}> <Link to={item.link}><p>{item.text}</p></Link> </div>
            ))}
        </div>
    )
}