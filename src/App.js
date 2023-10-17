import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login";
import TopFunnel from "./Pages/topFunnel";
import TopTable from "./Pages/topTable";
import BottomFunnel from "./Pages/bottomFunnel";
import BottomTable from "./Pages/bottomTable";

function App() {
  return (
    <>
      <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/topFunnel" element={<TopFunnel />} />
            <Route path="/topTable" element={<TopTable />} />
            <Route path="/bottomFunnel" element={<BottomFunnel />} />
            <Route path="/bottomTable" element={<BottomTable />} />
          </Routes>
      </div>
    </>
  );
}

export default App;
