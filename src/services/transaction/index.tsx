import instance from "@/lib/axios/instance";

const endpoint = {
  transaction: "/api/transaction",
};

const transactionServices = {
  getTransaction: (order_id: string) =>
    instance.get(`${endpoint.transaction}?order_id=${order_id}`),
  generateTransaction: (data: any) => instance.post(endpoint.transaction, data),
  updateTransaction: (order_id: string) =>
    instance.put(`${endpoint.transaction}?order_id=${order_id}`),
};

export default transactionServices;
