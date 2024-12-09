import type { NextApiRequest, NextApiResponse } from "next";
import { signUp } from "@/services/auth/services";
import {
  responseApiFailed,
  responseApiNotAllowed,
  responseApiSuccess,
} from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await signUp(req.body, (status: boolean) => {
      if (status === true) {
        responseApiSuccess(res);
      } else {
        responseApiFailed(res);
      }
    });
  } else {
    responseApiNotAllowed(res);
  }
}
