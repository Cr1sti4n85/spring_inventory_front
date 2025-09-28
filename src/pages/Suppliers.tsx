import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ApiService from "../services/ApiService";
import axios from "axios";
import Layout from "../components/Layout";
import type { Supplier } from "../types";
import Loader from "../components/Loader";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    //fetch all suppliers
    const getSuppliers = async () => {
      try {
        const responseData = await ApiService.getAllSuppliers();
        if (responseData.status === 200) {
          setSuppliers(responseData.suppliers);
        } else {
          showMessage(responseData.message);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al obtener proveedores: " + error);
        }
      } finally {
        setLoading(false);
      }
    };
    getSuppliers();
  }, []);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  //Delete Supplier
  const handleDeleteSupplier = async (supplierId: number) => {
    try {
      if (window.confirm("¿Estás seguro de eliminar este proveedor?")) {
        await ApiService.deleteSupplier(supplierId);
        window.location.reload();
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message);
      } else {
        showMessage("Error al eliminar proveedor: " + error);
      }
    }
  };
  return loading ? (
    <Loader size={60} cssClass="loader-container" />
  ) : (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="supplier-page">
        <div className="supplier-header">
          <h1>Proveedores</h1>
          <div className="add-sup">
            <button onClick={() => navigate("/add-supplier")}>
              Agregar Proveedor
            </button>
          </div>
        </div>
      </div>

      {suppliers && (
        <ul className="supplier-list">
          {suppliers.map((supplier) => (
            <li className="supplier-item" key={supplier.id}>
              <span>{supplier.name}</span>

              <div className="supplier-actions">
                <button
                  onClick={() => navigate(`/edit-supplier/${supplier.id}`)}
                >
                  Edit
                </button>
                <button onClick={() => handleDeleteSupplier(supplier.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};
export default Suppliers;
