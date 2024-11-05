import axios from "axios";
import { getSession } from "next-auth/react";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
  Expires: 0,
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers,
  timeout: 60 * 1000,
});

// instance.interceptors.response.use(
//   (response) => response, // Ini tetap, menangani response yang sukses
//   async (error) => {
//     const config = error.config;
//     if (error.code === "ECONNABORTED" && !config._retry) {
//       config._retry = true; // Menandai bahwa permintaan akan diulang
//       return instance(config); // Mengulang permintaan yang gagal
//     }
//     return Promise.reject(error); // Menolak error jika bukan karena timeout atau jika sudah di-retry
//   }
// );
instance.interceptors.request.use(
  async (request) => {
    const session: any = await getSession();
    if (!session) return request;
    const token = `Bearer ${session.accessToken}`;
    request.headers.Authorization = token;
    return request;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
