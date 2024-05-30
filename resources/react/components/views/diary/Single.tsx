import { ContentSkeleton } from "@/components/layouts/ContentSkeleton";
import { SingleHeader } from "@/components/layouts/SingleHeader";
import { Diary, diaryTransformer, useDiary } from "@/stores/diary";
import { snackbarOptions } from "@/utils/snackbar-options";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/joy";
import { useMutation, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { Link, useParams } from "react-router-dom";
import { DiaryDeleteModal } from "./DeleteModal";

export const DiarySingle = () => {
  const { showRequest, deleteRequest } = useDiary();
  const params = useParams();
  const { showBoundary } = useErrorBoundary();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const { status, data, error, refetch } = useQuery({
    queryKey: ["diary-show", params.id],
    queryFn: () => showRequest(Number(params.id)),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["diary-delete", params.id],
    mutationFn: () => deleteRequest(Number(params.id)),
  });

  const diary: Diary | null = useMemo(() => {
    return data ? diaryTransformer(data?.data?.data) : null;
  }, [data]);

  useEffect(() => {
    if (error) {
      showBoundary(error);
    }
  }, [error]);

  const handleDeleteClick = () => {
    setModalOpen(true);
  };

  const handleDelete = useCallback(() => {
    mutateAsync()
      .then(() => {
        setModalOpen(false);

        enqueueSnackbar(
          "Diary entry deleted!",
          snackbarOptions({ variant: "success" })
        );

        refetch();
      })
      .catch((error: any) =>
        enqueueSnackbar(error?.message, snackbarOptions({ variant: "error" }))
      );
  }, [mutateAsync]);

  return (
    <>
      <SingleHeader
        endContent={
          <div className="tw-flex tw-items-center">
            <div className="tw-mr-2">
              <IconButton
                color="primary"
                variant="soft"
                size="sm"
                component={Link}
                to={`/diary/edit/${params.id}`}
              >
                <Edit />
              </IconButton>
            </div>

            <div>
              <IconButton
                color="danger"
                variant="solid"
                size="sm"
                onClick={handleDeleteClick}
              >
                <Delete />
              </IconButton>
            </div>
          </div>
        }
      />

      <div className="tw-container tw-px-4 tw-mx-auto">
        {status === "pending" ? (
          <div>
            <ContentSkeleton />
          </div>
        ) : (
          diary && (
            <div className="tw-flex tw-flex-col tw-items-stretch tw-relative">
              <div className="tw-absolute tw-w-full tw-h-[240px] tw-top-0 tw-left-0">
                <img
                  className="tw-w-full tw-h-full tw-object-cover tw-rounded"
                  style={{
                    maskImage: "linear-gradient(to top, transparent, white)",
                  }}
                  src={diary.pictureUrl}
                />
              </div>

              <div className="tw-text-center tw-mt-[200px] tw-mb-8 tw-z-[1]">
                <Typography level="h3" fontSize="xl">
                  {diary.title}
                </Typography>

                <div className="tw-italic">
                  <Typography fontSize="sm" textColor="text.tertiary">
                    {diary.createdAtFormatted}
                  </Typography>
                </div>
              </div>

              <div className="tw-z-[1]">
                <Typography>{diary.detail}</Typography>
              </div>
            </div>
          )
        )}
      </div>

      <DiaryDeleteModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        loading={isPending}
        handleDelete={handleDelete}
      />
    </>
  );
};
