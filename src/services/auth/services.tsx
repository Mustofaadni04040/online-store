import { addData, retrieveDataByField } from "@/lib/firebase/service";
import bcrypt from "bcrypt";

// sign up firebase
export async function signUp(
  // menambahakan field di fireabase
  userData: {
    email: string;
    fullname: string;
    password: string;
    phone: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
    image?: string;
    carts?: Array<{ id: string; size: string; qty: number }>;
  },
  callback: Function
) {
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) {
    callback(false);
  } else {
    if (!userData.role) {
      userData.role = "member";
    }
    userData.image = "";
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    userData.carts = [];

    addData("users", userData, (result: boolean) => {
      callback(result);
    });
  }
}

export async function signIn(email: string) {
  const data = await retrieveDataByField("users", "email", email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(
  data: {
    id?: string;
    email: string;
    password?: string;
    role?: string;
    image: string;
    created_at?: Date;
    updated_at?: Date;
  },
  callback: Function
) {
  const user = await retrieveDataByField("users", "email", data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = "member";
    data.created_at = new Date();
    data.updated_at = new Date();
    data.password = "";

    await addData("users", data, (status: boolean, res: any) => {
      data.id = res.path.repalce("users/", "");
      if (status) {
        callback(data);
      }
    });
  }
}
