export function validateEmail(value) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

export function validatePhone(value) {
  const re = /^[-0-9+()\s]*$/;
  return re.test(String(value)) && validateLength(value, 25, 5);
}

export function validateLength(value, maxLength, minLength = 0) {
  if (minLength === 0 && !value) return true;
  return (
    Boolean(value) && value.length <= maxLength && value.length >= minLength
  );
}
