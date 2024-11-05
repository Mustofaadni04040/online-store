import instance from "@/lib/axios/instance";

const endpoint = "/api/product";

const productServices = {
  getAllProducts: () => instance.get(endpoint),
  getDetailProduct: (id: string) => instance.get(`${endpoint}/${id}`),
  addProduct: (data: any) => instance.post(endpoint, data),
  updateProduct: (id: string, data: any) =>
    instance.put(`${endpoint}/${id}`, { data }),
  deleteProduct: (id: string) => instance.delete(`${endpoint}/${id}`),
};

export default productServices;
