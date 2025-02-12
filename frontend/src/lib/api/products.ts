import axios from "axios";
import { config } from "@/config";
import { Product, ProductsResponse } from "@/types/product";

const api = axios.create({
  baseURL: config.apiUrl,
});

export const productsApi = {
  getAll: async (page = 1, limit = 10): Promise<ProductsResponse> => {
    const response = await api.get<ProductsResponse>(
      `/products?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  getOne: async (id: string): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  create: async (product: FormData): Promise<Product> => {
    const response = await api.post<Product>("/products", product);
    return response.data;
  },

  update: async (id: string, product: FormData): Promise<Product> => {
    const response = await api.patch<Product>(`/products/${id}`, product);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
