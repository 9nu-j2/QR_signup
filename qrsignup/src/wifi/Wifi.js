import './Wifi.scss';
import logo1 from '../img/kt_1.png';
import qrwifi from '../img/QR_WiFI.png';
import { useState, useRef } from 'react';
import { Link } from "react-scroll";
import QRCode from 'qrcode.react';
import { ReactToPrint, useReactToPrint } from 'react-to-print';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';


function Wifi() {
  let [모달, 모달변경] = useState(false);

  const [inputs, setInputs] = useState({
    storename: '',
    ssid: '',
    pw: '',
  });

  const { storename, ssid, pw } = inputs;


  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  }; // 각 input에서 타이핑이 진행되는 걸 기록하는 함수

  const onClick = (e) => {
    모달변경(모달 = true);
  }

  return (
    <div className="App">
      <div className="Logo1">
        <img src={logo1}></img>
      </div>
      <div className="Di">
        <div className="CardComp">
          <div className="Pp1">
            <h2>WIFI 자동접속 QR</h2>
          </div>
          <div className="Pp2">
            <div className="form-group">
              <span>가게명</span>
              <input className="form-field" onChange={onChange} type="text" placeholder="가게이름을 입력해주세요" name="storename" value={storename}/>
            </div>
          </div>
          <div className="Pp2">
            <div className="form-group">
              <span>SSID</span>
              <input className="form-field" onChange={onChange} type="text" placeholder="SSID를 입력해주세요" name="ssid" value={ssid}/>
            </div>
          </div>
          <div className="Pp2">
            <div className="form-group">
              <span>비밀번호</span>
              <input className="form-field" onChange={onChange} type="text" placeholder="비밀번호를 입력해주세요" name="pw" value={pw}/>
            </div>
          </div>
          <div className="Pp4"><Link to="go" smooth={true}><button className="button-74" role="button" onClick={onClick}>QR생성하기</button></Link></div>
          <div className="Pp5"></div>
        </div>
      </div>
      <Modal 모달={모달} inputs={inputs}></Modal>
    </div>
  );
}

function Modal(props) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: ()=>componentRef.current,
  });

  const onDownloadBtn = () => {
    const card = componentRef.current;
    domtoimage
      .toBlob(card)
      .then((blob) => {
        saveAs(blob, 'card.png');
      });
  };

  if(props.모달===true){
    return (
      <div className="Back">
        <div className="Buttons">
          <button className="button-16" onClick={handlePrint}>프린트하기</button>
          <button className="button-16" onClick={onDownloadBtn}>이미지 저장하기</button>
        </div>
        <div className='Di2'>
          <div className="Center" ref={componentRef} id="go">
            <img src={qrwifi}></img>
            <div className="P1"></div>
            <div className="P2">
              <h1>{props.inputs.storename}</h1>
            </div>
            <div className="P3"></div>
            <div className="P4">
            <QRCode value={"WIFI:S:" + props.inputs.ssid + ";T:WPA;P:" + props.inputs.pw + ";"} renderAs="canvas" size={325}/>
            </div>
            <div className="P5">
              <p>SSID : {props.inputs.ssid}</p>
              <p>비밀번호 : {props.inputs.pw}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Wifi;