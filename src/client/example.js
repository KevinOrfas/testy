import { REQUIRED_FIELD_CLASS } from './constants.js';

export function validateTextField(field) {
  if (field.value) {
    field.removeAttribute('class');
  }
  else {
    field.setAttribute('class', REQUIRED_FIELD_CLASS);
  }
}

export function extractMe(string, initPoint, endPoint) {
  const start = string.indexOf(initPoint);
  const end = string.indexOf(endPoint, start + 1);

  const result = string.substring(start + 1, end).split(',');
  result.forEach((element, index, array) => {
    array[index] = element.trim();
  });
  return result;



}
