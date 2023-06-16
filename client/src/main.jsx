import React from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { ThemeProvider } from "./context/ThemeContext";

import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";

ReactDOM.render(
  <ThemeProvider>
    <TransactionsProvider>
      <App />
    </TransactionsProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
