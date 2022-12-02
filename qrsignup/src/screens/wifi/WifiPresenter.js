import logo1 from "../../img/kt_1.png";
import qrwifi from "../../img/QR_WiFI.png";

import { Link } from "react-scroll";
import QRCode from "qrcode.react";

const Modal = (props) => {
  if (props.모달 === true) {
    return (
      <div className="Back">
        <div className="Buttons">
          <button className="button-16" onClick={props.handlePrint}>
            프린트하기
          </button>
          <button className="button-16" onClick={props.onDownloadBtn}>
            이미지 저장하기
          </button>
        </div>
        <div className="Di2">
          <div className="Center" ref={props.componentRef} id="go">
            <img src={qrwifi}></img>
            <div className="P1"></div>
            <div className="P2">
              <h1>{props.inputs.storename}</h1>
            </div>
            <div className="P3"></div>
            <div className="P4">
              <QRCode
                value={
                  "WIFI:S:" +
                  props.inputs.ssid +
                  ";T:WPA;P:" +
                  props.inputs.pw +
                  ";"
                }
                renderAs="canvas"
                size={325}
              />
            </div>
            <div className="P5">
              <p>SSID : {props.inputs.ssid}</p>
              <p>비밀번호 : {props.inputs.pw}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

const WifiPresenter = ({
  handlePrint,
  onDownloadBtn,
  componentRef,
  onChange,
  onClick,
  inputs,
  storename,
  ssid,
  pw,
  모달,
}) => {
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
              <input
                className="form-field"
                onChange={onChange}
                type="text"
                placeholder="가게이름을 입력해주세요"
                name="storename"
                value={storename}
              />
            </div>
          </div>
          <div className="Pp2">
            <div className="form-group">
              <span>SSID</span>
              <input
                className="form-field"
                onChange={onChange}
                type="text"
                placeholder="SSID를 입력해주세요"
                name="ssid"
                value={ssid}
              />
            </div>
          </div>
          <div className="Pp2">
            <div className="form-group">
              <span>비밀번호</span>
              <input
                className="form-field"
                onChange={onChange}
                type="text"
                placeholder="비밀번호를 입력해주세요"
                name="pw"
                value={pw}
              />
            </div>
          </div>
          <div className="Pp4">
            <Link to="go" smooth={true}>
              <button className="button-74" role="button" onClick={onClick}>
                QR생성하기
              </button>
            </Link>
          </div>
          <div className="Pp5"></div>
        </div>
      </div>
      <Modal
        모달={모달}
        inputs={inputs}
        handlePrint={handlePrint}
        onDownloadBtn={onDownloadBtn}
        componentRef={componentRef}
      ></Modal>
    </div>
  );
};

export default WifiPresenter;
