import {Link} from "react-router-dom";
import "./leftmenuobj.scss";
import CreateObj from "./CreateObj";
import LeftIconsObj from "./LeftIconsObj";
import LeftMenuObj from "./LeftMenuObj";

export default function BridgeLeftBar ({arrcreate, arrmenu}) {
    return (
        <div className='left_block'>
            {/*<LeftIconsObj mass_create={arrcreate} mass_menu={arrmenu}/>*/}
            {/*<CreateObj mass={arrcreate} />*/}
            <LeftMenuObj mass_create={arrcreate} mass_menu={arrmenu} />
        </div>
    )
}