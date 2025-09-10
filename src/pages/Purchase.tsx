import { useEffect, useState } from "react";
import type { ProductData, Supplier, TransactionData } from "../types";
import ApiService from "../services/ApiService";
import axios from "axios";
import Layout from "../components/Layout";

const Purchase = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [productId, setProductId] = useState<string>("");
  const [supplierId, setSuppplierId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchproductsAndSuppliers = async () => {
      try {
        const productData = await ApiService.getAllProducts();
        const supplierData = await ApiService.getAllSuppliers();
        setProducts(productData.products);
        setSuppliers(supplierData.suppliers);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al obtener productos: " + error);
        }
      }
    };

    fetchproductsAndSuppliers();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productId || !supplierId || !quantity) {
      showMessage("Compelta todos los campos");
      return;
    }
    const transaction: TransactionData = {
      productId,
      quantity: parseInt(quantity),
      supplierId,
      description,
      note,
    };

    try {
      const respone = await ApiService.purchaseProduct(transaction);
      showMessage(respone.message);
      resetForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message);
      } else {
        showMessage("Error al comprar producto: " + error);
      }
    }
  };

  const resetForm = () => {
    setProductId("");
    setSuppplierId("");
    setDescription("");
    setNote("");
    setQuantity("");
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
      <div className="purchase-form-page">
        <h1>Recibir inventario</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Seleccionar producto</label>

            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option value="">Seleccionar producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Seleccionar proveedor</label>

            <select
              value={supplierId}
              onChange={(e) => setSuppplierId(e.target.value)}
              required
            >
              <option value="">Seleccionar proveedor</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Nota</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Cantidad</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <button type="submit">Comprar producto</button>
        </form>
      </div>
    </Layout>
  );
};
export default Purchase;
