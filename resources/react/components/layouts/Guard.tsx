import { useAuth } from "@/stores/auth";
import { useInitial } from "@/stores/initial";
import { useLayout } from "@/stores/layout";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { ComponentType, useEffect } from "react";
import { useErrorBoundary } from "react-error-boundary";

import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

interface GuardInterface {
  component: ComponentType<any>;
  [rest: string]: any;
}

export const Guard = (props: GuardInterface) => {
  const { hideScreenLoader } = useLayout();
  const { setUser, sessionRequest } = useAuth();
  const { token } = useAuth(useShallow((state) => ({ token: state.token })));
  const { init } = useInitial();
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  const { status, isSuccess, error, data } = useQuery({
    queryKey: ["session"],
    queryFn: sessionRequest,
    enabled: !!token,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (status === "success") {
      (async () => {
        setUser((data as AxiosResponse["data"]).data);

        await init();

        hideScreenLoader();
      })();
    } else if (status === "error") {
      showBoundary(error);
    }
  }, [status, data, error]);

  return isSuccess && <props.component {...props.rest} />;
};
