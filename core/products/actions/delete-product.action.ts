import { bankApi } from "@/core/api/bank-api";
import { DeleteProductResponse } from "../interfaces/product.interface";

export const deleteProduct = async (id: string) => {
  try {
    const { data } = await bankApi.delete<DeleteProductResponse>(
      `/products/${id}`,
    );
    return data;
  } catch (error) {
    throw new Error("Error al eliminar el producto");
  }
};
