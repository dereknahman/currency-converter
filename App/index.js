import React from "react";
import Navigation from "./config/Navigation";
import { api } from "./util/api";

api("/latest?base=USD")
  .then((response) => {
    console.log("response", response);
  })
  .catch((err) => {
    console.log("err", err);
  });

export default () => <Navigation />;
