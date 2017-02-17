const assert = require('assert');
const Filter = require('../src/index');

describe('Filter', () => {
  it('get supported effects', () => {
    const filter = new Filter();
    const effects = filter.getSupportedEffects();
    assert(effects.length > 0);
  });
});
