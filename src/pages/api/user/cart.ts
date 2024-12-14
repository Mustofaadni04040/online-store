import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { verify } from "@/utils/verifyToken";
import {
  responseApiFailed,
  responseApiNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseApi";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(res, req, false, async (decoded: { id: string }) => {
      const user: any = await retrieveDataById("users", decoded.id);
      if (user) {
        user.id = decoded.id;
        if (user.carts) {
          responseApiSuccess(res, user.carts);
        } else {
          responseApiSuccess(res, []);
        }
      } else {
        responseApiNotFound(res);
      }
    });
  } else if (req.method === "PUT") {
    verify(res, req, false, async (decoded: { id: string }) => {
      const { data }: any = req.body;
      await updateData("users", decoded.id, data, (result: boolean) => {
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

export const config = {
  api: {
    externalResolver: true,
  },
};
