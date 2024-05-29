import { OptionsObject } from "notistack";

export const snackbarOptions = (opts?: OptionsObject): OptionsObject => {
  return {
    anchorOrigin: { vertical: "top", horizontal: "center" },
    ...opts,
  };
};
