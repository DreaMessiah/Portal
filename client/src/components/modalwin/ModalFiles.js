import "./modalupload.scss";



export default function ModalFiles ( {data, active, setActive}){
    return (
        <div className={`modal ${active ? 'modal_active' : ''}`}>

            <div className='middle-modal-win-files'>
                <div className='middle-modal-win-up'>
                    <span className='left-border'></span>
                    <span className='right-border' onClick={() => setActive(false)}><i className="fa-solid fa-xmark"></i></span>
                </div>
                <div className='middle-modal-win-data'>
                    {data}
                </div>
            </div>
            <div className='modal-back' onClick={() => setActive(false)}></div>
        </div>
    )
}