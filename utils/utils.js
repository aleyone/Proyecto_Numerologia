export function validarEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function getFecha() {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10 && day < 10) {
    date = `0${day}-0${month}-${year}`;
  } else if (day < 10) {
    date = `0${day}-${month}-${year}`;
  } else if (month < 10) {
    date = `${day}-0${month}-${year}`;
  } else {
    date = `${day}-${month}-${year}`;
  }
  return date;
}
