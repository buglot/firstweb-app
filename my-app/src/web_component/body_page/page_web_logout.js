import "./page_logout.css";
// import "./main_home.css";
import Cookies from "js-cookie";
function Page_Web_logout(props) {
    let name = props.name;
    const logout =()=>{
        Cookies.remove("linkprofile");
        Cookies.set("isLogin",false)
    }
    return (
        <div className="page-logout-contrainer">
            <div className="title">
                <div className="group">
                    ต้องการออกจากระบบ
                    <div className="hlight">
                        {name}
                    </div>
                </div>
                <button className="outbutton" onClick={()=>{logout();window.location.pathname="/";alert("logout!")}}>ออกจากระบบ</button>

            </div>
        </div>
    );
}
export default Page_Web_logout;
