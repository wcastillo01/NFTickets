import { Navbar, Welcome, Footer, Services, Transactions } from "./components";
import { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="min-h-screen">
      <div className={`gradient-bg-welcome-${theme}`}>
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transactions />
      <Footer />
    </div>
  );
};

export default App;
