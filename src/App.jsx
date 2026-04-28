import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import CampaignDetails from "./pages/CampaignDetails";
import CreateCampaign from "./pages/CreateCampaign";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/campaign/:id" element={<CampaignDetails />} />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}