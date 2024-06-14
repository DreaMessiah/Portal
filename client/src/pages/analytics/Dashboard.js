import React, {useContext, useEffect, useRef, useState} from "react"
import {observer} from "mobx-react-lite"
import "../econom/ogm.scss"
import "./analitics.scss"

import '../editor/editor.scss'

function Dashboard(){
    return (
        <>
            <div>
                <h1>Analytics Dashboard</h1>
            </div>
        </>
    )
}
export default observer(Dashboard)