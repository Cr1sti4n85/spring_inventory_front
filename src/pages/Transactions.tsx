import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ApiService from "../services/ApiService";
import Pagination from "../components/Pagination";
import Layout from "../components/Layout";
import type { Transaction, TransactionResponse } from "../types";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [message, setMessage] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [valueToSearch, setValueToSearch] = useState<string>("");

  const navigate = useNavigate();

  //Pagination Set-Up
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const transactionData: TransactionResponse =
          await ApiService.getAllTransactions(valueToSearch);

        if (transactionData.status === 200) {
          setTotalPages(
            Math.ceil(transactionData.transactions.length / itemsPerPage)
          );

          setTransactions(
            transactionData.transactions.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al obtener las transacciones: " + error);
        }
      }
    };

    getTransactions();
  }, [currentPage, valueToSearch]);

  //Method to show message or errors
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  //handle search
  const handleSearch = () => {
    setCurrentPage(1);
    setValueToSearch(filter);
  };

  //Navigate to transactions details page
  const navigateToTransactionDetailsPage = (transactionId: number) => {
    navigate(`/transactions/${transactionId}`);
  };

  return (
    <Layout>
      {message && <p className="message">{message}</p>}
      <div className="transactions-page">
        <div className="transactions-header">
          <h1>Transacciones</h1>
          <div className="transaction-search">
            <input
              placeholder="Buscar..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              type="text"
            />
            <button onClick={() => handleSearch()}>Buscar</button>
          </div>
        </div>

        {transactions && (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Status</th>
                <th>Precio total</th>
                <th>Total de productos</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.type}</td>
                  <td>{transaction.status}</td>
                  <td>{transaction.totalPrice}</td>
                  <td>{transaction.totalProducts}</td>
                  <td>{new Date(transaction.createdAt).toLocaleString()}</td>

                  <td>
                    <button
                      onClick={() =>
                        navigateToTransactionDetailsPage(transaction.id)
                      }
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Layout>
  );
};
export default Transactions;
