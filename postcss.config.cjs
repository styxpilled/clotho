// Required for VSC to not throw errors
const variables = require('postcss-simple-vars');
const atimport = require("postcss-import");
const nested = require('postcss-nested');

const config = {
  extract: true,
	plugins: [
    atimport({
      path: ["src/styles"],
    }),
    variables,
    nested,
]};

module.exports = config;
