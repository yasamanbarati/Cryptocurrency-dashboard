import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "scenes/pages/dashboard/page";
import Markets from "scenes/pages/markets/page";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/markets" element={<Markets />} />
      </Routes>
    </Router>
  );
};
