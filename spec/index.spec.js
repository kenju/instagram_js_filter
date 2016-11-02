const assert = require('assert');
const Filter = require('../src/index');

const failTest = () => {
    throw new Error("Expected promise to be rejected but it was fulfilled");
};

describe('Filter', () => {
    it('get supported effects', () => {
        const filter = new Filter();
        const effects = filter.getSupportedEffects();
        assert(effects.length > 0);
    });
});