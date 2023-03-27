const path = require('path');

module.exports = {
  process(src, filepath) {
    return {
      code: `module.exports = "svg";`,
    };
  },
  getCacheKey() {
    return Date.now().toString();
  },
};
