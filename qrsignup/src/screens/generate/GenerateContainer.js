import GeneratePresenter from "./GeneratePresenter";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import domtoimage from "dom-to-image";
import { saveAs } from "file-saver";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { storeName } from "../register/RegisterContainer";

const GenerateContainer = ({ sessionCheck }) => {
  const componentRef = useRef();
  const navigate = useNavigate();
  const isLogin = sessionCheck;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onDownloadBtn = () => {
    const card = componentRef.current;
    domtoimage.toBlob(card).then((blob) => {
      saveAs(blob, `${storeName}.png`);
    });
  };

  useEffect(() => {
    if (isLogin === false) {
      navigate("/");
    }
  }); // 세션 유지 여부 확인, 접근 제한
  return (
    <GeneratePresenter
      {...{ handlePrint }}
      {...{ onDownloadBtn }}
      {...{ componentRef }}
    />
  );
};

export default GenerateContainer;
