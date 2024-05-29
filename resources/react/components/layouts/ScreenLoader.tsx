import { useLayout } from "@/stores/layout";
import { LinearProgress } from "@mui/joy";
import { useShallow } from "zustand/react/shallow";

export const ScreenLoader = () => {
  const { isScreenLoaderShown } = useLayout(
    useShallow((state) => ({ ...state }))
  );

  return (
    isScreenLoaderShown && (
      <div className="tw-fixed tw-top-0 tw-left-0 tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center tw-bg-white tw-z-10">
        <div className="tw-w-[100px] tw-mx-auto">
          <LinearProgress />
        </div>
      </div>
    )
  );
};
