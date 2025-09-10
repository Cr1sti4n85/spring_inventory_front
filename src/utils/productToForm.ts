import type { ProductForm } from "../types";

export function toFormData(product: ProductForm): FormData {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("sku", product.sku);
  formData.append("price", String(product.price));
  formData.append("stock", String(product.stock));
  formData.append("description", product.description);
  formData.append("categoryId", String(product.categoryId));
  if (product.productId) {
    formData.append("productId", String(product.productId));
  }
  if (product.imageFile) {
    formData.append("imageFile", product.imageFile);
  }
  return formData;
}
