// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
// import { ProtectedRoute, AdminRoute } from "./services/Guard";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
