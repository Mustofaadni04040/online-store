import Button from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import styles from "./Orders.module.scss";
import { User } from "@/types/user.type";
import { convertIDR } from "@/utils/currency";
import Script from "next/script";
import ModalDetailOrder from "./modalDetailOrder";
import { Product } from "@/types/product.type";
import productServices from "@/services/product";
import AdminLayout from "@/components/layouts/AdminLayout";
import transactionServices from "@/services/transaction";

export default function OrdersAdminView() {
  const [detailOrder, setDetailOrder] = useState<any>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<any>([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getAllTransaction = async () => {
    const { data } = await transactionServices.getAllTransaction();
    const result = data.data;
    setTransactions(result);
  };

  useEffect(() => {
    getAllTransaction();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Script
        src={process.env.NEXT_PUBLIC_MIDTRANS_SNAP_URL}
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <AdminLayout>
        <div className={styles.orders}>
          <h1>Order Management</h1>
          <table className={styles.orders__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Buyer Name</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction: any, index: number) => {
                return (
                  <tr key={transaction.orderId}>
                    <td>{index + 1}</td>
                    <td>{transaction.orderId}</td>
                    <td>{transaction.user.fullname}</td>
                    <td>{convertIDR(transaction.total)}</td>
                    <td>
                      {transaction.status === "pending"
                        ? "Payment Pending"
                        : transaction.status === "settlement"
                        ? "Payment Received"
                        : "Payment Failed"}
                    </td>
                    <td>
                      <div className={styles.orders__table__action}>
                        <Button
                          type="button"
                          className={styles.orders__table__action__buttonDetail}
                          onClick={() => setDetailOrder(transaction)}
                        >
                          Detail Order
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AdminLayout>
      {Object.keys(detailOrder).length > 0 && (
        <ModalDetailOrder
          setDetailOrder={setDetailOrder}
          detailOrder={detailOrder}
          products={products}
        />
      )}
    </>
  );
}
