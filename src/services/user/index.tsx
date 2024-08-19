import instance from "@/lib/axios/instance";

const userServices = {
  getAllUsers: () => instance.get("/api/user"),
  updateUser: (id: string, data: any, token: string) =>
    instance.put(
      `/api/user/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ),
  deleteUser: (id: string, token: string) =>
    instance.delete(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  getProfile: (token: string) =>
    instance.get("/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default userServices;
