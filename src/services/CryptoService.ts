export default class CryptoUtil {
  static ENCRYPTION_KEY = import.meta.env.VITE_ENCRIPTION_KEY;
  static IV_LENGTH = 12;

  // Derive crypto key from enc key
  static async getKey() {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      enc.encode(this.ENCRYPTION_KEY),
      { name: "PBKDF2" },
      false,
      ["deriveKey"]
    );

    return crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt: enc.encode("salt-fijo-o-mejor-random"), // ¡importante definir bien!
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      false,
      ["encrypt", "decrypt"]
    );
  }

  static async encrypt(data: string) {
    const iv = crypto.getRandomValues(new Uint8Array(this.IV_LENGTH));
    const key = await this.getKey();

    const encoded = new TextEncoder().encode(data);
    const cipherBuffer = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoded
    );

    // concatenamos iv + datos cifrados y lo pasamos a base64
    const combined = new Uint8Array(iv.length + cipherBuffer.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(cipherBuffer), iv.length);

    return btoa(String.fromCharCode(...combined));
  }

  static async decrypt(base64Data: string) {
    const data = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    const iv = data.slice(0, this.IV_LENGTH);
    const cipherText = data.slice(this.IV_LENGTH);

    const key = await this.getKey();

    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      cipherText
    );

    return new TextDecoder().decode(decryptedBuffer);
  }
}
