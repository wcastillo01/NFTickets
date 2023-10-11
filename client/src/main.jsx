import React from "react";
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from "./context/ThemeContext";
import {BrowserRouter} from "react-router-dom"

import App from "./App";
import { TransactionsProvider } from "./context/TransactionContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <TransactionsProvider>
        <App />
      </TransactionsProvider>
    </ThemeProvider>
  </BrowserRouter>
);
