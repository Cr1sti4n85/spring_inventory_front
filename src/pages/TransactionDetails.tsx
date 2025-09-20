import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Transaction } from "../types";
import ApiService from "../services/ApiService";
import axios from "axios";
import Layout from "../components/Layout";

const TransactionDetails = () => {
  const { transactionId } = useParams();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const getTransaction = async () => {
      try {
        if (!transactionId) {
          showMessage("Id Transacción no válido");
          return;
        }
        const transactionData = await ApiService.getTransactionById(
          +transactionId
        );

        if (transactionData.status === 200) {
          setTransaction(transactionData.transaction);
          setStatus(transactionData.transaction.status);
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al obtener la transacción: " + error);
        }
      }
    };

    getTransaction();
  }, [transactionId]);

  //update transaction status
  const handleUpdateStatus = async () => {
    try {
      if (!transactionId) {
        showMessage("Id Transacción no válido");
        return;
      }
      ApiService.updateTransactionStatus(+transactionId, { status });
      navigate("/transactions");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message);
      } else {
        showMessage("Error al actualizar la transacción: " + error);
      }
    }
  };

  //Method to show message or errors
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <p className="message">{message}</p>}
      <div className="transaction-details-page">
        {transaction && (
          <>
            {/* Transaction base information */}
            <div className="section-card">
              <h2>Información de transacción</h2>
              <p>Tipo: {transaction.type}</p>
              <p>Status: {transaction.status}</p>
              <p>Descripción: {transaction.description}</p>
              <p>Nota: {transaction.note}</p>
              <p>Total de productos: {transaction.totalProducts}</p>
              <p>Precio total: {transaction.totalPrice.toFixed(2)}</p>
              <p>
                Fecha creación:{" "}
                {new Date(transaction.createdAt).toLocaleString()}
              </p>

              {transaction.updatedAt && (
                <p>
                  Fecha actualización:{" "}
                  {new Date(transaction.updatedAt).toLocaleString()}
                </p>
              )}
            </div>

            {/* Product information of the transaction */}
            <div className="section-card">
              <h2>Información del producto</h2>
              <p>Nombre: {transaction.product.name}</p>
              <p>SKU: {transaction.product.sku}</p>
              <p>Precio: {Number(transaction.product.price).toFixed(2)}</p>
              <p>Stock: {transaction.product.stock}</p>
              <p>Descripción: {transaction.product.description}</p>

              {transaction.product.imageName && (
                <img
                  src={transaction.product.imageName}
                  alt={transaction.product.name}
                />
              )}
            </div>

            {/* User information who made the transaction */}
            <div className="section-card">
              <h2>Información de usuario</h2>
              <p>Nombre: {transaction.user.name}</p>
              <p>Email: {transaction.user.email}</p>
              <p>Teléfono: {transaction.user.phoneNumber}</p>
              <p>Rol: {transaction.user.role}</p>
              <p>
                Fecha de creación:{" "}
                {new Date(transaction.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Supplier information who made the transaction */}
            {transaction.supplier && (
              <div className="section-card">
                <h2>Información del proveedor</h2>
                <p>Nombre: {transaction.supplier.name}</p>
                <p>Contacto: {transaction.supplier.email}</p>
                <p>Dirección: {transaction.supplier.address}</p>
              </div>
            )}

            {/* UPDATE TRANSACTION STATUS */}
            <div className="section-card transaction-staus-update">
              <label>Status: </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="PENDING">Pendiente</option>
                <option value="PROCESSING">En proceso</option>
                <option value="COMPLETED">Completado</option>
                <option value="CANCELLED">Cancelado</option>
              </select>
              <button onClick={() => handleUpdateStatus()}>
                Actualizar status
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};
export default TransactionDetails;
