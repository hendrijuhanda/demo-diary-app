import { ArrowBack } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/joy";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export const SingleHeader = ({
  title,
  endContent,
}: {
  title?: string;
  endContent?: ReactNode;
}) => {
  const navigate = useNavigate();

  return (
    <div className="tw-container tw-mx-auto tw-px-4 tw-py-4">
      <div className="tw-flex tw-justify-between tw-items-center">
        <div className="tw-flex tw-items-center">
          <IconButton size="sm" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>

          <Typography level="h2" fontSize="lg" sx={{ ml: 2 }}>
            {title}
          </Typography>
        </div>

        {endContent}
      </div>
    </div>
  );
};
