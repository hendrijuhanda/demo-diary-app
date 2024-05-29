import { useAuth } from "@/stores/auth";
import { useInitial } from "@/stores/initial";
import { useLayout } from "@/stores/layout";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

export const Sign = () => {
  const { hideScreenLoader } = useLayout(useShallow((state) => ({ ...state })));
  const { init } = useInitial(useShallow((state) => ({ ...state })));
  const { token } = useAuth(useShallow((state) => ({ ...state })));
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    (async () => {
      await init();

      hideScreenLoader();
    })();
  }, [init, hideScreenLoader]);

  return (
    <div>
      <div className="tw-w-full tw-h-screen tw-flex tw-flex-col tw-justify-center">
        <div className="tw-w-full tw-h-[600px] tw-max-h-screen tw-flex tw-flex-col">
          <div className="tw-flex-grow"></div>

          <div className="tw-w-[300px] tw-mx-auto tw-max-w-full tw-mb-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
