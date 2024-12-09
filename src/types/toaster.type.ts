import { Dispatch, SetStateAction } from "react";

export type ToasterType = {
  toaster?: {
    variant?: string;
    message?: string;
  };
  setToaster: Dispatch<SetStateAction<{}>>;
};
