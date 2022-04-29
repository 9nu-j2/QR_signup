import './Generate.css';
import poster from '../img/poster.png';
import QRCode from 'qrcode.react';
import { pin } from '../register/Register';
import { storeName } from '../register/Register';

function Generate() {
  console.log(storeName);
  return (
    <div className='All'>
    <div className="Div1">
      <img src={poster}></img>
        <div className='Upper'></div>
        <div className='Titlepart'><div className="Store">{storeName}</div></div>
        <div className='mountNode'><QRCode value={"https://qr-waiting-client.netlify.app/" + pin} renderAs="canvas" size={404}/></div>
        <div className='nothing'></div>
    </div>
    </div>
  );
}

export default Generate;