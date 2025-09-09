import { useEffect, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router";
import type { Category, ProductForm } from "../types";
import ApiService from "../services/ApiService";
import axios from "axios";
import Layout from "../components/Layout";

const AddEditProduct: FC = () => {
  const { productId } = useParams();
  const [name, setName] = useState<string>("");
  const [sku, setSku] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await ApiService.getAllCategory();
        setCategories(categoriesData.categories);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al obtener las categorías: " + error);
        }
      }
    };

    const fetchProductById = async () => {
      if (productId) {
        setIsEditing(true);
        try {
          const productData = await ApiService.getProductById(+productId);
          if (productData.status === 200) {
            setName(productData.product.name);
            setSku(productData.product.sku);
            setPrice(productData.product.price);
            setStock(productData.product.stock);
            setCategoryId(productData.product.categoryId);
            setDescription(productData.product.description);
            setImageUrl(productData.product.imageUrl);
          } else {
            showMessage(productData.message);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            showMessage(error.response?.data?.message);
          } else {
            showMessage("Error al obtener el producto: " + error);
          }
        }
      }
    };

    fetchCategories();
    if (productId) fetchProductById();
  }, [productId]);

  //metjhod to show message or errors
  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImageUrl(reader.result); //user imagurl to preview the image to upload
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("name", name);
    // formData.append("sku", sku);
    // formData.append("price", price);
    // formData.append("stock", stock);
    // formData.append("categoryId", categoryId);
    // formData.append("description", description);
    // if (imageFile) {
    //   formData.append("imageFile", imageFile);
    // }
    const product: ProductForm = {
      name,
      sku,
      price,
      stock,
      categoryId,
      description,
      imageFile,
    };
    try {
      if (isEditing && productId) {
        await ApiService.updateProduct({ ...product, id: +productId });
        showMessage("Producto actualizado con éxito 🤩");
      } else {
        await ApiService.addProduct(product);
        showMessage("Product guardado con éxito 🤩");
      }
      navigate("/products");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message);
      } else {
        showMessage("Error al guardar el producto: " + error);
      }
    }
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}

      <div className="product-form-page">
        <h1>{isEditing ? "Editar Producto" : "Añadir Producto"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del producto</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Sku</label>
            <input
              type="text"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Precio</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Descripción</label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Categoría</label>

            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Selecciona una categoría</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>imagen del producto</label>
            <input type="file" onChange={handleImageChange} />

            {imageUrl && (
              <img
                src={imageUrl as string}
                alt="preview"
                className="image-preview"
              />
            )}
          </div>
          <button type="submit">
            {isEditing ? "Editar producto" : "Añadir producto"}
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default AddEditProduct;
