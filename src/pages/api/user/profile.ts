import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { retrieveDataById } from "@/lib/firebase/service";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          if (decoded) {
            const profile = await retrieveDataById("users", decoded.id);
            return res.status(200).json({
              status: true,
              statusCode: 200,
              message: "Success",
              data: profile,
            });
          }
        }
      );
    }
  }
}
