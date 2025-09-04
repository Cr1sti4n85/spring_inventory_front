// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
// import { ProtectedRoute, AdminRoute } from "./services/Guard";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
