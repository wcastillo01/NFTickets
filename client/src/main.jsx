import React from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { ThemeProvider } from "./context/ThemeContext";
import {BrowserRouter} from "react-router-dom"

import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";

ReactDOM.render(
  <BrowserRouter>
      <ThemeProvider>
        <TransactionsProvider>
          <App />
        </TransactionsProvider>
      </ThemeProvider>
    </BrowserRouter>,
  document.getElementById("root")
);
