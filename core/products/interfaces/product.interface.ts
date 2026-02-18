export interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

export interface ProductsResponse {
  data: Product[];
}

export interface CreateProductResponse {
  message: string;
  data: {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
  };
}

export interface UpdateProductResponse {
  message: string;
  data: {};
}

export interface DeleteProductResponse {
  message: string;
}

export interface VerifyProductResponse {
  data: boolean;
}
