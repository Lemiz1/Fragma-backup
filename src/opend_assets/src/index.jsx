import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Principal } from "@dfinity/principal";
import SellButton from "./components/Sell";

// const CURRENT_USER_ID = Principal.fromText("2vxsx-fae");
// export default CURRENT_USER_ID;



const init = async () => {
  ReactDOM.render(
    <div>
      <App/>
    </div>
  , document.getElementById("root"));
};

init();