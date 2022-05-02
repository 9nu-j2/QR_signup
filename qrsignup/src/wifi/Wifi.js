import './Wifi.css';
import qrwifi from '../img/QR_WiFI.png';
import { useState, useEffect } from 'react';

function Wifi() {
  let [모달, 모달변경] = useState(false);

  function onClick() {
    모달변경(모달 = true);
  }

  return (
    <div className="App">
      <div className="Di">
        <div className="CardComp">
          <div></div>
          <div><input></input></div>
          <div><input></input></div>
          <div className="Button"><button onClick={onClick}>QR 생성하기</button></div>
          <div></div>
        </div>
      </div>
      <Modal 모달={모달}></Modal>
    </div>
  );
}

function Modal(props) {
  if(props.모달===true){
    return (
      <div className='Di'>
        <div className="Center">
          <img src={qrwifi}></img>
        </div>
      </div>
    )
  }
}

export default Wifi;