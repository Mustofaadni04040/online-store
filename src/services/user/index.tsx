import instance from "@/lib/axios/instance";

const endpoint = {
  user: "/api/user",
  profile: "/api/user/profile",
  cart: "/api/user/cart",
};

const userServices = {
  getAllUsers: () => instance.get(endpoint.user),
  updateUser: (id: string, data: any) =>
    instance.put(`${endpoint.user}/${id}`, { data }),
  deleteUser: (id: string) => instance.delete(`${endpoint.user}/${id}`),
  getProfile: () => instance.get(`${endpoint.profile}`),
  updateProfile: (data: any) => instance.put(`${endpoint.profile}`, { data }),
  getCart: () => instance.get(`${endpoint.cart}`),
  addToCart: (data: any) => instance.put(`${endpoint.cart}`, { data }),
};

export default userServices;
