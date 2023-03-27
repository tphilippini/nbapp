"use strict";

import response from "../helpers/response.js";

const userGuardMidd = (req, res, next) => {
  if (req.body) {
    if (req.body.user_type !== "user") {
      response.error(res, 403, ["insufficient_rights"]);
    } else {
      next();
    }
  }
};

export default userGuardMidd;
