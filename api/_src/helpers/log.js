"use strict";

const log = {};

log.success = (value) => {
  return console.log("\x1b[32m✔ %s\x1b[0m", value);
};

log.info = (value) => {
  return console.info("\x1b[36m➡ %s\x1b[0m", value);
};

log.error = (value) => {
  return console.error("\x1b[31m✖ %s\x1b[0m", value);
};

log.warning = (value) => {
  return console.warn("\x1b[33m❗ %s\x1b[0m", value);
};

log.title = (value) => {
  return console.log("\n---\n\n\x1b[7m.: %s :.\x1b[0m\n", value.toUpperCase());
};

log.default = (value) => {
  return console.log("%s", value);
};

export default log;
