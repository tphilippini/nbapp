"use strict";

import EventEmitter from "events";
import Matches from "./match.model.js";
import { isValidDate } from "../helpers/validator.js";
import response from "../helpers/response.js";

const matchController = {};

matchController.matchByDate = (req, res) => {
  console.log("Getting matches...");

  const date = req.params.startDate;

  const checkEvent = new EventEmitter();

  const checking = () => {
    const errors = [];
    if (!date) {
      errors.push("missing_params");
    } else {
      if (!isValidDate(date, "YYYYMMDD")) {
        errors.push("invalid_param_value");
      }

      if (errors.length === 0) {
        Matches.findMatchesByStartDate(date)
          .then((matches) => {
            if (matches.length > 0) {
              checkEvent.emit("success", "result_found", matches);
            } else checkEvent.emit("success", "result_empty", []);
          })
          .catch((err) => {
            console.log(err);
            errors.push("invalid_param_value");
            checkEvent.emit("error", errors);
          });
      }
    }

    if (errors.length > 0) {
      checkEvent.emit("error", errors);
    }
  };

  checkEvent.on("error", (err) => {
    response.error(res, 400, err);
  });

  checkEvent.on("success", (code, result) => {
    response.success(res, 200, code, ...result);
  });

  checking();
};

export default matchController;
