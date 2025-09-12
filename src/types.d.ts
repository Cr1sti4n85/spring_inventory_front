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
  productId: string;
  quantity: number;
  supplierId?: string; // Optional for sales
  description?: string;
  note?: string;
  status?: string; //for updates
}

export interface Transaction {
  id: number;
  type: string;
  status: string;
  totalPrice: number;
  totalProducts: number;
  createdAt: string;
  updatedAt?: string;
  description?: string;
  note?: string;
  product: ProductData;
  user: RegisterData;
  supplier: Supplier;
}

export interface TransactionResponse {
  status: number;
  message: string;
  transactions: Transaction[];
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
  stock: string;
  description: string;
  imageFile: File | null; // Single image file
  categoryId: string;
  productId?: number;
}
export interface ProductData extends ProductForm {
  id: number;
  imageName: string; // URL of the uploaded image
}
