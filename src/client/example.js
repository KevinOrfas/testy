import { REQUIRED_FIELD_CLASS } from './constants.js';

export function validateTextField(field) {
  if (field.value) {
    field.removeAttribute('class');
  }
  else {
    field.setAttribute('class', REQUIRED_FIELD_CLASS);
  }
}
