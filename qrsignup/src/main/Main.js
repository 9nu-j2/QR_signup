import './Main.css';
import mark from '../img/wifi.svg'
import lol from '../img/wq.svg'
import { Link } from 'react-router-dom';

function Main() {
  return (
    <div className="Master">
      <div className="Brand"> 
        <h1>QR Solution</h1>
        <h4>DIGICO KT</h4>
      </div>
      <div className="Navigation">
        <div className="LeftCard">
          <div className="ImagePart"><img src={mark}/></div>
          <div className="TitlePart">QR Wifi</div>
          <Link to="wifi">바로가기</Link>
        </div>
        <div className="RightCard">
          <div className="ImagePart"><img src={lol}/></div>
          <div className="TitlePart">QR Waiting</div>
          <Link to="waiting">바로가기</Link>
        </div>
      </div>
    </div>
  );
}

export default Main;