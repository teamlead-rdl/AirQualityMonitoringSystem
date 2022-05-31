export function getFullDate(date) {
  const userDateObject = new Date(date);
  const userMonth = `0${userDateObject.getMonth() + 1}`;
  const userDate = `${userDateObject.getDate()}:${userMonth.slice(-2)}:${userDateObject.getFullYear()}`;
  return userDate;
}

export function getFullTime(date) {
  const userDateObject = new Date(date);
  const userHours = `0${userDateObject.getHours()}`;
  const userMinutes = `0${userDateObject.getMinutes()}`;
  const userTime = `${userHours.slice(-2)}:${userMinutes.slice(-2)}`;
  return userTime;
}
