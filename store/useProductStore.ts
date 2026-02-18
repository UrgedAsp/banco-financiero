import { Product } from "@/core/products/interfaces/product.interface";
import { create } from "zustand";

interface ProductStore {
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product) => void;
  clearSelectedProduct: () => void;
}

const useProductStore = create<ProductStore>((set) => ({
  selectedProduct: null,
  setSelectedProduct: (product: Product) => set({ selectedProduct: product }),
  clearSelectedProduct: () => set({ selectedProduct: null }),
}));

export default useProductStore;
