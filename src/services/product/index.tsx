import instance from "@/lib/axios/instance";

const productServices = {
  getAllProducts: () => instance.get("/api/product"),
};

export default productServices;
