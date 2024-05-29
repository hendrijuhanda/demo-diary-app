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
import { SnackbarKey, closeSnackbar, useSnackbar } from "notistack";
import { FormEvent, useCallback, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";

interface FormInput {
  value: string;
  isError: boolean;
  errorMessage: "";
}

export const Register = () => {
  const { registerRequest } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [formContext, setFormContext] = useState<{ [key: string]: FormInput }>({
    name: {
      value: "",
      isError: false,
      errorMessage: "",
    },
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
    password_confirmation: {
      value: "",
      isError: false,
      errorMessage: "",
    },
  });

  const FormSchema = z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email format"),
      password: z
        .string()
        .min(6, "Password must contain at least 8 characters"),
      password_confirmation: z
        .string()
        .min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: "Passwords don't match",
      path: ["password_confirmation"],
    });

  const [isPasswordHidden, setPasswordHidden] = useState<boolean>(true);
  const [isPasswordConfHidden, setPasswordConfHidden] = useState<boolean>(true);

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerRequest,
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
        name: formContext.name.value,
        email: formContext.email.value,
        password: formContext.password.value,
        password_confirmation: formContext.password_confirmation.value,
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
            navigate("/login", { replace: true });

            const sb: SnackbarKey = enqueueSnackbar(
              "Account successfully registered! Please login with your credential.",
              snackbarOptions({
                variant: "success",
                autoHideDuration: null,
                SnackbarProps: {
                  onClick: () => closeSnackbar(sb),
                },
              })
            );
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
      <form onSubmit={handleFormSubmit}>
        <div className="tw-mb-2">
          <FormControl error={formContext.name.isError}>
            <Input
              value={formContext.name.value}
              name="name"
              onChange={handleInputChange}
              placeholder="Fullname"
            />

            <FormHelperText>{formContext.name.errorMessage}</FormHelperText>
          </FormControl>
        </div>

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

        <div className="tw-mb-2">
          <FormControl error={formContext.password_confirmation.isError}>
            <Input
              type={isPasswordConfHidden ? "password" : "text"}
              value={formContext.password_confirmation.value}
              name="password_confirmation"
              onChange={handleInputChange}
              placeholder="Password confirmation"
              endDecorator={
                <IconButton
                  size="sm"
                  variant="plain"
                  onClick={() => setPasswordConfHidden((prev) => !prev)}
                >
                  {isPasswordConfHidden ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
            />

            <FormHelperText>
              {formContext.password_confirmation.errorMessage}
            </FormHelperText>
          </FormControl>
        </div>

        <div className="tw-mt-4">
          <Button
            type="submit"
            variant="soft"
            sx={{ width: "100%" }}
            loading={isPending}
          >
            Register
          </Button>
        </div>
      </form>

      <div className="tw-text-center tw-mt-8">
        <Typography>
          Already have an account?{" "}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </div>
    </>
  );
};
