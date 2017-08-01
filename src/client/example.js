import { REQUIRED_FIELD_CLASS } from './constants.js';
import { chat } from './chat.js';
import chatUi from './chat_ui.js';

chat();
chatUi();

export function validateTextField(field) {
  if (field.value) {
    field.removeAttribute('class');
  }
  else {
    field.setAttribute('class', REQUIRED_FIELD_CLASS);
  }
}
