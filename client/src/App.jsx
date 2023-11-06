import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Publish from "./pages/Publish";
import FAQ from "./pages/FAQ";
import Support from "./pages/Support";
import Member from "./pages/Member";
import Details from "./components/details/Details";
import Services from "./components/Services";
// import Test from "./components/Test";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import Owned from "./pages/Owned";

const App = () => {
  return (
    <ThirdwebProvider
      activeChain="goerli"
      clientId="27f915a30e7b82d5797fa12e1fe148e4"
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/publish-event" element={<Publish />} />
          <Route path="/member-register" element={<Member />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/services" element={<Services />} />
          <Route path="/nft/:id" element={<Details />} />
          <Route path="/owned" element={<Owned />} />
          {/* <Route path="/test" element={<Test />} /> */}
        </Route>
      </Routes>
    </ThirdwebProvider>
  );
};

export default App;
