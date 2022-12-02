function Main(props) {
  return (
    <div className="Master">
      <div className="Logo">
        <img src={logo}></img>
      </div>
      <div className="Brand">
        <h1>DIGICO KT</h1>
        <h2>QR Solution</h2>
      </div>
      <div className="Navigation">
        <div className="RightCard">
          <div className="ImagePart">
            <img src={lol} />
          </div>
          <div className="TitlePart">QR Waiting</div>
          <Link to="select">
            <h3>바로가기</h3>
          </Link>
        </div>
        <div className="LeftCard">
          <div className="ImagePart">
            <img src={mark} />
          </div>
          <div className="TitlePart">QR Wifi</div>
          <Link to="/wifi">
            <h3>바로가기</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Main;
