import { Button, Modal, Sheet, Typography } from "@mui/joy";
import { Dispatch, SetStateAction } from "react";

export const DiaryDeleteModal = ({
  isModalOpen,
  setModalOpen,
  loading,
  handleDelete,
}: {
  isModalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  handleDelete: () => void;
}) => {
  return (
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
          You are about to delete this diary entry. Are you sure?
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
            <Button color="danger" loading={loading} onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Sheet>
    </Modal>
  );
};
