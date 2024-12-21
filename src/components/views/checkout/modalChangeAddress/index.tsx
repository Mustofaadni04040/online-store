import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import styles from "./ModalChangeAddress.module.scss";
import Input from "@/components/ui/input";
import TextArea from "@/components/ui/textArea";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";

type Proptypes = {
  profile: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  setProfile: Dispatch<SetStateAction<any>>;
  selectedAddress: number;
};

export default function ModalChangeAddress({
  profile,
  setChangeAddress,
  setSelectedAddress,
  selectedAddress,
  setProfile,
}: Proptypes) {
  const [loading, setLoading] = useState(false);
  const [isAddNewAddress, setIsAddNewAddress] = useState(false);
  const [updateAddress, setUpdateAddress] = useState<number>();
  const { setToaster } = useContext(ToasterContext);

  const handleDeleteAddress = async (id: number) => {
    const address = profile?.address;
    address.splice(id, 1);
    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setLoading(false);
        setIsAddNewAddress(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success delete address",
        });
      }
    } catch (error) {
      setLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed delete address",
      });
    }
  };

  const handleChangeMainAddress = async (id: number) => {
    const address = profile.address;

    address.map((item: { isMain: boolean }, index: number) => {
      if (index === id) {
        item.isMain = true;
      } else {
        item.isMain = false;
      }
    });
    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setLoading(false);
        setIsAddNewAddress(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success change main address",
        });
      }
    } catch (error) {
      setLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed change main address",
      });
    }
  };

  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let data;

    if (profile.address) {
      data = {
        address: [
          ...profile.address,
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: false,
          },
        ],
      };
    } else {
      data = {
        address: [
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: true,
          },
        ],
      };
    }

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setLoading(false);
        setIsAddNewAddress(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        setToaster({
          variant: "success",
          message: "Success add new address",
        });
      }
    } catch (error) {
      setLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed add new address",
      });
    }
  };

  const handleChangeAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const address = profile.address;
    const id = updateAddress || 0;
    address[id] = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
      isMain: address[id].isMain,
    };

    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setLoading(false);
        setUpdateAddress(undefined);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        setToaster({
          variant: "success",
          message: "Success update address",
        });
      }
    } catch (error) {
      setLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed update address",
      });
    }
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className={styles.modal__title}>
        {profile?.address === undefined
          ? "Add New Address"
          : "Change Shipping Address"}
      </h1>
      {profile?.address?.map((item: any, id: number) => (
        <div key={item.addressLine}>
          <div
            className={`${styles.modal__address} ${
              id === selectedAddress && styles["modal__address--active"]
            }`}
          >
            <div className={styles.modal__address__item}>
              <div
                className={styles.modal__address__item__info}
                // close modal
                onClick={() => {
                  setSelectedAddress(id);
                  setChangeAddress(false);
                }}
              >
                <p>Resipient: {item?.recipient}</p>
                <p>Phone: {item?.phone}</p>
                <p>Address: {item?.addressLine}</p>
                <p>Note: {item?.note}</p>
              </div>

              <div className={styles.modal__address__item__btn}>
                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    id === updateAddress
                      ? setUpdateAddress(undefined) // close
                      : setUpdateAddress(id)
                  }
                  className={styles.modal__address__item__btn__update}
                >
                  <i className="bx bx-pencil" />
                </button>
                {id !== selectedAddress && (
                  <>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => {
                        handleChangeMainAddress(id); // change address
                        setSelectedAddress(id); // update ui
                        setChangeAddress(false); // close modal
                      }}
                      className={styles.modal__address__item__btn__main}
                    >
                      <i className="bx bx-purchase-tag-alt" />
                    </button>
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleDeleteAddress(id)}
                      className={styles.modal__address__item__btn__delete}
                    >
                      <i className="bx bx-trash" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          {id === updateAddress && (
            <div className={styles.modal__add}>
              <form
                onSubmit={handleChangeAddress}
                className={styles.modal__add__form}
              >
                <Input
                  type="text"
                  name="recipient"
                  label="Recipient"
                  placeholder="Insert recipient"
                  defaultValue={item.recipient}
                />
                <Input
                  type="text"
                  name="phone"
                  label="Recipient Phone"
                  placeholder="Insert phone number"
                  defaultValue={item.phone}
                />
                <TextArea
                  name="addressLine"
                  label="Address Line"
                  defaultValue={item.addressLine}
                />
                <Input
                  type="text"
                  name="note"
                  label="Note Address"
                  placeholder="Insert note address"
                  defaultValue={item.note}
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className={styles.modal__add__form__btn}
                >
                  {loading ? "Loading" : "Update"}
                </Button>
              </form>
            </div>
          )}
        </div>
      ))}
      <Button
        type="button"
        className={`${
          isAddNewAddress ? styles.modal__btnCancel : styles.modal__btnAdd
        }`}
        onClick={() => setIsAddNewAddress(!isAddNewAddress)}
      >
        {isAddNewAddress ? "Cancel" : "Add new address"}
      </Button>
      {isAddNewAddress && (
        <div className={styles.modal__add}>
          <form onSubmit={handleAddAddress} className={styles.modal__add__form}>
            <Input
              type="text"
              name="recipient"
              label="Recipient"
              placeholder="Insert recipient"
            />
            <Input
              type="text"
              name="phone"
              label="Recipient Phone"
              placeholder="Insert phone number"
            />
            <TextArea name="addressLine" label="Address Line" />
            <Input
              type="text"
              name="note"
              label="Note Address"
              placeholder="Insert note address"
            />
            <Button
              type="submit"
              disabled={loading}
              className={styles.modal__add__form__btn}
            >
              {loading ? "Loading" : "Submit"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}
