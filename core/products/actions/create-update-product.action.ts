import { bankApi } from "@/core/api/bank-api";
import {
  CreateProductResponse,
  Product,
  UpdateProductResponse,
} from "../interfaces/product.interface";

export const createUpdateProduct = async (
  product: Product,
  create: boolean,
) => {
  if (create) {
    return createProduct(product);
  }
  return updateProduct(product);
};

const updateProduct = async (product: Product) => {
  try {
    const { data } = await bankApi.put<UpdateProductResponse>(
      `/products/${product.id}`,
      product,
    );
    return data;
  } catch (error) {
    throw new Error("Error al actualizar el producto");
  }
};

const createProduct = async (product: Product) => {
  try {
    const { data } = await bankApi.post<CreateProductResponse>(
      "/products",
      product,
    );
    return data;
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};
