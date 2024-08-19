import MemberLayout from "@/components/layouts/MemberLayout";
import React from "react";
import styles from "./Profile.module.scss";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Image from "next/image";

export default function ProfileMemberView({ profile }: any) {
  console.log(profile);

  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile Page</h1>

      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
          <Image
            src={profile.image}
            width={200}
            height={200}
            alt="user-profile "
          />
          <label
            htmlFor="upload-image"
            className={styles.profile__main__avatar__label}
          >
            <p>
              Upload a new avatar, larger image will be resized automatically
              <br />
            </p>
            <p>
              Maximum upload size is <b>1 MB</b>
            </p>
          </label>
          <input
            type="file"
            name="image"
            id="upload-image"
            className={styles.profile__main__avatar__input}
          />
        </div>
        <div className={styles.profile__main__detail}>
          <form action="">
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
            />
            <Input
              label="Phone"
              type="number"
              name="phone"
              defaultValue={profile.phone}
            />
            {/* <Input
            label="Password"
            type="password"
            name="password"
            defaultValue={profile.password}
            /> */}
            <Button type="submit" variant="primary">
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
}
