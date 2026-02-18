import { bankApi } from "@/core/api/bank-api";
import { ProductsResponse } from "../interfaces/product.interface";

export const getProducts = async () => {
  try {
    const { data } = await bankApi.get<ProductsResponse>("/products");
    return data;
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};
