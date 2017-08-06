mocha.setup({ ignoreLeaks: true });

import { extractMe } from './example';

describe('Strings recipes', () => {


  it('should extract list of a string', () => {
    const result = extractMe('yo: dude, mate, lad.', ':', '.');
    expect(result).to.be.instanceof(Array);
    expect(['dude', 'mate', 'lad']).to.eql(result);
  });

});

