import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./pages/Layout";
import Publish from "./pages/Publish";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/publish-event" element={<Publish/>}/>
      </Route>
    </Routes>
  )
};

export default App;
