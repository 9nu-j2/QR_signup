import WifiPresenter from "./WifiPresenter";

import { useState, useRef } from "react";

import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";
import { useReactToPrint } from "react-to-print";

import { set, ref } from "firebase/database";
import { database } from "../../firebase";

const WifiContainer = () => {
  let [모달, 모달변경] = useState(false);
  const [inputs, setInputs] = useState({
    storename: "",
    ssid: "",
    pw: "",
  });
  const { storename, ssid, pw } = inputs;

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onDownloadBtn = () => {
    const card = componentRef.current;
    domtoimage.toBlob(card).then((blob) => {
      saveAs(blob, "qr_wifi.png");
    });
  };

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
    console.log(value);
  }; // 각 input에서 타이핑이 진행되는 걸 기록하는 함수

  const onClick = () => {
    const db = database;
    모달변경((모달 = true));

    set(ref(db, "wifilog/" + storename), {
      storeName: storename,
      manager: sessionStorage.getItem("user_id"),
    });
  };

  return (
    <WifiPresenter
      {...{ handlePrint }}
      {...{ onDownloadBtn }}
      {...{ componentRef }}
      {...{ onChange }}
      {...{ onClick }}
      {...{ inputs }}
      {...{ 모달 }}
    />
  );
};

export default WifiContainer;
