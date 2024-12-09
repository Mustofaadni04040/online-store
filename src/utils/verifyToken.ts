import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { responseApiAccessDenied } from "./responseApi";
export const verify = (
  res: NextApiResponse,
  req: NextApiRequest,
  isAdmin: Boolean,
  callback: Function
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (decoded && (isAdmin ? decoded.role === "admin" : true)) {
          callback(decoded);
        } else {
          responseApiAccessDenied(res);
        }
      }
    );
  } else {
    responseApiAccessDenied(res);
  }
};
