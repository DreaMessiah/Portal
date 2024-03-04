import "./style.scss"

export const TasksMyList = () => {
    return (
        <div className="tasks_block">
            <div className="navigation">
                <div className="navigation_leftpath">
                    <div className="navigation_leftpath_tasks">Задачи<div className="navigation_path--coin">31</div></div>
                    <div className="navigation_leftpath_make">Делаю<div className="navigation_path--coin">22</div></div>
                    <div className="navigation_leftpath_helper">Помогаю<div className="navigation_path--coin">3</div></div>
                    <div className="navigation_leftpath_pass">Поручил<div className="navigation_path--coin">7</div></div>
                    <div className="navigation_leftpath_listen">Наблюдаю<div className="navigation_path--coin">2</div></div>
                </div>
                <div className="navigation_rightpath">
                    <div className="navigation_rightpath_projects">Проекты<div className="navigation_path--coin" style={{display: 'none'}}>0%</div></div>
                    <div className="navigation_rightpath_kpi">Эффективность<div className="navigation_path--coin">17%</div></div>
                </div>
                <div className="navigation_more">Ещё <div className="navigation_more_open">\/</div></div>
            </div>

            <div className="titlecap">
                <div className="titlecap_name">
                    <div className="titlecap_name_text">Мои задачи</div>
                    <div className="titlecap_name_star"></div>
                </div>
                <div className="titlecap_btn_plus_task">
                    <div className="titlecap_btn_plus_task_name">Добавить задачу</div>
                    <div className="titlecap_btn_plus_task_slash"></div>
                    <div className="titlecap_btn_plus_task_open">\/</div>
                </div>
                <div className="titlecap_in_work">
                    <div className="titlecap_in_work_btn">В работе</div>
                    <input className="titlecap_in_work_search" placeholder="ПОИСК"/>
                </div>
                <div className="titlecap_settbtns">
                    <div className="titlecap_settbtns_settings"></div>
                    <div className="titlecap_settbtns_flash"></div>
                </div>
            </div>

            <div className="cap_table">
                <div className="cap_table_left">
                    <div className="cap_table_left_list">Список</div>
                    <div className="cap_table_left_time">Сроки</div>
                    <div className="cap_table_left_myplan">Мой план</div>
                    <div className="cap_table_left_calendar">Календарь</div>
                    <div className="cap_table_left_grant">Грант</div>
                    <div className="cap_table_left_inside">Нет задач, требующих оперативной реакции</div>
                </div>
                <div className="cap_table_right">
                    <div className="cap_table_right_jobs">Работы</div>
                </div>
            </div>
            <div className="table_tasks">
                <div className="table_tasks_title">
                    <div className="table_tasks_title_check"></div>
                    <div className="table_tasks_title_sett">s</div>
                    <div className="table_tasks_title_name">НАЗВАНИЕ</div>
                    <div className="table_tasks_title_action">АКТИВНОСТЬ</div>
                    <div className="table_tasks_title_status">СТАТУС</div>
                    <div className="table_tasks_title_time">КРАЙНИЙ СРОК</div>
                    <div className="table_tasks_title_autor">ПОСТАНОВЩИК</div>
                    <div className="table_tasks_title_maker">ОТВЕТСТВЕННЫЙ</div>
                </div>
                <div className="table_tasks_strock">
                    <div className="table_tasks_strock_check"></div>
                    <div className="table_tasks_strock_sett">|||</div>
                    <div className="table_tasks_strock_name">Новое задание для проверки работы</div>
                    <div className="table_tasks_strock_action">22 ноября 2021, 16:40</div>
                    <div className="table_tasks_strock_status">Ждёт выполнения</div>
                    <div className="table_tasks_strock_time">
                        <div className="table_tasks_strock_time_marker">В активности 10:00</div>
                    </div>
                    <div className="table_tasks_strock_autor">
                        <div className="table_tasks_strock_autor_photo"></div>Иванов Дмитрий Сергеевич</div>
                    <div className="table_tasks_strock_maker"></div>
                </div>
            </div>
        </div>
    )
}