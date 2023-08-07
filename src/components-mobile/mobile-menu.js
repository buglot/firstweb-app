import "./mobile.css"
import Ima from "../assets/menu.png"
function MobileMenu(props) {
    return (
        <div className="inline">
            <div className="BottomMove">
                <div className="menu">
                    <a href="#">หน้าแรก</a>
                    <a href="#">เกี่ยวกับเรา</a>
                    <a href="#">สินค้า</a>
                    <a href="#">บริการ</a>
                    <a href="#">ติดต่อเรา</a>
                   
                </div>
                
                <d className="d">{props.title}</d>
            </div>
            <div className="mobileContainerBody">
                asdasd
            </div>
            
            
        </div>
    );
}

export default MobileMenu;