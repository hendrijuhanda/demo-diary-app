import { SingleHeader } from "@/components/layouts/SingleHeader";
import { useDiary } from "@/stores/diary";
import { snackbarOptions } from "@/utils/snackbar-options";
import { HideImage, Upload } from "@mui/icons-material";
import {
    AspectRatio,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Textarea,
    styled,
} from "@mui/joy";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import {
    Dispatch,
    FormEvent,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface FormInput {
  value: string | null | File;
  isError: boolean;
  errorMessage: "";
}

const VisuallyHiddenInput = styled("input")`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const InputFileUpload = ({
  setPictureFile,
}: {
  setPictureFile: Dispatch<SetStateAction<any>>;
}) => {
  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    const file = target?.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        const base64String = e?.target?.result;

        setPictureFile({
          base64: base64String,
          file,
        });
      };

      reader.readAsDataURL(file);
    } else {
      setPictureFile({
        base64: null,
        file: null,
        error: "There is no file",
      });
    }
  };

  return (
    <Button
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="outlined"
      color="neutral"
      startDecorator={<Upload />}
    >
      Upload a picture
      <VisuallyHiddenInput type="file" onChange={handleOnChange} />
    </Button>
  );
};

export const DiaryAdd = () => {
  const navigate = useNavigate();
  const { addRequest } = useDiary();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["diary-add"],
    mutationFn: addRequest,
  });

  const [formContext, setFormContext] = useState<{ [key: string]: FormInput }>({
    title: {
      value: "",
      isError: false,
      errorMessage: "",
    },
    picture: {
      value: null,
      isError: false,
      errorMessage: "",
    },
    detail: {
      value: "",
      isError: false,
      errorMessage: "",
    },
  });

  const [pictureFile, setPictureFile] = useState<{
    base64: string | null;
    file: File | null;
    error?: string;
  } | null>(null);

  useEffect(() => {
    setFormContext((prev) => ({
      ...prev,
      picture: {
        ...prev.picture,
        value: pictureFile?.file || null,
      },
    }));
  }, [pictureFile]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;

    setFormContext((prev) => ({
      ...prev,
      [target.name]: {
        ...prev[target.name],
        value: target.value,
      },
    }));
  };

  const FormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    detail: z.string().min(1, "Detail is required"),
    picture: z.any().refine((val) => val !== null, {
      message: "Picture is required",
    }),
  });

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const inputs = {
        title: formContext.title.value,
        picture: formContext.picture.value,
        detail: formContext.title.value,
      };

      Object.keys(inputs).forEach((key) => {
        setFormContext((prev) => ({
          ...prev,
          [key]: {
            ...prev[key],
            isError: false,
            errorMessage: "",
          },
        }));
      });

      const validate = FormSchema.safeParse(inputs);

      if (!validate.success) {
        const messages = JSON.parse(validate.error.message);

        Object.keys(inputs).forEach((key) => {
          const error = messages.find((item: any) => item.path.includes(key));

          if (error) {
            setFormContext((prev) => ({
              ...prev,
              [key]: {
                ...prev[key],
                isError: true,
                errorMessage: error.message,
              },
            }));
          }
        });
      } else {
        mutateAsync(inputs)
          .then(() => {
            enqueueSnackbar(
              "Diary has been sucessfully created!",
              snackbarOptions({ variant: "success" })
            );

            navigate("/diaries", { replace: true });
          })
          .catch((error: AxiosError) => {
            enqueueSnackbar(
              error.message,
              snackbarOptions({ variant: "error" })
            );
          });
      }
    },
    [formContext]
  );

  return (
    <>
      <SingleHeader title="Add Diary" />

      <div>
        <div className="tw-container tw-mx-auto tw-px-4">
          <form onSubmit={handleFormSubmit}>
            <div className="tw-mb-2">
              <FormControl error={formContext.title.isError}>
                <FormLabel>Title</FormLabel>

                <Input
                  value={formContext.title.value as string}
                  name="title"
                  onChange={handleInputChange}
                  placeholder="Title"
                />

                <FormHelperText>
                  {formContext.title.errorMessage}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="tw-mb-2">
              <FormControl error={formContext.picture.isError}>
                <FormLabel>Picture</FormLabel>

                <AspectRatio
                  ratio="2"
                  sx={{ borderRadius: 2, mb: 2, overflow: "hidden" }}
                >
                  <div className="tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
                    {pictureFile?.base64 ? (
                      <img
                        className="tw-w-full tw-h-full tw-object-cover"
                        src={pictureFile.base64}
                      />
                    ) : (
                      <HideImage />
                    )}
                  </div>
                </AspectRatio>

                <InputFileUpload setPictureFile={setPictureFile} />

                <FormHelperText>
                  {formContext.picture.errorMessage}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="tw-mb-2">
              <FormControl error={formContext.detail.isError}>
                <FormLabel>Detail</FormLabel>

                <Textarea
                  value={formContext.detail.value as string}
                  name="detail"
                  onChange={handleInputChange}
                  placeholder="Detail"
                  minRows={4}
                />

                <FormHelperText>
                  {formContext.detail.errorMessage}
                </FormHelperText>
              </FormControl>
            </div>

            <div className="tw-mt-4">
              <Button
                type="submit"
                color="primary"
                variant="solid"
                loading={isPending}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
