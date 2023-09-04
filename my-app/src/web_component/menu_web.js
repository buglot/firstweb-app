import "./menu_web.css"
import ICONmenu from "./menu_component/ICONmunu";
import Button_web_menu from "./menu_component/button_menu_web";
function Menu_web(props) {
    let page = props.selectpage;
    let setClick = props.setClick;
    let menuClick = props.menuClick;
    let NameProfile = props.name;
    return (
        <div>
            <ICONmenu setClick={setClick} value={menuClick} />
            <div className={`Menu_web ${menuClick ? "close" : "open"}`}>
                <Button_web_menu name="หน้าแรก" setmyID={0} select={page}/>
                <Button_web_menu name="การจัดการกุญเจ" setmyID={1} select={page}/>
                <Button_web_menu name="การจัดการแชร์" setmyID={2} select={page}/>
                <Button_web_menu name="ประวัติการใช้งาน" setmyID={3} select={page}/>
                <div className="d">
                    <Button_web_menu name={NameProfile} setmyID={4} select={page}/>
                    
                </div>
            </div>

        </div>

    );
}
export default Menu_web;