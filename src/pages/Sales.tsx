import { useEffect, useState } from "react";
import ApiService from "../services/ApiService";
import axios from "axios";
import type { ProductData, TransactionData } from "../types";
import Layout from "../components/Layout";

const Sales = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [productId, setProductId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productData = await ApiService.getAllProducts();
        setProducts(productData.products);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al obtener productos: " + error);
        }
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productId || !quantity) {
      showMessage("Completa todos los campos");
      return;
    }
    const sale: TransactionData = {
      productId,
      quantity: Number(quantity),
      description,
      note,
    };

    try {
      const respone = await ApiService.sellProduct(sale);
      showMessage(respone.message);
      resetForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message);
      } else {
        showMessage("Error al vender producto: " + error);
      }
    }
  };

  const resetForm = () => {
    setProductId("");
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
        <h1>Venta de productos</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Seleccionar producto</label>

            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option value="">Selecciona producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
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

          <button type="submit">Vender producto</button>
        </form>
      </div>
    </Layout>
  );
};
export default Sales;
