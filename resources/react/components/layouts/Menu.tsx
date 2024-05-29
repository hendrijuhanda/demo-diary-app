import { Add, Book, Home } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/joy";
import { ComponentType } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MenuItem = (props: {
  icon: ComponentType<any>;
  label: string;
  to: string;
  active: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="tw-flex tw-flex-col tw-items-center"
      onClick={() => navigate(props.to)}
    >
      <div className="tw-text-lg">
        <props.icon color={props.active ? "primary" : "neutral"} />
      </div>

      <div>
        <Typography fontSize="sm" color={props.active ? "primary" : "neutral"}>
          {props.label}
        </Typography>
      </div>
    </div>
  );
};

export const Menu = () => {
  const location = useLocation();

  return (
    <nav className="tw-w-[360px] tw-max-w-full tw-flex tw-justify-center tw-items-center tw-py-6">
      <div className="tw-mx-6 ">
        <MenuItem
          icon={Home}
          label="Home"
          to="/"
          active={location.pathname === "/"}
        />
      </div>

      <div className="tw-mx-10">
        <IconButton
          color="primary"
          variant="solid"
          size="lg"
          component={Link}
          to="/diary/add"
        >
          <Add />
        </IconButton>
      </div>

      <div className="tw-mx-6">
        <MenuItem
          icon={Book}
          label="Diaries"
          to="/diaries"
          active={location.pathname === "/diaries"}
        />
      </div>
    </nav>
  );
};
