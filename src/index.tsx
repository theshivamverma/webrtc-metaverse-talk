import React from "react";
import ReactDOM from "react-dom/client";
import { HMSRoomProvider } from "@100mslive/react-sdk";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HMSRoomProvider>
    <App />
  </HMSRoomProvider>
);
