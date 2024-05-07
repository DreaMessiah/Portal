import React, {useContext, useEffect, useRef, useState} from "react";
import {DataContext} from "../../context/DataContext";
import './structure.scss'
import {ReactToPrint} from "react-to-print";
export default function StructurePageNew(){

        return (
        <div className='structure_new'>
            <div className={`title`}>Организационная структура ООО "Сургутское РСУ"</div>
            <div className="structure_new_forest">
                <div className="structure_new_forest_cuedo">
                    <div className="structure_new_forest_cuedo_general">
                        <div className="structure_new_forest_cuedo_card">
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content"></div>
                                <div className="structure_new_forest_cuedo_card_center_button">
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
                                    <div className="structure_new_forest_cuedo_card_center_content"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button">
                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    </div>
                                </div>
                                <div className="structure_new_forest_cuedo_card_bottom">Генеральный директор</div>
                            </div>
                            <div className="two_cueda">
                                <div>
                                    <div className="structure_new_forest_cuedo_card_two">
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_center">
                                            <div className="structure_new_forest_cuedo_card_center_content"></div>
                                            <div className="structure_new_forest_cuedo_card_center_button">
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
                                                    <div className="structure_new_forest_cuedo_card_center_content"></div>
                                                    <div className="structure_new_forest_cuedo_card_center_button">
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                    </div>
                                                </div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Заместитель главного инженера</div>
                                                <div className="structure_new_forest_cuedo_card_tree_list">example</div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="structure_new_forest_cuedo_card_tree">
                                                <div className="slash_rang"></div>
                                                <div className="structure_new_forest_cuedo_card_top"></div>
                                                <div className="structure_new_forest_cuedo_card_center">
                                                    <div className="structure_new_forest_cuedo_card_center_content"></div>
                                                    <div className="structure_new_forest_cuedo_card_center_button">
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                        <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                    </div>
                                                </div>
                                                <div className="structure_new_forest_cuedo_card_bottom">Заместитель генерального директора по производству</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div>
                                    <div className="structure_new_forest_cuedo_card_two">
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_center">
                                            <div className="structure_new_forest_cuedo_card_center_content"></div>
                                            <div className="structure_new_forest_cuedo_card_center_button">
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                            </div>
                                        </div>
                                        <div className="structure_new_forest_cuedo_card_bottom">Заместитель генерального директора по общим вопросам</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="structure_new_forest_cuedo_card_two finalblock">
                                        <div className="slash_rang"></div>
                                        <div className="structure_new_forest_cuedo_card_top"></div>
                                        <div className="structure_new_forest_cuedo_card_center">
                                            <div className="structure_new_forest_cuedo_card_center_content"></div>
                                            <div className="structure_new_forest_cuedo_card_center_button">
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                                <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                            </div>
                                        </div>
                                        <div className="structure_new_forest_cuedo_card_bottom">Главный механик</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                        <div className="structure_new_forest_cuedo_card">
                            <div className="slash_rang"></div>
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content"></div>
                                <div className="structure_new_forest_cuedo_card_center_button">
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                </div>
                            </div>
                            <div className="structure_new_forest_cuedo_card_bottom">Генеральный директор</div>
                        </div>
                        </div>
                        <div>
                        <div className="structure_new_forest_cuedo_card">
                            <div className="slash_rang"></div>
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content"></div>
                                <div className="structure_new_forest_cuedo_card_center_button">
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                </div>
                            </div>
                            <div className="structure_new_forest_cuedo_card_bottom">Генеральный директор</div>
                        </div>
                        </div>
                        <div>
                        <div className="structure_new_forest_cuedo_card">
                            <div className="slash_rang"></div>
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content"></div>
                                <div className="structure_new_forest_cuedo_card_center_button">
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                </div>
                            </div>
                            <div className="structure_new_forest_cuedo_card_bottom">Генеральный директор</div>
                        </div>
                        </div>
                        <div>
                        <div className="structure_new_forest_cuedo_card finalblock">
                            <div className="slash_rang"></div>
                            <div className="structure_new_forest_cuedo_card_top"></div>
                            <div className="structure_new_forest_cuedo_card_center">
                                <div className="structure_new_forest_cuedo_card_center_content"></div>
                                <div className="structure_new_forest_cuedo_card_center_button">
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                    <div className="structure_new_forest_cuedo_card_center_button_slash"></div>
                                </div>
                            </div>
                            <div className="structure_new_forest_cuedo_card_bottom">Генеральный директор</div>
                        </div>
                        </div>
                    </div>
                    <div className="structure_new_forest_cuedo_dother"></div>
                </div>
            </div>
        </div>
    )
}
