import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Publish from "./pages/Publish";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Member from "./pages/Member";
import Details from "./components/details/Details";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/publish-event" element={<Publish />} />
        <Route path="/member-register" element={<Member />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/support" element={<Support />} />
        <Route path="/nft/:id" element={<Details/>} />
      </Route>
    </Routes>
  );
};

export default App;
