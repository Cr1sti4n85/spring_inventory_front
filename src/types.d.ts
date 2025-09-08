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

export interface Supplier extends SupplierForm {
  id: number;
}

export interface SuppliersResponse {
  status: number;
  message: string;
  suppliers: Supplier[];
}

export interface SupplierResponse {
  status: number;
  message: string;
  supplier: Supplier;
}

//Transaction
export interface TransactionData {
  productId: number;
  quantity: number;
  supplierId?: number; // Optional for sales
  description?: string;
  note?: string;
  status?: string; //for updates
}

//Category
export interface CategoryData {
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

//Product

interface ProductForm {
  name: string;
  sku: string;
  price: number;
  stock: number;
  description: string;
  imageFile: File | null; // Single image file
  categoryId: number;
  supplierId: number;
}
export interface ProductData extends ProductForm {
  id: number;
  imageUrl: string; // URL of the uploaded image
}
