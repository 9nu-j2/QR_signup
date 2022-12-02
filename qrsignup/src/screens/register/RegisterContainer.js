import RegisterPresenter from "./RegisterPresenter";

import { handleDay } from "../../utils/Time";

import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { child, get, set, ref } from "firebase/database";
import { database } from "../../firebase";

const RegisterContainer = ({ sessionCheck }) => {
  const navigate = useNavigate();
  const isLogin = sessionCheck;

  let [result, resultC] = useState(0);
  let [버튼, 버튼변경] = useState(1); // 버튼 상태를 관리하기 위한 state
  let [아이디확인, 아이디확인변경] = useState(false); // 아이디 존재여부 검사 후 경고문구 표시를 위한 state
  let [email, setEmail] = useState("");

  let pin = 0;
  let today = 0;
  let storeName = "";

  const [inputs, setInputs] = useState({
    id: "",
    password: "",
    name: "",
  }); // 멀티 인풋 값을 관리하는 state
  const dbRef = ref(database);

  useEffect(() => {
    if (isLogin === false) {
      navigate("/waiting/admin");
    }
  });

  // const onClickLogout = () => {
  //   // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
  //   sessionStorage.removeItem("user_id");
  //   // App 으로 이동(새로고침)
  //   navigate("/waiting/admin");
  // };

  const writeUserData = (inputs, pinNumber, mail, newDate) => {
    const db = database;
    const { id, password, name } = inputs;

    set(ref(db, "shop/" + id), {
      password: password,
      name: name,
      pinNumber: pinNumber,
      expiryDate: newDate,
      admin_email: mail,
      admin_id: sessionStorage.getItem("user_id"),
    });
    set(ref(db, `${pinNumber}/`), {
      name: name,
      length: { current: 0, total: 0 },
      today: today,
      waitingTime: "10",
      isFirstLogined: true,
    });
    set(
      ref(
        db,
        "admin/" + `${sessionStorage.getItem("user_id")}/` + "shop_list/" + id
      ),
      {
        isWorking: true,
        name: name,
        product: "none",
        status: "isPermitted",
      }
    );
  }; // 데이터베이스에 기록하는 함수

  function RandomPin() {
    const getRandom = (min, max) =>
      Math.floor(Math.random() * (max - min) + min);
    let result2 = getRandom(1000, 9999);
    return result2;
  } // PIN 랜덤 생성함수

  function ReadData() {
    let result3 = RandomPin();

    get(child(dbRef, `${result3}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          ReadData();
        } else {
          resultC(result3);
          pin = result3;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } // 데이터베이스에서 PIN 번호 중복 확인

  useEffect(() => {
    ReadData();
  }, []); // 랜덤번호 생성 및 데이터베이스 PIN중복검사 실행

  useEffect(() => {
    get(child(dbRef, "admin/" + `${sessionStorage.getItem("user_id")}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setEmail(snapshot.val().email);
        } else {
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const onChangeId = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤, 하드카피
      [name]: value, // name 키를 가진 값을 value 로 설정
    });

    get(child(dbRef, "shop/" + `${value}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          버튼변경(1);
        } else {
          버튼변경(3);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }; // ID input에서 타이핑이 진행되는 걸 기록하는 함수

  const onChangePw = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤, 하드카피
      [name]: value, // name 키를 가진 값을 value 로 설정
    });

    get(child(dbRef, "shop/" + `${inputs.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          if (snapshot.val().password === value) {
            버튼변경(2);
          } else if (snapshot.val().password !== value) {
            버튼변경(1);
          }
        } else {
          버튼변경(3);
        }
      })
      .catch((error) => {
        console.error(error);
      }); // ID 중복검사
  }; // PW input에서 타이핑이 진행되는 걸 기록하는 함수

  const onChangeName = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤, 하드카피
      [name]: value, // name 키를 가진 값을 value 로 설정
    });
  }; // 가게명 input에서 타이핑이 진행되는 걸 기록하는 함수

  const onClickFalse = () => {
    아이디확인변경(true);
  }; // 유효성 검사가 통과되지 않은경우

  const onClickExist = () => {
    get(child(dbRef, "shop/" + `${inputs.id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          pin = snapshot.val().pinNumber;
          storeName = snapshot.val().name;
          navigate("/waiting/qr");
        } else {
          console.log("안됨");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }; //기존 아이디로 로그인된 경우

  const onClick = () => {
    storeName = inputs.name; // qr페이지로 데이터 전달하기 위해 저장
    writeUserData(inputs, result, email, handleDay(60)); // 데이터 쓰기 작업
    navigate("/waiting/qr");
  }; // 버튼 클릭시 실행되는 함수

  return (
    <RegisterPresenter
      {...{ 버튼 }}
      {...{ 아이디확인 }}
      {...{ onClickFalse }}
      {...{ onClickExist }}
      {...{ onClick }}
      {...{ onChangeId }}
      {...{ onChangePw }}
      {...{ onChangeName }}
      {...{ inputs }}
    />
  );
};

export default RegisterContainer;
