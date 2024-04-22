import "./modalupload.scss";



export default function ModalFiles ( {heigth = '30vh',data, active, setActive}){
    return (
        <div className={`modal ${active ? 'modal_active' : ''}`}>

            <div style={{height:heigth}} className='middle-modal-win-files'>
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