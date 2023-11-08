function getFormatedDate(dateInput) {
  const newDate = new Date(dateInput);
  console.log("newDate", newDate);
  const year = newDate.getFullYear();
  const month =
    newDate.getMonth() + 1 < 10
      ? `0${newDate.getMonth() + 1}`
      : newDate.getMonth() + 1;

  const day =
    newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();

  return `${year}-${month}-${day}`;
}

function getFormatedTime(timeInput) {
  const newDate = new Date(timeInput);

  const hours =
    newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();

  const minutes =
    newDate.getMinutes() < 10
      ? `0${newDate.getMinutes()}`
      : newDate.getMinutes();

  return `${hours}:${minutes}`;
}

const convertDateToString = (dateInput, timeInput = null) => {
  if (timeInput === null) {
    return `${getFormatedDate(dateInput)}T${getFormatedTime(dateInput)}`;
  }
  return `${getFormatedDate(dateInput)}T${getFormatedTime(timeInput)}`;
};

export default convertDateToString;
