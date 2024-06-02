import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <BrowserRouter basename={"/"}>
          <App />
          <ToastContainer closeButton={false} limit={1} />
        </BrowserRouter>
      </>
    </Provider>
  </React.StrictMode>
);
