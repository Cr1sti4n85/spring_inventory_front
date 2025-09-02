//AUTH TYPES

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

//Product

export interface ProductForm {
  name: string;
  stock: number;
  imageFile: File | null; // one image
  price: number;
  description: string;
  sku: string;
  categoryId: string;
  // image: FileList | null; // in case there are multiple images
}

//Supplier

export interface SupplierForm {
  name: string;
  email: string;
  address: string;
}
