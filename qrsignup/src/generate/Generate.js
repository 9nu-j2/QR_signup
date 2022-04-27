import './Generate.css';
import poster from '../img/poster.png';
import QRCode from 'qrcode.react';
import { pin } from '../register/Register';
import { storeName } from '../register/Register';

function Generate() {
  console.log(storeName);
  return (
    <div className="Div1">
      <img src={poster}></img>
      <div id="mountNode"><QRCode value={"https://qr-waiting-client.netlify.app/" + pin} renderAs="canvas" size={370}/></div>
      <h1 className="Store">{storeName}</h1>
    </div>
  );
}

export default Generate;