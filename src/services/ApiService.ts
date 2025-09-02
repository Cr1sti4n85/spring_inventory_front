import axios from "axios";
import CryptoUtil from "./CryptoService";
import type {
  LoginData,
  ProductForm,
  RegisterData,
  SupplierForm,
  TransactionData,
} from "../types";

export class ApiService {
  static BASE_URL = import.meta.env.VITE_API_URL;

  static encrypt(data: string) {
    return CryptoUtil.encrypt(data);
  }

  static decrypt(data: string) {
    return CryptoUtil.decrypt(data);
  }

  static async saveToken(token: string) {
    const encryptedToken = await this.encrypt(token);
    localStorage.setItem("auth_token", encryptedToken);
  }

  static getToken() {
    const encryptedToken = localStorage.getItem("auth_token");
    return encryptedToken ? this.decrypt(encryptedToken) : null;
  }

  static async saveRole(role: string) {
    const encryptedRole = await this.encrypt(role);
    localStorage.setItem("role", encryptedRole);
  }

  static async getRole() {
    const encryptedRole = localStorage.getItem("role");
    return encryptedRole ? await this.decrypt(encryptedRole) : null;
  }

  static async clearStorage() {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("role");
  }

  static getHeader() {
    const token = this.getToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  /**  AUTH & USERS API */

  static async registerUser(registerData: RegisterData) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registerData
    );
    return response.data;
  }

  static async loginUser(loginData: LoginData) {
    const response = await axios.post(`${this.BASE_URL}/auth/login`, loginData);
    return response.data;
  }

  static async getAllUsers() {
    const response = await axios.get(`${this.BASE_URL}/users`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getLoggedInUserInfo() {
    const response = await axios.get(`${this.BASE_URL}/users/me`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getUserById(userId: number) {
    const response = await axios.get(`${this.BASE_URL}/users/${userId}`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async updateUser(userId: number, userData: Partial<RegisterData>) {
    const response = await axios.put(
      `${this.BASE_URL}/users/${userId}`,
      userData,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteUser(userId: number) {
    const response = await axios.delete(`${this.BASE_URL}/users/${userId}`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  /**PRODUCT ENDPOINTS */

  static async addProduct(formData: ProductForm) {
    const response = await axios.post(`${this.BASE_URL}/products`, formData, {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  static async updateProduct(formData: ProductForm) {
    const response = await axios.put(`${this.BASE_URL}/products`, formData, {
      headers: {
        ...this.getHeader(),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  static async getAllProducts() {
    const response = await axios.get(`${this.BASE_URL}/products`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getProductById(productId: number) {
    const response = await axios.get(`${this.BASE_URL}/products/${productId}`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async searchProduct(searchValue: string) {
    const response = await axios.get(`${this.BASE_URL}/products/search`, {
      params: { searchValue },
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async deleteProduct(productId: number) {
    const response = await axios.delete(
      `${this.BASE_URL}/products/${productId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**CATEGOTY EDNPOINTS */
  static async createCategory(category: string) {
    const response = await axios.post(`${this.BASE_URL}/categories`, category, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getAllCategory() {
    const response = await axios.get(`${this.BASE_URL}/categories`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getCategoryById(categoryId: number) {
    const response = await axios.get(
      `${this.BASE_URL}/categories/${categoryId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async updateCategory(categoryId: number, categoryData: string) {
    const response = await axios.put(
      `${this.BASE_URL}/categories/${categoryId}`,
      categoryData,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteCategory(categoryId: number) {
    const response = await axios.delete(
      `${this.BASE_URL}/categories/${categoryId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**Supplier EDNPOINTS */
  static async addSupplier(supplierData: SupplierForm) {
    const response = await axios.post(
      `${this.BASE_URL}/suppliers`,
      supplierData,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllSuppliers() {
    const response = await axios.get(`${this.BASE_URL}/suppliers`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getSupplierById(supplierId: number) {
    const response = await axios.get(
      `${this.BASE_URL}/suppliers/${supplierId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async updateSupplier(supplierId: number, supplierData: SupplierForm) {
    const response = await axios.put(
      `${this.BASE_URL}/suppliers/${supplierId}`,
      supplierData,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteSupplier(supplierId: number) {
    const response = await axios.delete(
      `${this.BASE_URL}/suppliers/${supplierId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**Transactions EDNPOINTS */
  static async purchaseProduct(transactionData: TransactionData) {
    const response = await axios.post(
      `${this.BASE_URL}/transactions/purchases`,
      transactionData,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async sellProduct(transactionData: TransactionData) {
    const response = await axios.post(
      `${this.BASE_URL}/transactions/sales`,
      transactionData,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async returnToSupplier(transactionData: TransactionData) {
    const response = await axios.post(
      `${this.BASE_URL}/transactions/returns`,
      transactionData,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllTransactions(filter: string) {
    const response = await axios.get(`${this.BASE_URL}/transactions`, {
      headers: this.getHeader(),
      params: { filter },
    });
    return response.data;
  }

  static async geTransactionsByMonthAndYear(month: number, year: number) {
    const response = await axios.get(
      `${this.BASE_URL}/transactions/by-month-year`,
      {
        headers: this.getHeader(),
        params: {
          month,
          year,
        },
      }
    );
    return response.data;
  }

  static async getTransactionById(transactionId: number) {
    const response = await axios.get(
      `${this.BASE_URL}/transactions/${transactionId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async updateTransactionStatus(
    transactionId: number,
    transactionData: Partial<TransactionData>
  ) {
    const response = await axios.put(
      `${this.BASE_URL}/transactions/${transactionId}`,
      transactionData,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  //CHEACK AUTH
  static logout() {
    this.clearStorage();
  }

  static isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  static async isAdmin() {
    const role = await this.getRole();
    return role === "ADMIN";
  }
}
