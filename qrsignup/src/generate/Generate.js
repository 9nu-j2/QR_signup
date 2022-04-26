import './Generate.css';
import QRCode from 'qrcode.react'
import { pin } from '../register/Register'

function Generate() {

  return (
    <div className="Div1">
      <div className="BigSide">
        <div className="Kt"><p>KT와 함께하는</p></div>
        <div className="Thisis">QR 웨이팅</div>
        <div className="Wtf"><p>가게이름</p></div>
        <div id="mountNode"><QRCode value={"https://qr-waiting-client.netlify.app/" + pin} renderAs="canvas" size={280}/></div>
        <p className="Howto">QR코드를 스캔하여<br/>대기등록 해주세요</p>
      </div>
      <div className="SmallSide">
        <p>입장 차례가 되면 안내문자를 발송해드립니다</p>
      </div>
    </div>
  );
}

export default Generate;