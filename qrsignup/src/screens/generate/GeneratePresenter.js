import poster from "../../img/poster.png";
import QRCode from "qrcode.react";
import { pin } from "../register/RegisterContainer";
import { storeName } from "../register/RegisterContainer";

const GeneratePresenter = ({ handlePrint, onDownloadBtn, componentRef }) => {
  return (
    <div className="All">
      <div className="Buttons">
        <button className="button-16" onClick={handlePrint}>
          프린트하기
        </button>
        <button className="button-16" onClick={onDownloadBtn}>
          이미지 저장하기
        </button>
      </div>
      <div className="Div1" ref={componentRef}>
        <img src={poster}></img>
        <div className="Upper"></div>
        <div className="Titlepart">
          <div className="Store">{storeName}</div>
        </div>
        <div className="mountNode">
          <QRCode
            value={"https://qr-waiting-client.netlify.app/" + pin}
            renderAs="canvas"
            size={368}
          />
        </div>
        <div className="nothing"></div>
      </div>
    </div>
  );
};

export default GeneratePresenter;
