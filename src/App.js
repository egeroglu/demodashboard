import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import QuestAndPoap from "./Pages/questAndPoap";
import NotFound from "./Pages/NotFound";
import MarketData from "./Pages/marketData";
import SocialMedia from "./Pages/socialMedia";
import GoogleAnalytics from "./Pages/googleAnalytics";
import Discourse from "./Pages/discourse";
import Summary from "./Pages/summary";

function App() {
  return (
    <>
      <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/socialMedia" element={<SocialMedia />} />
            <Route path="/marketData" element={<MarketData />} />
            <Route path="/discourse" element={<Discourse />} />
            <Route path="/questAndPoap" element={<QuestAndPoap />} />
            <Route path="/googleAnalytics" element={<GoogleAnalytics />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
