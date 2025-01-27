import { retrieveData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import { verify } from "@/utils/verifyToken";
import { responseApiNotAllowed, responseApiSuccess } from "@/utils/responseApi";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verify(res, req, true, async () => {
      const users = await retrieveData("users");
      let data: any = [];
      users.forEach((user: any) => {
        if (user.transaction) {
          const transactions = user.transaction.map((transaction: any) => {
            return {
              ...transaction,
              user: {
                id: user.id,
                fullname: user.fullname,
              },
            };
          });
          data = [...data, ...transactions];
        }
      });
      responseApiSuccess(res, data);
    });
  } else {
    responseApiNotAllowed(res);
  }
}
