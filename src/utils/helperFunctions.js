export function getFullDate(date) {
    const userDateObject = new Date(date);
    const userMonth = userDateObject.getMonth() + 1;
    const userDate = userDateObject.getDate() + ':' + userMonth + ':' + userDateObject.getFullYear();
    return userDate;
}

export function getFullTime(date) {
    const userDateObject = new Date(date);
    const userTime = userDateObject.getHours() + ':' + userDateObject.getMinutes();
    return userTime;
}