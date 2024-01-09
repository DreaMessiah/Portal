import {Link} from "react-router-dom";

export default function LeftMenuObj ({mass}) {
    return (
        <div className='leftmenuobj'>
            {mass.map((item,index) => (
                <div className='menu_block' key={index}> <Link to={item.link}><div className='img_block'><div className={`img ${item.img}`}></div></div><p>{item.text}</p><span><div className={item.num ? 'num' : 'none'}>{item.num}</div></span></Link> </div>
            ))}
        </div>
    )
}