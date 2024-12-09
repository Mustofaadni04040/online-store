// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { responseApiSuccess } from "@/utils/responseApi";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  responseApiSuccess(res);
}
