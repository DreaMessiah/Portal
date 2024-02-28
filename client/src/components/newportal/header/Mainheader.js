

export const MainHeader = () => {
    return (
        <div className="head_block">
            <div className="head_block_logo">Сургутское РСУ</div>
            <div className="head_block_search">
                <input className="head_block_search_input" placeholder="Поиск..."></input>
                <div className="head_block_search_btn"></div>
            </div>
            <div className="head_block_right">
                <div className="head_block_callback">Обратная связь</div>
                <div className="head_block_lk">
                    <div className="head_block_lk_photo"></div>
                    <div className="head_block_lk_name">Барахтянский Владимир</div>
                </div>
                <div className="head_block_questions">?</div>
            </div>
        </div>
    )
}
