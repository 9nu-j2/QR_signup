import './Register.css';
import shop from '../img/shop.png'
import logo from '../img/kt.png'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import { child, get, set, ref } from "firebase/database";
import { database } from "../firebase";

let pin;
let today = 0;
let storeName= '';

function writeUserData(inputs, pinNumber) {
  const db = database;
  const {id, password, name, email} = inputs;
  const expiryDate = "20220930";
  set(ref(db, 'shop/' + id), {
    password: password,
    name : name,
    pinNumber : pinNumber,
    expiryDate : expiryDate,
    email : email
  });
  set(ref(db, `${pinNumber}/`), {
    name : name,
    length : {current: 0, total: 0},
    today : today,
    waitingTime : '10'
  });
} // 데이터베이스에 기록하는 함수

function Register(props) {
  const navigate = useNavigate();
  const isLogin = props.isLogin

  useEffect(()=>{
    if(isLogin === false) {
      navigate("/waiting/admin");
    }
  })
  
  const onClickLogout = ()=>{
    // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
    sessionStorage.removeItem('user_id')
    // App 으로 이동(새로고침)
    navigate("/waiting/admin");
  }
  
  return (
    <div className="Div">
      <div className="Logo">
        <img src={logo}></img>
      </div>
      <Left></Left>
      <Right></Right>
    </div>
  );
} // 메인으로 보여주는 함수

function Left() {
  return (
      <div className="Left">
        <div className="Box">
          <div className="LogoTitle">QR Waiting</div>
          <div className="About">
            <p className="Bigp">가게를 등록하고</p>
            <p className="Bigp">QR코드를 생성하세요</p>
            <p className="Smallp">QR웨이팅을 사용하시는 점주님들을 위해 QR포스터를 생성하고 출력하세요</p>
            <p className="Smallp">DIGICO KT</p>
          </div>
          <div className="Image"><img src={shop}/></div>
        </div>
      </div>
  );
} // 왼쪽에서 보여주는 UI

function Right() {
  let [idCheck,idCheckC] = useState(false);
  let [result,resultC] = useState(0); 
  let [버튼, 버튼변경] = useState(1); // 버튼 상태를 관리하기 위한 state
  let [아이디확인, 아이디확인변경] = useState(false); // 아이디 존재여부 검사 후 경고문구 표시를 위한 state
  
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    id: '',
    password: '',
    name: ''
  }); // 멀티 인풋 값을 관리하는 state
  const dbRef = ref(database);

  useEffect(()=>{
    function RandomPin(){
      const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
      let result2 = getRandom(1000, 9999);
      return result2;
    } // PIN 랜덤 생성함수
    
    function ReadData() {
      let result3 = RandomPin();
      
      get(child(dbRef, `${result3}`)).then((snapshot)=>{
        if (snapshot.exists()) {
          console.log(snapshot.val());
          ReadData();
        } else {
          resultC(result3);
          pin = result3;
        }
      }).catch((error) => {
        console.error(error);
      });
    } // 데이터베이스에서 PIN 번호 중복 확인

    ReadData();
  },[]); // 비동기로 처음 컴포넌트 렌더링 시에만 실행되는 hook

  const { id, password, name, email } = inputs;

  const onChangeId = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤, 하드카피
      [name]: value // name 키를 가진 값을 value 로 설정
    });
    console.log();
    get(child(dbRef, 'shop/' + `${value}`)).then((snapshot)=>{
      if (snapshot.exists()) {
        버튼변경(1);
        idCheckC(true);
      } else {
        버튼변경(3);
      }
    }).catch((error) => {
      console.error(error);
    });
    
  }; // ID input에서 타이핑이 진행되는 걸 기록하는 함수

  const onChangePw = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤, 하드카피
      [name]: value // name 키를 가진 값을 value 로 설정
    });
    
    get(child(dbRef, 'shop/'+`${inputs.id}/password`)).then((snapshot)=>{
      if ((snapshot.val() === value)&&(idCheck===true)) { 
        버튼변경(2);
      } 
      else if((snapshot.val() !== value)&&(idCheck===true)) {
        버튼변경(1);
      }
      else {
        버튼변경(3);
      }
    }).catch((error) => {
      console.error(error);
    }); // ID 중복검사

  }; // PW input에서 타이핑이 진행되는 걸 기록하는 함수

  const onChangeName = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤, 하드카피
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  }; // 가게명 input에서 타이핑이 진행되는 걸 기록하는 함수

  const onChangeEmail = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤, 하드카피
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  }; // 가게명 input에서 타이핑이 진행되는 걸 기록하는 함수


  const onClickFalse = () => {
    아이디확인변경(true);
  } // 유효성 검사가 통과되지 않은경우
  
  const onClickExist = () => {
    get(child(dbRef, 'shop/' + `${inputs.id}`)).then((snapshot)=>{
      if (snapshot.exists()) { 
        pin = snapshot.val().pinNumber;
        storeName = snapshot.val().name;
        navigate("/waiting/qr");
      } else {
        console.log("안됨");
      }
    }).catch((error) => {
      console.error(error);
    });
  } //기존 아이디로 로그인된 경우

  const onClick = () => {
    storeName = inputs.name; // qr페이지로 데이터 전달하기 위해 저장
    writeUserData(inputs ,result); // 데이터 쓰기 작업 
    navigate("/waiting/qr");
  } // 버튼 클릭시 실행되는 함수

  function Button() {
    if(버튼===1){
      return(<button onClick={onClickFalse}>QR생성하기</button>);
    }
    else if(버튼===2){
      return(<button onClick={onClickExist}>QR생성하기</button>);
    }
    else if(버튼===3){
      return(<button onClick={onClick}>QR생성하기</button>);
    }
  } // 유효성 검사 결과에 따른 버튼 기능 변경


  function CheckId() {
    const style = {
      color: "red"
    }

    if(아이디확인 === true){
      return (
        <div className="Compo">
          <p style={style}>이미 사용중인 아이디이거나 비밀번호가 다릅니다.</p>
          <Button></Button>
        </div>
      );
    }else {
      return (
        <div className="Compo">
          <p></p>
          <Button></Button>
        </div>
      );
    }
  } // 아이디 유효성 검사 결과 출력 컴포넌트

  return (
      <div className="Right">
        <div className="Card">
          <div className="Compo">
            <div className="Notice">*서비스 사용 기한은 2개월이며 기한 이후에 연장 신청이 가능합니다</div>
          </div>
          <div className="Compo">
            <p>아이디</p>
            <input type="text" name="id" onChange={onChangeId} value={id}></input>
          </div>
          <div className="Compo">
            <p>비밀번호</p>
            <input type="password" name="password" onChange={onChangePw} value={password}></input>
          </div>
          <div className="Compo">
            <p>가게명</p>
            <input type="text" name="name" onChange={onChangeName} value={name}></input>
          </div>
          <div className="Compo">
            <p>담당자 메일주소</p>
            <input type="text" name="email" onChange={onChangeEmail} value={email}></input>
          </div>
          <div className="Compo">
          </div>
          <CheckId></CheckId>
          <div className="Compo">
          </div>
        </div>
      </div>
  );
} // 오른쪽에 보여주는 UI, 실질적인 입력을 받는 부분

export default Register;
export { pin };
export { storeName };