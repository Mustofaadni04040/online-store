import SuccessView from "@/components/views/transaction/Success";
import { ToasterContext } from "@/contexts/ToasterContext";
import transactionServices from "@/services/transaction";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";

export default function TransactionSuccessPage() {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const checkPayment = async () => {
    await transactionServices.updateTransaction(query.order_id as string);
  };

  useEffect(() => {
    if (isReady) {
      checkPayment();
    }
  }, [isReady]);

  return (
    <>
      <SuccessView />
    </>
  );
}
