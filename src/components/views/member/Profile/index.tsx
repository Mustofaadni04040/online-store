import MemberLayout from "@/components/layouts/MemberLayout";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./Profile.module.scss";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/user";
import { User } from "@/types/user.type";

type Proptypes = {
  profile: User | any;
  setProfile: Dispatch<SetStateAction<{}>>;
  session: any;
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function ProfileMemberView({
  profile,
  setProfile,
  session,
  setToaster,
}: Proptypes) {
  const [changeImage, setChangeImage] = useState<File | any>({});
  const [loading, setLoading] = useState("");

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading("profile");

    const form = e.target as HTMLFormElement;

    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const result = await userServices.updateProfile(
      data,
      session.data?.accessToken
    );

    if (result.status === 200) {
      setLoading("");
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      form.reset();
      setToaster({
        variant: "success",
        message: "Success update profile",
      });
    } else {
      setLoading("");
    }
  };

  const handleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("picture");

    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = "profile." + file.name.split(".")[1];

    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            const data = {
              image: newImageURL,
            };

            try {
              const result = await userServices.updateProfile(
                data,
                session.data?.accessToken
              );

              if (result.status === 200) {
                setLoading("");
                setProfile({
                  ...profile,
                  image: newImageURL,
                });
                setChangeImage({});
                form.reset();
                setToaster({
                  variant: "success",
                  message: "Success change avatar",
                });
              } else {
                setLoading("");
              }
            } catch (error) {
              setLoading("");
            }
          } else {
            setLoading("");
            setChangeImage({});
            setToaster({
              variant: "danger",
              message: "Failed update avatar",
            });
          }
        }
      );
    }
  };

  const handleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading("password");

    const form = e.target as HTMLFormElement;

    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };

    try {
      const result = await userServices.updateProfile(
        data,
        session.data?.accessToken
      );

      if (result.status === 200) {
        setLoading("");
        form.reset();
        setToaster({
          variant: "success",
          message: "Success change password",
        });
      }
    } catch (error) {
      setLoading("");
      setToaster({
        variant: "danger",
        message: "Password not match",
      });
    }
  };

  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile Page</h1>

      <div className={styles.profile__main}>
        <div className={styles.profile__main__row}>
          <div className={styles.profile__main__row__avatar}>
            <h2 className={styles.profile__main__row__avatar__title}>Avatar</h2>
            {profile.image ? (
              <Image
                src={profile.image}
                width={150}
                height={150}
                alt="user-profile "
                priority
                className={styles.profile__main__row__avatar__image}
              />
            ) : (
              <div className={styles.profile__main__row__avatar__image}>
                {/* {profile?.fullname?.charAt(0).toUpperCase()} */}
                <Image
                  src="/default.png"
                  alt="user-profile"
                  width={150}
                  height={150}
                  className={styles.profile__main__row__avatar__image}
                />
              </div>
            )}
            <form onSubmit={handleChangeProfilePicture}>
              <label
                htmlFor="upload-image"
                className={styles.profile__main__row__avatar__label}
              >
                {changeImage.name ? (
                  <p>{changeImage.name}</p>
                ) : (
                  <>
                    <p>
                      Upload a new avatar, larger image will be resized
                      automatically
                    </p>
                    <p>
                      Maximum upload size is <b>1 MB</b>
                    </p>
                  </>
                )}
              </label>
              <input
                type="file"
                name="image"
                id="upload-image"
                className={styles.profile__main__row__avatar__input}
                onChange={(e: any) => {
                  e.preventDefault();
                  setChangeImage(e.currentTarget.files[0]);
                }}
              />
              <Button
                type="submit"
                className={styles.profile__main__row__avatar__button}
                disabled={loading === "picture"}
              >
                {loading === "picture" ? "Loading..." : "Upload"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__profile}>
            <h2 className={styles.profile__main__row__profile__title}>
              Profile
            </h2>
            <form onSubmit={handleChangeProfile}>
              <Input
                label="Fullname"
                type="text"
                name="fullname"
                defaultValue={profile.fullname}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                defaultValue={profile.email}
                disabled
              />
              <Input
                label="Role"
                type="text"
                name="role"
                defaultValue={profile.role}
                disabled
              />
              <Input
                label="Phone"
                type="number"
                name="phone"
                defaultValue={profile.phone}
                placeholder="Input your phone number"
              />
              <Button type="submit" variant="primary">
                {loading === "profile" ? "Loading..." : "Update Profile"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__password}>
            <h2>Change Password</h2>
            <form onSubmit={handleChangePassword}>
              <Input
                name="old-password"
                type="password"
                label="Old Password"
                disabled={profile.type === "google"}
                placeholder="Enter your old password"
              />
              <Input
                name="new-password"
                type="password"
                label="New Password"
                disabled={profile.type === "google"}
                placeholder="Enter your new password"
              />
              <Button
                type="submit"
                disabled={loading === "password" || profile.type === "google"}
                className={styles.profile__main__row__password__button}
              >
                {loading === "password" ? "Loading..." : "Update Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
