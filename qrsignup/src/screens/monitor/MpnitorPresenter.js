import logo from "../../img/kt.png";
import icon from "../../img/icon.ico";

const MonitorPresenter = ({
  setShopNow,
  onClickAccept,
  adminAbout,
  onClickLogout,
  sampling,
  extendModal,
  objectList,
  onClickModal2,
  sampling1,
  usingModal,
  sampling2,
  notExtendedModal,
  onClickModal3,
}) => {
  const ExtendComp = (props) => {
    return (
      <div className="ReqBottom">
        {props.objectList.map((el) => {
          const { name, status, product } = el[1];
          if (status === "onProgress") {
            setShopNow(el[1]);
            return (
              <div className="ReqList">
                <div className="RLCircle" id="circle1"></div>
                <div className="RLName">
                  <p>{name}</p>
                </div>
                <div className="RLAbout">
                  <p>{product}</p>
                </div>
                <div className="RLbutton">
                  <button onClick={() => onClickAccept(el[0])}>승인</button>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }; // 승인 요청항목 추출

  const UsingNow = (props) => {
    if (props.usingModal === true) {
      return (
        <div className="ReqBottom">
          {props.objectList.map((el) => {
            const { name, isWorking, product } = el[1];
            if (isWorking === true) {
              return (
                <div className="ReqList">
                  <div className="RLCircle" id="circle2"></div>
                  <div className="RLName">
                    <p>{name}</p>
                  </div>
                  <div className="RLAbout">
                    <p>{product}</p>
                  </div>
                  <div className="RLbutton"></div>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }; // 관리중인 가게 목록 출력

  const DontWantExtend = (props) => {
    if (props.notExtendedModal === true) {
      return (
        <div className="ReqBottom">
          {props.objectList.map((el) => {
            const { name, isWorking, product } = el[1];
            if (isWorking === false) {
              return (
                <div className="ReqList">
                  <div className="RLCircle" id="circle3"></div>
                  <div className="RLName">
                    <p>{name}</p>
                  </div>
                  <div className="RLAbout">
                    <p>{product}</p>
                  </div>
                  <div className="RLbutton"></div>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }; // 기간 만료 대상 출력

  return (
    <div className="AdminDiv">
      <div className="MonitorDiv">
        <div className="Logo">
          <img src={logo}></img>
        </div>
        <div className="AdminPart">
          <div className="IconBox">
            <img src={icon}></img>
          </div>
          <p className="AboutAdmin">{sessionStorage.getItem("user_id")}</p>
          <p className="AboutAdmin2">{adminAbout.email}</p>
          <button onClick={onClickLogout}>로그아웃</button>
        </div>
        <div className="Notification">
          <div className="NotiBox">
            <div className="ReqTitle">
              <div className="ReqPart1">사용 연장 요청</div>
              <div className="ReqPart2">
                {sampling === 0 ? (
                  <div></div>
                ) : (
                  <div className="ReqTotal">
                    <p>{sampling}</p>
                  </div>
                )}
              </div>
            </div>
            <ExtendComp
              extendModal={extendModal}
              objectList={objectList}
            ></ExtendComp>
          </div>
          <div className="NotiBox">
            <div className="ReqTitle" onClick={onClickModal2}>
              <div className="ReqPart1">사용중인 가게</div>
              <div className="ReqPart2">
                {sampling1 === 0 ? (
                  <div></div>
                ) : (
                  <div className="ReqTotal">
                    <p>{sampling1}</p>
                  </div>
                )}
              </div>
            </div>
            <UsingNow
              usingModal={usingModal}
              objectList={objectList}
            ></UsingNow>
          </div>
          <div className="NotiBox">
            <div className="ReqTitle" onClick={onClickModal3}>
              <div className="ReqPart1">연장하지 않은 가게</div>
              <div className="ReqPart2">
                {sampling2 === 0 ? (
                  <div></div>
                ) : (
                  <div className="ReqTotal">
                    <p>{sampling2}</p>
                  </div>
                )}
              </div>
            </div>
            <DontWantExtend
              notExtendedModal={notExtendedModal}
              objectList={objectList}
            ></DontWantExtend>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorPresenter;
