import "./menuLeft.css";
import img0 from '../assets/menu3.png';
import img1 from '../assets/menu.png';

function MenuLeft(props) {
  
  let smenuClick = props.Click;
  let setMenuClick = props.setMenuClick;
  return (
    
    <div>
      <div className={"menutop"}>
        
        <img className="img" src={smenuClick ? img0:img1} alt="Menu"
          onClick={
            () => {
              setMenuClick(!smenuClick);
            }
          } />
        
        <a className={`d black ${smenuClick ? "":"open"}`}><b>{props.title}</b></a>
      </div>
      <div className={`left ${smenuClick ? '' : 'open'}`}>
          <div className="menu-web borderBu">
            asdasd
          </div>
      </div>
    </div>
  );
}

export default MenuLeft;