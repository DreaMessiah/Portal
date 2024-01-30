import "./modalwin.scss";



export const ModalBigWin = ( {plusform, active, setActive}) => {
let actives = 'f'
    return (
        <div className={`modal ${active ? 'modal_active' : ''}`}>
            <div className='modal_bigwin_wight'>
                <div className='modal_win_wight_up'>
                    <div className='modal_win_wight_krest' onClick={() => setActive(false)}>
                        <div className='del_icon_white'></div>
                    </div>
                </div>
                <div className='modal_win_wight_main' id='modalwin'>
                    {plusform}
                </div>
                <div className='modal_win_wight_bottom'></div>

            </div>
        <div className='modal_win' onClick={() => setActive(false)}>

        </div>

            </div>
    )
}