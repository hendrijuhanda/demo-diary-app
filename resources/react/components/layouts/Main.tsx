import { useAuth } from "@/stores/auth";
import { Logout } from "@mui/icons-material";
import { Button, IconButton, Modal, Sheet, Typography } from "@mui/joy";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menu } from "./Menu";

const LogoutBtn = () => {
  const { logoutRequest } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutRequest,
  });

  const handleLogout = async () => {
    await mutateAsync().catch(() => null);

    navigate("/login", { replace: true });
  };

  return (
    <>
      <IconButton onClick={() => setModalOpen(true)}>
        <Logout fontSize="small" />
      </IconButton>

      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: 4,
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <Typography id="modal-desc" textColor="text.tertiary">
            You are about to logout. Are you sure?
          </Typography>

          <div className="tw-mt-4 tw-flex tw-items-center tw-justify-end">
            <div className="tw-mr-2">
              <Button
                color="neutral"
                variant="outlined"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
            </div>

            <div>
              <Button color="danger" loading={isPending} onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </Sheet>
      </Modal>
    </>
  );
};

export const Main = () => {
  return (
    <main className="tw-h-screen tw-flex tw-flex-col tw-items-stretch">
      <div className="tw-flex-shrink-0 tw-py-4">
        <div className="tw-container tw-mx-auto tw-px-4">
          <div className="tw-flex tw-justify-between tw-items-center">
            <div>
              <Typography level="h1" fontSize="lg">
                Diary
              </Typography>
            </div>

            <LogoutBtn />
          </div>
        </div>
      </div>
      <div className="tw-flex-grow tw-overflow-y-auto tw-overflow-x-hidden">
        <div className="tw-container tw-mx-auto tw-px-4">
          <Outlet />
        </div>
      </div>
      <div className="tw-flex-shrink-0">
        <div className="tw-container tw-mx-auto tw-px-4">
          <Menu />
        </div>
      </div>
    </main>
  );
};
