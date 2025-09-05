// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
// import { ProtectedRoute, AdminRoute } from "./services/Guard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AdminRoute } from "./services/Guard";
import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/categories"
          element={
            <AdminRoute>
              <Categories />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
