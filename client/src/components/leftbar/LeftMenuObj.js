import {Link} from "react-router-dom";


export default function LeftMenuObj ({mass_create, mass_menu}) {

    const rotatePlus = e => {
        console.log(e);
        // e.target.lastChild.innerHTML = 'хуй'
    }

    return (

        <div className='leftmenuobj'>
            <div className='burger dis-none1920'>
                <div style={{backgroundColor: "#03AEAE"}}/>
                <div style={{backgroundColor: "#3C8801"}} />
                <div style={{backgroundColor: "#DC7700"}} />
                <div className="menu_burger">
                    <div className='createobj'>
                        {mass_create.map( (item,index) => (
                            <div key={index} onMouseEnter={(e) => rotatePlus(e.target.lastChild)}> <Link to={item.link} ><p>{item.text}<span>+</span></p></Link> </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='createobj dis-none'>

                {mass_create.map( (item,index) => (
                    <div key={index}> <Link to={item.link}><p>{item.text}<span>+</span></p></Link> </div>
                ))}
            </div>
            {mass_menu.map((item,index) => (
                <div className='menu_block ' key={index}>
                    <Link to={item.link}>
                        <div className='img_block'>
                            <div className={`img ${item.img}`}></div>
                        </div>
                        <div className="dis-none">{item.text}</div>
                        <div className="jab dis-none">
                            <div className={item.num ? 'num dis-none' : 'none dis-none'}>{item.num}</div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    )
}