import React from "react";
import { Welcome, Footer, Services, Transactions } from "../components";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <div className={`gradient-bg-welcome-${theme}`}>
        <Welcome />
      </div>
      <Transactions />
      <Footer />
    </div>
  );
}
