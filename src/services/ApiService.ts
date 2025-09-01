import axios from "axios";
import CryptoUtil from "./CryptoService";
import type { LoginData, RegisterData } from "../types";

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
    return encryptedRole ? this.decrypt(encryptedRole) : null;
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
}
