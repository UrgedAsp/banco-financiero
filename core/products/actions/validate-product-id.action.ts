import { bankApi } from "@/core/api/bank-api";
import { VerifyProductResponse } from "../interfaces/product.interface";

export const validateProductId = async (id: string) => {
  try {
    const { data } = await bankApi.get<VerifyProductResponse>(
      `/products/verification/${id}`,
    );
    return data;
  } catch (error) {
    throw new Error(
      "Ocurrio un error al validar el producto, por favor intente de nuevo",
    );
  }
};
