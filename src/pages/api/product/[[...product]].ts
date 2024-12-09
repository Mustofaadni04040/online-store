import {
  addData,
  deleteData,
  retrieveData,
  retrieveDataById,
  updateData,
} from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "@/utils/verifyToken";
import {
  responseApiFailed,
  responseApiNotAllowed,
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { product }: any = req.query;
    if (product && product[0]) {
      const data = await retrieveDataById("products", product[0]);
      responseApiSuccess(res, data);
    } else {
      const data = await retrieveData("products");
      responseApiSuccess(res, data);
    }
  } else if (req.method === "POST") {
    verify(res, req, true, async () => {
      let data = req.body;
      data.created_at = new Date();
      data.updated_at = new Date();
      data.price = parseInt(data.price);
      data.stock.filter((stock: any) => {
        stock.qty = parseInt(stock.qty);
      });
      await addData("products", data, (status: boolean, result: any) => {
        if (status) {
          responseApiSuccess(res, { id: result.id });
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "PUT") {
    verify(res, req, true, async () => {
      const { product }: any = req.query;
      const { data } = req.body;
      await updateData("products", product[0], data, (status: boolean) => {
        if (status) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "DELETE") {
    verify(res, req, true, async () => {
      const { product }: any = req.query;
      await deleteData("products", product[0], (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else {
    responseApiNotAllowed(res);
  }
}
