import React, {useContext, useEffect, useRef, useState} from "react";
import {DataContext} from "../../context/DataContext";
import './structure.scss'
import {ReactToPrint} from "react-to-print";
export default function StructurePageNew(){

        const [win, setWin] = useState(false)
        const [opencard, setOpencard] = useState('none')

        const cardBranch = (branch) => {

        }

        return (
        <div className='structure_new'>
            <div className={`title`}>Организационная структура ООО "Сургутское РСУ"</div>
            <div className="structure_new_forest">
                <div className="structure_new_forest_cuedo">
                    <div className="structure_new_forest_cuedo_general">
                        <div className="structure_new_forest_cuedo_card">
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='first0')?{display:'flex'}:{display:'none'}}>
                                    <div className="structure_new_forest_cuedo_card_center_content_person">
                                        <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Макаров Александр Владимирович</div>
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">Генеральный директор</div>
                                        </div>
                                    </div>
                                    {/*style={{backgroundImage: `url("/files/profile/face.png")`}}*/}
                                </div>
                                <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='first0')?setOpencard('none'):setOpencard('first0')}>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                </div>
                            </div>
                            <div className="structure_new_forest_cuedo_card_bottom">Генеральный директор</div>
                        </div>
                        <div>
                            <div className="structure_new_forest_cuedo_card">
                                <div className="slash_rang"></div>
                                <div className="structure_new_forest_cuedo_card_top"></div>
                                <div className="structure_new_forest_cuedo_card_center">
                                    <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='first1')?{display:'flex'}:{display:'none'}}>
                                        <div className="structure_new_forest_cuedo_card_center_content_person">
                                            <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                                <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Кононов Марк Львович</div>
                                                <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">Исполнительный директор</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='first1')?setOpencard('none'):setOpencard('first1')}>
                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    </div>
                                </div>
                                <div className="structure_new_forest_cuedo_card_bottom">Исполнительный директор</div>
                            </div>
                            <div className="two_cueda">
                                <div>
                                    <div className="structure_new_forest_cuedo_card_two">
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_center">
                                            <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='second0')?{display:'flex'}:{display:'none'}}>
                                                <div className="structure_new_forest_cuedo_card_center_content_person">
                                                    <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                                    <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Севостьянов Анатолий Анатольевич</div>
                                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">Главный инженер</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='second0')?setOpencard('none'):setOpencard('second0')}>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                            </div>
                                        </div>
                                        <div className="structure_new_forest_cuedo_card_bottom">Главный инженер</div>
                                    </div>
                                    <div className="tree_cueda">
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree">
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_center">
                                                    <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='third0')?{display:'flex'}:{display:'none'}}>
                                                        <div className="structure_new_forest_cuedo_card_center_content_person">
                                                            <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                                                <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Жевлаков Евгений Михайлович</div>
                                                                <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">Заместитель главного инженера</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='third0')?setOpencard('none'):setOpencard('third0')}>
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                    </div>
                                                </div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Заместитель главного инженера</div>

                                            </div>
                                            <div className="four_cueda">
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>{setWin(true); cardBranch();}}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Технический отдел</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №1</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Лаборатория неразрушающего контроля</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №2</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Служба охраны труда</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №3</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Отдел геодезии</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №4</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Отдел главного энергетика</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №5</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Служба главного сварщика</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №6</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Служба экологической безопасности</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №7</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Служба контроля качества</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №8</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №9</div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree">
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_center">
                                                    <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='third1')?{display:'flex'}:{display:'none'}}>
                                                        <div className="structure_new_forest_cuedo_card_center_content_person">
                                                            <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                                                <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Варламов Сергей Владимирович</div>
                                                                <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">заместитель генерального директора по производству</div>
                                                            </div>
                                                        </div>
                                                        <div className="structure_new_forest_cuedo_card_center_content_person">
                                                            <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                                                <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Калимуллин Рустам Сагитович</div>
                                                                <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">заместитель генерального директора по производству</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='third1')?setOpencard('none'):setOpencard('third1')}>
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                    </div>
                                                </div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Заместитель генерального директора по производству</div>
                                            </div>
                                            <div className="four_cueda">
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Технический отдел</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №1</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Лаборатория неразрушающего контроля</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №2</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Служба охраны труда</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №3</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Отдел геодезии</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №4</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Отдел главного энергетика</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №5</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Служба главного сварщика</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №6</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Служба экологической безопасности</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №7</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Служба контроля качества</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №8</div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                        <div className="slash_rang"></div>
                                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                                        <div className="structure_new_forest_cuedo_card_bottom">Производственный участок №9</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div>
                                    <div className="structure_new_forest_cuedo_card_two">
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_center">
                                            <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='second1')?{display:'flex'}:{display:'none'}}>
                                                <div className="structure_new_forest_cuedo_card_center_content_person">
                                                    <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                                    <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Чупятов Александр Иванович</div>
                                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">Заместитель генерального директора по общим вопросам</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='second1')?setOpencard('none'):setOpencard('second1')}>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                            </div>
                                        </div>
                                        <div className="structure_new_forest_cuedo_card_bottom">Заместитель генерального директора по общим вопросам</div>
                                    </div>
                                    <div className="four_cueda">
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Центральная база</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Отдел экономической безопасности</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Отдел материально-технического снабжения</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Отдел кадров</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Отдел эксплуатации и технического контроля</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Склад запчастей</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Склад ГСМ</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Отдел социального развития</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Юридическая служба</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Центральный склад</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <div className="structure_new_forest_cuedo_card_two ">
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_center">
                                            <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='second2')?{display:'flex'}:{display:'none'}}>
                                                <div className="structure_new_forest_cuedo_card_center_content_person">
                                                    <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                                    <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Редькин Юрий Евгеньевич</div>
                                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">Главный механик</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='second2')?setOpencard('none'):setOpencard('second2')}>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                            </div>
                                        </div>
                                        <div className="structure_new_forest_cuedo_card_bottom">Главный механик</div>
                                    </div>
                                    <div className="four_cueda">
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Отдел главного механика</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Автомобильная колонна №1</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Автомобильная колонна №2</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree honest" onClick={()=>setWin(true)}>
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Автомобильная колонна №3</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        <div className="structure_new_forest_cuedo_card">
                            <div className="slash_rang"></div>
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='first2')?{display:'flex'}:{display:'none'}}>
                                    <div className="structure_new_forest_cuedo_card_center_content_person">
                                        <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Сенина Ирина Ромазановна</div>
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">Заместитель генерального директора по экономике</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='first2')?setOpencard('none'):setOpencard('first2')}>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                </div>
                            </div>
                            <div className="structure_new_forest_cuedo_card_bottom">Заместитель генерального директора по экономике</div>

                        </div>
                            <div className="five_cueda">
                                <div>
                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_bottom">Планово-производственный отдел</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_bottom">Отдел подготовки производства</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_bottom">Экономическая служба</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_bottom">Отдел управления инновационной деятельностью</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                        <div className="structure_new_forest_cuedo_card">
                            <div className="slash_rang"></div>
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='first3')?{display:'flex'}:{display:'none'}}>
                                    <div className="structure_new_forest_cuedo_card_center_content_person">
                                        <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Гаврилова Наталья Владимировна</div>
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">Главный бухгалтер</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='first3')?setOpencard('none'):setOpencard('first3')}>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                </div>
                            </div>
                            <div className="structure_new_forest_cuedo_card_bottom">Главный бухгалтер</div>
                        </div>
                            <div className="five_cueda">
                                <div>
                                    <div className="structure_new_forest_cuedo_card_tree" onClick={()=>setWin(true)}>
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_bottom">Бухгалтерия</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                        <div className="structure_new_forest_cuedo_card">
                            <div className="slash_rang"></div>
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='first4')?{display:'flex'}:{display:'none'}}>
                                    <div className="structure_new_forest_cuedo_card_center_content_person">
                                        <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Невкрытых Альмира Равильевна</div>
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">старший делопроизводитель</div>
                                        </div>
                                    </div>
                                    <div className="structure_new_forest_cuedo_card_center_content_person">
                                        <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Шнайдер Александра Олеговна</div>
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">делопроизводитель</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='first4')?setOpencard('none'):setOpencard('first4')}>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                </div>
                            </div>
                            <div className="structure_new_forest_cuedo_card_bottom">Служба делопроизводства</div>
                        </div>
                        </div>
                        <div>
                        <div className="structure_new_forest_cuedo_card finalblock">
                            <div className="slash_rang"></div>
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content" style={(opencard==='first5')?{display:'flex'}:{display:'none'}}>
                                    <div className="structure_new_forest_cuedo_card_center_content_person">
                                        <div className="structure_new_forest_cuedo_card_center_content_person_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                        <div className="structure_new_forest_cuedo_card_center_content_person_disc">
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_name">Чернобай Ольга Владимировна</div>
                                            <div className="structure_new_forest_cuedo_card_center_content_person_disc_dev">начальник отдела продаж</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="structure_new_forest_cuedo_card_center_button" onClick={()=>(opencard==='first5')?setOpencard('none'):setOpencard('first5')}>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                </div>
                            </div>
                            <div className="structure_new_forest_cuedo_card_bottom">Отдел продаж</div>
                        </div>
                        </div>
                    </div>
                    <div className="structure_new_forest_cuedo_dother"></div>
                </div>
            </div>
            <div className='glass' style={(win)?{display: 'flex'}:{display: 'none'}}>
                <div className="glass_board">
                    <div className="glass_board_close"><i className="fa-solid fa-xmark" onClick={()=>setWin(false)}/></div>
                    <div className="glass_board_body">
                        <div className="glass_title">Служба главного сварщика</div>
                        <div className="glass_list_persons">
                            <div className="glass_list_persons_man">
                                <div className="glass_list_persons_man_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                <div className="glass_list_persons_man_name">Аберясьев Евгений Павлович</div>
                                <div className="glass_list_persons_man_dev">Главный сварщик</div>
                                <div className="glass_list_persons_man_branch">Служба главного сварщика</div>
                                <div className="glass_list_persons_man_phone">телефон: 140</div>
                                <div className="glass_list_persons_man_btn">Написать</div>
                            </div>
                            <div className="glass_list_persons_man">
                                <div className="glass_list_persons_man_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                <div className="glass_list_persons_man_name">Абубакиров Альберт Салихович</div>
                                <div className="glass_list_persons_man_dev">заместитель главного сварщика</div>
                                <div className="glass_list_persons_man_branch">Служба главного сварщика</div>
                                <div className="glass_list_persons_man_phone">телефон: 140</div>
                                <div className="glass_list_persons_man_btn">Написать</div>
                            </div>
                            <div className="glass_list_persons_man">
                                <div className="glass_list_persons_man_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                <div className="glass_list_persons_man_name">Асаев Владимир Анатольевич</div>
                                <div className="glass_list_persons_man_dev">Главный сварщик</div>
                                <div className="glass_list_persons_man_branch">инженер по сварке 2 категории</div>
                                <div className="glass_list_persons_man_phone">телефон: 140</div>
                                <div className="glass_list_persons_man_btn">Написать</div>
                            </div>
                            <div className="glass_list_persons_man">
                                <div className="glass_list_persons_man_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                <div className="glass_list_persons_man_name">Зубаиров Марат Наилевич</div>
                                <div className="glass_list_persons_man_dev">мастер по ремонту сварочного оборудования</div>
                                <div className="glass_list_persons_man_branch">Служба главного сварщика</div>
                                <div className="glass_list_persons_man_phone">телефон: 140</div>
                                <div className="glass_list_persons_man_btn">Написать</div>
                            </div>
                            <div className="glass_list_persons_man">
                                <div className="glass_list_persons_man_photo" style={{backgroundImage: `url("/files/profile/face.png")`}}></div>
                                <div className="glass_list_persons_man_name">Чариков Михаил Александрович</div>
                                <div className="glass_list_persons_man_dev">инженер по сварке 2 категории</div>
                                <div className="glass_list_persons_man_branch">Служба главного сварщика</div>
                                <div className="glass_list_persons_man_phone">телефон: 140</div>
                                <div className="glass_list_persons_man_btn">Написать</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
