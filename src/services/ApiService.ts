import axios from "axios";
import CryptoUtil from "./CryptoService";

export class ApiService {
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
}
