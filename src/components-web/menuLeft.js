import "./menuLeft.css";
import img0 from '../asserts/menu3.png';
import img1 from '../asserts/menu.png';

function MenuLeft(props) {
  
  let smenuClick = props.Click;
  let setMenuClick = props.setMenuClick;
  return (
    
    <div>
      <div className={smenuClick ? "menutop": "menutop"}>
        
        <img className="img" src={smenuClick ? img0:img1} alt="Menu"
          onClick={
            () => {
              setMenuClick(!smenuClick);
            }
          } />
        
        <f className={`d black ${smenuClick ? "":"open"}`}><b>{props.title}</b></f>
      </div>
      <div className={`left ${smenuClick ? '' : 'open'}`}>
          <div className="menu borderBu">
            asdasd
          </div>
      </div>
    </div>
  );
}

export default MenuLeft;