import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AdminRoute } from "./services/Guard";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import AddEditSupplier from "./pages/AddEditSupplier";

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
        <Route
          path="/suppliers"
          element={
            <AdminRoute>
              <Suppliers />
            </AdminRoute>
          }
        />
        <Route
          path="/add-supplier"
          element={
            <AdminRoute>
              <AddEditSupplier />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-supplier/:supplierId"
          element={
            <AdminRoute>
              <AddEditSupplier />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
