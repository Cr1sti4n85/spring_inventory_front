import { useEffect, useState, type FC } from "react";
import ApiService from "../services/ApiService";
import type { Category } from "../types";
import axios from "axios";
import Layout from "../components/Layout";
import Loader from "../components/Loader";

const Categories: FC = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const getCategories = async () => {
      try {
        const response = await ApiService.getAllCategory();
        if (response.status === 200) {
          setCategories(response.categories);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al iniciar sesión: " + error);
        }
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, [message]);

  //add category
  const addCategory = async () => {
    if (!categoryName) {
      showMessage("El nombre de la categoría no puede estar vacío");
      return;
    }
    try {
      await ApiService.createCategory({ name: categoryName });
      showMessage("Categoría añadida con éxito");
      setCategoryName(""); //clear input
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message);
      } else {
        showMessage("Error al iniciar sesión: " + error);
      }
    }
  };

  //Edit category
  const editCategory = async () => {
    try {
      await ApiService.updateCategory(editingCategoryId as number, {
        name: categoryName,
      });
      showMessage("Categoría actualizada con éxito");
      setIsEditing(false);
      setCategoryName(""); //clear input
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showMessage(error.response?.data?.message);
      } else {
        showMessage("Error al iniciar sesión: " + error);
      }
    }
  };

  //populate the edit category data
  const handleEditCategory = (category: Category) => {
    setIsEditing(true);
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
  };

  //delete category
  const handleDeleteCategory = async (categoryId: number) => {
    if (window.confirm("Estás seguro de eliminar esta categoría?")) {
      try {
        await ApiService.deleteCategory(categoryId);
        showMessage("Categoría eliminada con éxito");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          showMessage(error.response?.data?.message);
        } else {
          showMessage("Error al iniciar sesión: " + error);
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

  return loading ? (
    <Loader size={60} cssClass="loader-container" />
  ) : (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="category-page">
        <div className="category-header">
          <h1>Categorías</h1>
          <div className="add-cat">
            <input
              value={categoryName}
              type="text"
              placeholder="Nombre de categoría"
              onChange={(e) => setCategoryName(e.target.value)}
            />

            {!isEditing ? (
              <button onClick={addCategory}>Añadir categoría</button>
            ) : (
              <button onClick={editCategory}>Editar categoría</button>
            )}
          </div>
        </div>

        {categories && (
          <ul className="category-list">
            {categories.map((category: Category) => (
              <li className="category-item" key={category.id}>
                <span>{category.name}</span>

                <div className="category-actions">
                  <button onClick={() => handleEditCategory(category)}>
                    Editar
                  </button>
                  <button onClick={() => handleDeleteCategory(category.id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};
export default Categories;
