function etc() {

  const OPTIONS = [
    { value: "서울", name: "서울"},
    { value: "경기", name: "경기"},
    { value: "인천", name: "인천"},
    { value: "강원", name: "강원"},
    { value: "충남", name: "충남"},
    { value: "충북", name: "충북"},
    { value: "대구", name: "대구"},
    { value: "경남", name: "경남"},
    { value: "경북", name: "경북"},
    { value: "울산", name: "울산"},
    { value: "부산", name: "부산"},
    { value: "광주", name: "광주"},
    { value: "전남", name: "전남"},
    { value: "전북", name: "전북"},
    { value: "제주", name: "제주"},
  ]; // 셀렉트 박스 표시 데이터
  
  const CATEGORY_LIST = [
    { value: "서빙로봇", name: "서빙로봇" },
    { value: "스마트로", name:"스마트로" }
  ];

  const handleChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤, 하드카피
      [name]: value // name 키를 가진 값을 value 로 설정
    });
	};

  return (
    <div>
      <SelectBox options={OPTIONS} handleChange={handleChange} label="area"></SelectBox>
      <SelectBox options={CATEGORY_LIST} handleChange={handleChange} label="service"></SelectBox>
    </div>
  );
}

const SelectBox = (props) => {

  return (
    <select onChange={props.handleChange} name={props.label} className="SelectBox">
      {props.options.map((option) => (
        <option
          value={option.value}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};