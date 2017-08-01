
import { validateTextField } from './example.js';
import { REQUIRED_FIELD_CLASS } from './constants.js';

mocha.setup({ ignoreLeaks: true });

describe('Text field validator', function () {

  let field;

  beforeEach(function () {
    field = document.createElement('input');
    field.setAttribute('type', 'text');
  });

  it('applies \'required\' CSS class when field is empty', function () {
    validateTextField(field);

    expect(cssClass()).to.equal(REQUIRED_FIELD_CLASS);
    expect(1).to.equal(1);
  });

  it('removes \'required\' CSS class when field is not empty', function () {
    field.setAttribute('class', REQUIRED_FIELD_CLASS);
    field.value = 'not empty';

    validateTextField(field);

    expect(cssClass()).to.equal(null);
  });

  // TODO: should preserve existing CSS classes

  function cssClass() {
    return field.getAttribute('class');
  }

});

