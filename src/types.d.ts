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
  price: string;
  stock: string;
  description: string;
  imageFile: File | null; // Single image file
  categoryId: string;
}
export interface ProductData extends ProductForm {
  id: number;
  imageName: string; // URL of the uploaded image
}

export function toFormData(product: ProductForm): FormData {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("sku", product.sku);
  formData.append("price", String(product.price));
  formData.append("stock", String(product.stock));
  formData.append("description", product.description);
  formData.append("categoryId", String(product.categoryId));
  formData.append("supplierId", String(product.supplierId));
  if (product.imageFile) {
    formData.append("imageFile", product.imageFile);
  }
  return formData;
}
