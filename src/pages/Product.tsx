import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router";
import type { ProductData } from "../types";
import ApiService from "../services/ApiService";
import axios from "axios";
import Layout from "../components/Layout";
import Pagination from "../components/Pagination";

const Product: FC = () => {
  const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;
  const [products, setProducts] = useState<ProductData[]>([]);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  //Pagination Set-Up
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage: number = 10;

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await ApiService.getAllProducts();

        if (productData.status === 200) {
          setTotalPages(Math.ceil(productData.products.length / itemsPerPage));

          setProducts(
            productData.products.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
          );
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al obtener productos: " + error);
        }
      }
    };

    getProducts();
  }, [currentPage]);

  //Delete a product
  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm("¿Estás seguro que quieres eliminar este producto?")) {
      try {
        await ApiService.deleteProduct(productId);
        showMessage("Producto eliminado exitosamente");
        window.location.reload(); //relode page
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al borrar el producto: " + error);
        }
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

      <div className="product-page">
        <div className="product-header">
          <h1>Products</h1>
          <button
            className="add-product-btn"
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </button>
        </div>

        {products && (
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <img
                  className="product-image"
                  src={`${IMAGES_URL}${product.imageName}`}
                  alt={product.name}
                />

                <div className="product-info">
                  <h3 className="name">{product.name}</h3>
                  <p className="sku">Sku: {product.sku}</p>
                  <p className="price">Price: {product.price}</p>
                  <p className="quantity">Quantity: {product.stock}</p>
                </div>

                <div className="product-actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/edit-product/${product.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
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
export default Product;
