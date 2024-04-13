import {Link} from "react-router-dom";

const containerStyle = [{
    backgroundColor: '#04B800',
    width: '70px'
},
    {
        backgroundColor: 'grey',
        width: '60px'
    },
    {
        backgroundColor: 'aqua',
        width: '90px'
    },
    {
        backgroundColor: 'red',
        width: '20px'
    },
];

export default function graphsobj ({title,mass}) { // получается массив обьектов
    //const massiv = Array.from(mass)
    //console.log(mass)
    return (
        <div className='graphobj'>
            <p className='title'>{title}</p>
            <div className='rotate'>
                {mass.map( (item,index) => (
                    <div key={index}><p>{item.text}</p><div className='process' style={containerStyle[index]}><p className='number'>{item.num}</p></div></div>

                    ))}
            </div>
        </div>
    )
}
