import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Router } from "./Router";
import { ScreenLoader } from "./components/layouts/ScreenLoader";
import { useAuth } from "./stores/auth";

export const App = () => {
  const { initToken } = useAuth(useShallow((state) => ({ ...state })));
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    initToken();
    setIsInitialized(true);
  }, [initToken, setIsInitialized]);

  return (
    <div>
      <div className="tw-relative">
        <ScreenLoader />
      </div>

      {isInitialized && <Router />}
    </div>
  );
};
