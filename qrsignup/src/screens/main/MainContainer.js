import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MainPresenter from "./MainPresenter";

const MainContainer = ({ sessionCheck }) => {
  const navigate = useNavigate();

  useEffect((sessionCheck) => {
    if (sessionCheck === false) {
      navigate("/");
    }
  });

  return <MainPresenter />;
};

export default MainContainer;
