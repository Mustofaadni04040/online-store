import { NextApiResponse } from "next";

export const responseApi = (
  res: NextApiResponse,
  status: boolean,
  statusCode: number,
  message: string,
  data: any = {}
) => {
  res.status(200).json({
    status,
    statusCode,
    message,
    data,
  });
};

export const responseApiAccessDenied = (res: NextApiResponse) => {
  responseApi(res, false, 403, "Access Denied", []);
};

export const responseApiSuccess = (res: NextApiResponse, data: any = {}) => {
  responseApi(res, true, 200, "Success", data);
};

export const responseApiFailed = (res: NextApiResponse) => {
  responseApi(res, false, 400, "Failed");
};

export const responseApiNotFound = (res: NextApiResponse) => {
  responseApi(res, false, 404, "Not Found");
};

export const responseApiNotAllowed = (res: NextApiResponse) => {
  responseApi(res, false, 405, "Method not Allowed");
};
