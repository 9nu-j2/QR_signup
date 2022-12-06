const onClickLogout = (location) => {
  // sessionStorage 에 user_id 로 저장되어있는 아이템을 삭제한다.
  sessionStorage.removeItem("user_id");
  // App 으로 이동(새로고침)
  document.location.href = location;
}; // 로그아웃 기능

export default onClickLogout;
