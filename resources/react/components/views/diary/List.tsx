import { ContentSkeleton } from "@/components/layouts/ContentSkeleton";
import { Diary, diaryTransformer, useDiary } from "@/stores/diary";
import { snackbarOptions } from "@/utils/snackbar-options";
import { Delete } from "@mui/icons-material";
import {
    AspectRatio,
    Card,
    CardContent,
    CardOverflow,
    Divider,
    IconButton,
    Typography,
} from "@mui/joy";
import { useMutation, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";
import { DiaryDeleteModal } from "./DeleteModal";

const DiaryItem = ({
  diary,
  deleteClick,
}: {
  diary: Diary;
  deleteClick: (id: number) => void;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="tw-cursor-pointer"
      onClick={() => navigate(`/diary/${diary.id}`)}
    >
      <Card variant="outlined">
        <CardOverflow>
          <AspectRatio ratio="2">
            <img src={diary.pictureUrl} loading="lazy" alt="" />
          </AspectRatio>
        </CardOverflow>

        <CardContent>
          <Typography level="title-md">{diary.title}</Typography>
          <Typography level="body-sm">{diary.truncatedDetail}</Typography>
        </CardContent>

        <CardOverflow>
          <Divider inset="context" />
          <CardContent
            orientation="horizontal"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography
              level="body-xs"
              fontWeight="md"
              textColor="text.secondary"
            >
              {diary.isEdited
                ? `${diary.updatedAtFormatted} (updated)`
                : diary.createdAtFormatted}
            </Typography>

            <IconButton
              size="sm"
              color="danger"
              onClick={(event) => {
                event.stopPropagation();

                deleteClick(diary.id);
              }}
            >
              <Delete />
            </IconButton>
          </CardContent>
        </CardOverflow>
      </Card>
    </div>
  );
};

export const DiaryList = () => {
  const { showBoundary } = useErrorBoundary();
  const { fetchRequest, deleteRequest } = useDiary();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>(undefined);

  const { status, data, error, refetch } = useQuery({
    queryKey: ["diaries"],
    queryFn: () => fetchRequest(),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["diary-delete", modalData],
    mutationFn: () => deleteRequest(modalData as number),
  });

  useEffect(() => {
    if (error) {
      showBoundary(error);
    }
  }, [error]);

  const list: { items: Diary[]; pagination: any } = useMemo(() => {
    const content = data?.data?.data;

    return {
      items: (content?.items || []).map((item: any) => diaryTransformer(item)),
      pagination: content?.pagination,
    };
  }, [data]);

  const handleDeleteClick = (id: number) => {
    setModalData(id);
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
      {status === "pending" ? (
        <div>
          <ContentSkeleton />
        </div>
      ) : (
        <div>
          {!list.items.length ? (
            <div className="tw-text-center tw-py-16">
              <Typography textColor="text.tertiary">
                There is no diary entry.
              </Typography>
            </div>
          ) : (
            list.items.map((item, index: number) => {
              return (
                <div
                  key={index}
                  className={index !== list.items.length - 1 ? "tw-mb-4" : ""}
                >
                  <DiaryItem diary={item} deleteClick={handleDeleteClick} />
                </div>
              );
            })
          )}
        </div>
      )}

      <DiaryDeleteModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        loading={isPending}
        handleDelete={handleDelete}
      />
    </>
  );
};
