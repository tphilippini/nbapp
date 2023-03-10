"use strict";

import response from "../helpers/response.js";
// import log from "../helpers/log";

const authErrorMidd = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    response.error(res, 401, ["invalid_access_token"]);
    console.error("Request invalid access token");
  } else {
    console.log("Request with access token valid");
    next();
  }
};

export default authErrorMidd;
