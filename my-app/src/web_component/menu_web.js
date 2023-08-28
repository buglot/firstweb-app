import { useState } from "react";
import "./menu_web.css"
import ICONmenu from "./menu_component/ICONmunu";
import Button_web_menu from "./menu_component/button_menu_web";
function Menu_web(props) {
    let page = props.selectpage;
    let setpage = props.setPage;
    let setClick = props.setClick;
    let menuClick = props.menuClick;

    return (
        <div>
            <ICONmenu setClick={setClick} value={menuClick} />
            <div className={`Menu_web ${menuClick ? "close" : "open"}`}>
                <Button_web_menu name="หน้าแรก" setmyID={0} select={page} setSeclect={setpage} />
                <Button_web_menu name="การจัดการกุญเจ" setmyID={1} select={page} setSeclect={setpage} />
                <Button_web_menu name="การจัดการแชร์" setmyID={2} select={page} setSeclect={setpage} />
                <Button_web_menu name="ประวัติการใช้งาน" setmyID={3} select={page} setSeclect={setpage} />
                <div className="d">
                    <Button_web_menu name={"name"} setmyID={4} select={page} setSeclect={setpage} />
                    
                </div>
            </div>

        </div>

    );
}
export default Menu_web;