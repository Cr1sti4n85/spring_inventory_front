import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AdminRoute, ProtectedRoute } from "./services/Guard";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import AddEditSupplier from "./pages/AddEditSupplier";
import Product from "./pages/Product";
import AddEditProduct from "./pages/AddEditProduct";
import Purchase from "./pages/Purchase";
import Sales from "./pages/Sales";

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
        <Route
          path="/products"
          element={
            <AdminRoute>
              <Product />
            </AdminRoute>
          }
        />

        <Route
          path="/add-product"
          element={
            <AdminRoute>
              <AddEditProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/edit-product/:productId"
          element={
            <AdminRoute>
              <AddEditProduct />
            </AdminRoute>
          }
        />
        <Route
          path="/purchases"
          element={
            <ProtectedRoute>
              <Purchase />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <ProtectedRoute>
              <Sales />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
