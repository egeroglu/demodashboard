import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import QuestAndPoap from "./Pages/questAndPoap";
import NotFound from "./Pages/NotFound";
import MarketData from "./Pages/marketData";
import SocialMedia from "./Pages/socialMedia";
import GoogleAnalitics from "./Pages/googleAnalitics";

function App() {
  return (
    <>
      <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/socialMedia" element={<SocialMedia />} />
            <Route path="/marketData" element={<MarketData />} />
            <Route path="/questAndPoap" element={<QuestAndPoap />} />
            <Route path="/googleAnalitics" element={<GoogleAnalitics />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
