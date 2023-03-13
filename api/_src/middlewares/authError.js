"use strict";

import log from "../helpers/log.js";
import response from "../helpers/response.js";

const authErrorMidd = (err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    response.error(res, 401, ["invalid_access_token"]);
    log.error("Request invalid access token");
  } else {
    next();
  }
};

export default authErrorMidd;
