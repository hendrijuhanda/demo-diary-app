import { useAuth } from "@/stores/auth";
import { snackbarOptions } from "@/utils/snackbar-options";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    Input,
    Link,
    Typography,
} from "@mui/joy";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import { FormEvent, useCallback, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";

interface FormInput {
  value: string;
  isError: boolean;
  errorMessage: "";
}

export const Login = () => {
  const { loginRequest } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [formContext, setFormContext] = useState<{ [key: string]: FormInput }>({
    email: {
      value: "",
      isError: false,
      errorMessage: "",
    },
    password: {
      value: "",
      isError: false,
      errorMessage: "",
    },
  });

  const FormSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(1, "Password is required"),
  });

  const [isPasswordHidden, setPasswordHidden] = useState<boolean>(true);

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginRequest,
  });

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;

    setFormContext((prev) => ({
      ...prev,
      [target.name]: {
        ...prev[target.name],
        value: target.value,
      },
    }));
  };

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const inputs = {
        email: formContext.email.value,
        password: formContext.password.value,
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
            navigate("/", { replace: true });
          })
          .catch((error: AxiosError) => {
            let message = error.message;

            if (error.response?.status === 401) {
              message = "Your credential didn't match any data!";
            }

            enqueueSnackbar(message, snackbarOptions({ variant: "error" }));
          });
      }
    },
    [formContext]
  );

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="tw-mb-2">
          <FormControl error={formContext.email.isError}>
            <Input
              value={formContext.email.value}
              name="email"
              onChange={handleInputChange}
              placeholder="Email"
            />

            <FormHelperText>{formContext.email.errorMessage}</FormHelperText>
          </FormControl>
        </div>

        <div className="tw-mb-2">
          <FormControl error={formContext.password.isError}>
            <Input
              type={isPasswordHidden ? "password" : "text"}
              value={formContext.password.value}
              name="password"
              onChange={handleInputChange}
              placeholder="Password"
              endDecorator={
                <IconButton
                  size="sm"
                  variant="plain"
                  onClick={() => setPasswordHidden((prev) => !prev)}
                >
                  {isPasswordHidden ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
            />

            <FormHelperText>{formContext.password.errorMessage}</FormHelperText>
          </FormControl>
        </div>

        <div className="tw-mt-4">
          <Button
            type="submit"
            variant="soft"
            sx={{ width: "100%" }}
            loading={isPending}
          >
            Login
          </Button>
        </div>
      </form>

      <div className="tw-text-center tw-mt-8">
        <Typography>
          Don&apos;t have an account?{" "}
          <Link component={RouterLink} to="/register">
            Register
          </Link>
        </Typography>
      </div>
    </>
  );
};
