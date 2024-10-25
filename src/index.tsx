import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "setup/redux/store";
import { App } from "./App";
import reportWebVitals from "./setup/benchmark/reportWebVitals";
import "./index.css";
import { CryptoProvider } from "services/context/crypto-context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CryptoProvider>
        <App />
      </CryptoProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
