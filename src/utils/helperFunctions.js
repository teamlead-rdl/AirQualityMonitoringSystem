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

export function alertSeverityCode(alertType){
  return alertType === 'Critical'? 1 : alertType === 'outOfRange'? 2 : 3;
}

export function setAlertColor(newNotificationStack){
  let colorCode = {
    priority: 3,
    color: '#4CAF50'
  };
  if (newNotificationStack.length !== 0) {
    for(let i = 0; i <= newNotificationStack.length; i++) {
      if (newNotificationStack[i].alertType === 'Critical') {
        colorCode = {
          priority: 1,
          color: '#E53935'
        };
        break;
      } else if(newNotificationStack[i].alertType === 'outOfRange') {
        colorCode = {
          priority: 2,
          color: '#FFC107'
        }
      }
    }
  }
  return colorCode;
}