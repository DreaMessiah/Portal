import "./modalupload.scss";



export default function ModalFiles ( {heigth = '30vh', width = 'eee',data, active, setActive}){
    return (
        <div className={`modal ${active ? 'modal_active' : ''}`}>

            <div style={(width !== 'eee')?{height:heigth}:{height:heigth, width:'80vw !important', maxWidth:'80vw !important'}} className='middle-modal-win-files'>
                <div className='middle-modal-win-up'>
                    <span className='left-border'></span>
                    <span className='right-border' onClick={() => setActive(false)} style={{color: '#000'}}><i className="fa-solid fa-xmark"></i></span>
                </div>
                <div className='middle-modal-win-data'>
                    {data}
                </div>
            </div>
            <div className='modal-back' onClick={() => setActive(false)}></div>
        </div>
    )
}