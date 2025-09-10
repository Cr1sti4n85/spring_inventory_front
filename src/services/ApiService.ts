import axios, { type AxiosResponse } from "axios";
import CryptoUtil from "./CryptoService";
import {
  type CategoryData,
  type LoginData,
  type ProductForm,
  type RegisterData,
  type SupplierForm,
  type SupplierResponse,
  type SuppliersResponse,
  type TransactionData,
} from "../types.d";
import { toFormData } from "../utils/productToForm";

export default class ApiService {
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

  static async getToken() {
    const encryptedToken = localStorage.getItem("auth_token");
    return encryptedToken ? await this.decrypt(encryptedToken) : null;
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

  static async getHeader() {
    const token = await this.getToken();
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  /**  AUTH & USERS API */

  static async registerUser(registerData: RegisterData) {
    const response: AxiosResponse = await axios.post(
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
      headers: await this.getHeader(),
    });
    return response.data;
  }

  static async getLoggedInUserInfo() {
    const response = await axios.get(`${this.BASE_URL}/users/me`, {
      headers: await this.getHeader(),
    });
    return response.data;
  }

  static async getUserById(userId: number) {
    const response = await axios.get(`${this.BASE_URL}/users/${userId}`, {
      headers: await this.getHeader(),
    });
    return response.data;
  }

  static async updateUser(userId: number, userData: Partial<RegisterData>) {
    const response = await axios.put(
      `${this.BASE_URL}/users/${userId}`,
      userData,
      {
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteUser(userId: number) {
    const response = await axios.delete(`${this.BASE_URL}/users/${userId}`, {
      headers: await this.getHeader(),
    });
    return response.data;
  }

  /**PRODUCT ENDPOINTS */

  static async addProduct(product: ProductForm) {
    const formData = toFormData(product);
    const response = await axios.post(`${this.BASE_URL}/products`, formData, {
      headers: {
        ...(await this.getHeader()),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  static async updateProduct(product: ProductForm) {
    const formData = toFormData(product);
    const response = await axios.put(`${this.BASE_URL}/products`, formData, {
      headers: {
        ...(await this.getHeader()),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  static async getAllProducts() {
    const response = await axios.get(`${this.BASE_URL}/products`, {
      headers: await this.getHeader(),
    });
    return response.data;
  }

  static async getProductById(productId: number) {
    const response = await axios.get(`${this.BASE_URL}/products/${productId}`, {
      headers: await this.getHeader(),
    });
    return response.data;
  }

  static async searchProduct(searchValue: string) {
    const response = await axios.get(`${this.BASE_URL}/products/search`, {
      params: { searchValue },
      headers: await this.getHeader(),
    });
    return response.data;
  }

  static async deleteProduct(productId: number) {
    const response = await axios.delete(
      `${this.BASE_URL}/products/${productId}`,
      {
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  /**CATEGOTY EDNPOINTS */
  static async createCategory(category: CategoryData) {
    const response = await axios.post(`${this.BASE_URL}/categories`, category, {
      headers: await this.getHeader(),
    });
    return response.data;
  }

  static async getAllCategory() {
    const response = await axios.get(`${this.BASE_URL}/categories`, {
      headers: await this.getHeader(),
    });
    return response.data;
  }

  static async getCategoryById(categoryId: number) {
    const response = await axios.get(
      `${this.BASE_URL}/categories/${categoryId}`,
      {
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  static async updateCategory(categoryId: number, categoryData: CategoryData) {
    const response = await axios.put(
      `${this.BASE_URL}/categories/${categoryId}`,
      categoryData,
      {
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteCategory(categoryId: number) {
    const response = await axios.delete(
      `${this.BASE_URL}/categories/${categoryId}`,
      {
        headers: await this.getHeader(),
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
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllSuppliers() {
    const response = await axios.get<SuppliersResponse>(
      `${this.BASE_URL}/suppliers`,
      {
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  static async getSupplierById(supplierId: number) {
    const response = await axios.get<SupplierResponse>(
      `${this.BASE_URL}/suppliers/${supplierId}`,
      {
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  static async updateSupplier(supplierId: number, supplierData: SupplierForm) {
    const response = await axios.put(
      `${this.BASE_URL}/suppliers/${supplierId}`,
      supplierData,
      {
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteSupplier(supplierId: number) {
    const response = await axios.delete(
      `${this.BASE_URL}/suppliers/${supplierId}`,
      {
        headers: await this.getHeader(),
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
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  static async sellProduct(transactionData: TransactionData) {
    const response = await axios.post(
      `${this.BASE_URL}/transactions/sales`,
      transactionData,
      {
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  static async returnToSupplier(transactionData: TransactionData) {
    const response = await axios.post(
      `${this.BASE_URL}/transactions/returns`,
      transactionData,
      {
        headers: await this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllTransactions(filter: string) {
    const response = await axios.get(`${this.BASE_URL}/transactions`, {
      headers: await this.getHeader(),
      params: { filter },
    });
    return response.data;
  }

  static async geTransactionsByMonthAndYear(month: number, year: number) {
    const response = await axios.get(
      `${this.BASE_URL}/transactions/by-month-year`,
      {
        headers: await this.getHeader(),
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
        headers: await this.getHeader(),
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
        headers: await this.getHeader(),
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

  static async isAdmin(): Promise<boolean> {
    const role = await this.getRole();
    return role === "ADMIN";
  }
}
