import snap from "./init";

const createTransaction = async (params: any, callback: Function) => {
  snap
    .createTransaction(params)
    .then((transaction: { token: string; redirect_url: string }) => {
      callback(transaction);
    });
};

const getTransaction = async (order_id: string, callback: Function) => {
  snap.transaction.status(order_id).then((res: any) => {
    callback(res);
  });
};

export { createTransaction, getTransaction };
