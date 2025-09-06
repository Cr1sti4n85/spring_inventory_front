import { useEffect, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router";
import ApiService from "../services/ApiService";
import axios from "axios";
import Layout from "../components/Layout";

const AddEditSupplier: FC = () => {
  const { supplierId } = useParams();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (supplierId) {
      setIsEditing(true);

      const fetchSupplier = async () => {
        try {
          const supplierData = await ApiService.getSupplierById(+supplierId);
          if (supplierData.status === 200) {
            setName(supplierData.supplier.name);
            setEmail(supplierData.supplier.email);
            setAddress(supplierData.supplier.address);
          }
        } catch (error: unknown) {
          if (axios.isAxiosError(error)) {
            showMessage(error.response?.data?.message);
          } else {
            showMessage("Error al obtener proveedor: " + error);
          }
        }
      };
      fetchSupplier();
    }
  }, [supplierId]);

  //handle form submission for both add and edit supplier
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supplierData = { name, email, address };

    try {
      if (isEditing) {
        if (!supplierId) {
          showMessage("ID de proveedor no válido");
          return;
        }
        await ApiService.updateSupplier(+supplierId, supplierData);
        showMessage("Proveedor actualizado con éxito");
        navigate("/supplier");
      } else {
        await ApiService.addSupplier(supplierData);
        showMessage("Proveedor agregado con éxito");
        navigate("/supplier");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message);
      } else {
        showMessage("Error al iniciar sesión: " + error);
      }
    }
  };

  //metjhod to show message or errors
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="supplier-form-page">
        <h1>{isEditing ? "Editar Proveedor" : "Añadir Proveedor"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del proveedor</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              type="text"
            />
          </div>

          <div className="form-group">
            <label>Email de contacto</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="text"
            />
          </div>

          <div className="form-group">
            <label>Dirección</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              type="text"
            />
          </div>
          <button type="submit">
            {isEditing ? "Editar proveedor" : "Añadir proveedor"}
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default AddEditSupplier;
