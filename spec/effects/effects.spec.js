const assert = require('assert');

const failTest = () => {
    throw new Error("Expected promise to be rejected but it was fulfilled");
};
