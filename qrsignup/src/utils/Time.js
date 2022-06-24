export const getNowYear = () => {
  return String(new Date().getFullYear());
};

export const getNowMonth = () => {
  let month = String(new Date().getMonth() + 1);
  return month.length === 1 ? "0" + month : month;
};

export const getNowDate = () => {
  let date = String(new Date().getDate());
  return date.length === 1 ? "0" + date : date;
};

export const getNowSecond = () => {
  let second = String(new Date().getSeconds());
  return second.length === 1 ? "0" + second : second;
};

const getNowHours = () => {
  let hour = String(new Date().getHours());
  return hour.length === 1 ? "0" + hour : hour;
};

const getNowMinutes = () => {
  let minute = String(new Date().getMinutes());
  return minute.length === 1 ? "0" + minute : minute;
};

export const getNowTime = () => {
  let hour = getNowHours();
  let minute = getNowMinutes();

  const time = hour + minute;
  return time;
};

export const getWaitingTime = (clientTimestamp) => {
  let nowHour = parseInt(getNowHours()) * 60;
  let nowMinutes = parseInt(getNowMinutes());

  let clientHour = parseInt(String(clientTimestamp).slice(0, 2)) * 60;
  let clientMinutes = parseInt(String(clientTimestamp).slice(2));

  let waitingTime = nowHour - clientHour + (nowMinutes - clientMinutes);

  // console.log(waitingTime);
  return String(waitingTime);
};

export const getExpriyDate = () => {
  return getNowYear() + getNowMonth() + getNowDate();
};
