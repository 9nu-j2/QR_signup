import './Register.css';
import shop from '../img/shop.png'

import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

import { child, get, set, ref } from "firebase/database";
import { database } from "../firebase";

var id = 0;
let pin;

function writeUserData(id, inputs, pinNumber) {
  const db = database;
  const {email, password, name} = inputs
  console.log()
  set(ref(db, 'shop/' + id), {
    email: email,
    password: password,
    name : name,
    pinNumber : pinNumber
  });
  set(ref(db, `${pinNumber}/`), {
    email: email,
    name : name
  });
  id++;
}

function Register() {
  return (
    <div className="Div">
      <Left></Left>
      <Right></Right>
    </div>
  );
}

function Left() {
  return (
      <div className="Left">
        <div className="Box">
          <div className="Logo">QR Waiting</div>
          <div className="About">
            <p className="Bigp">가게를 등록하고</p>
            <p className="Bigp">QR코드를 생성하세요</p>
            <p className="Smallp">이 서비스는 QR웨이팅을 사용하시는 점주님들께 제공하는 서비스입니다</p>
            <p className="Smallp">DIGICO KT</p>
          </div>
          <div className="Image"><img src={shop}/></div>
        </div>
      </div>
  );
}

function Right() {

  let [result,resultC] = useState(0);

  useEffect(()=>{

    function RandomPin(){
      const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
      let result2 = getRandom(1000, 9999);
      return result2;
    } // PIN 생성함수
    
    function ReadData() {
      let result3 = RandomPin();
      const dbRef = ref(database);
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
    }

    ReadData();
  },[]);

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

  const onClick = () => {
    writeUserData(id, inputs ,result);
  }

  return (
      <div className="Right">
        <div className="Card">
          <div></div>
          <div>
            <p>EMAIL</p>
            <input type="text" name="email" onChange={onChange} value={email}></input>
          </div>
          <div>
            <p>PASSWORRD</p>
            <input type="password" name="password" onChange={onChange} value={password}></input>
          </div>
          <div>
            <p>가게명</p>
            <input type="text" name="name" onChange={onChange} value={name}></input>
          </div>
          <div></div>
          <div>
            <Link to="/qr"><button onClick={onClick}>QR코드 생성하기</button></Link>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
  );
}

export default Register;
export { pin };