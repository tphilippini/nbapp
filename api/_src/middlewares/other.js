"use strict";

/**
 * Just a middleware
 */
const otherMidd = (req, res, next) => {
  // Disable from the header, else it makes hacker's life easier to know more about our system
  res.removeHeader("X-Powered-By");

  console.log("Requesting");
  console.log(`Request ${req.method} ${req.url}`);

  // Add next() to continue
  next();
};

export default otherMidd;
