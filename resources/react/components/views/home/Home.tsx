import { useAuth } from "@/stores/auth";
import { Typography } from "@mui/joy";
import { useShallow } from "zustand/react/shallow";

export const Home = () => {
  const { user } = useAuth(
    useShallow((state) => ({
      user: state.user,
    }))
  );

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-relative">
      <div className="tw-absolute tw-w-full tw-h-[240px] tw-top-0 tw-left-0">
        <img
          className="tw-w-full tw-h-full tw-object-cover tw-rounded"
          style={{
            maskImage: "linear-gradient(to top, transparent, white)",
          }}
          src="/userbg.jpg"
        />
      </div>

      <div className="tw-w-24 tw-h-24 tw-rounded-full tw-overflow-hidden tw-bg-white tw-border-2 tw-border-white tw-mb-4 tw-mt-36 tw-z-[1]">
        <img className="tw-w-full tw-h-full" src="/user.jpg" />
      </div>

      <div className="tw-flex tw-flex-col tw-items-center tw-mb-8 tw-z-[1]">
        <Typography level="h2" fontSize="lg">
          {user?.name}
        </Typography>

        <div className="tw-italic">
          <Typography fontSize="sm">{user?.email}</Typography>
        </div>
      </div>

      <div className="tw-text-center tw-z-[1]">
        <Typography textColor="text.tertiary">
          In the quiet symphony of life, you are a delicate note, a whisper in
          the wind. Your eyes, like stars, hold galaxies of dreams. With a heart
          as deep as the ocean, you love fiercely. You are the sunrise after the
          night, a beacon of hope, woven with courage and grace.
        </Typography>
      </div>
    </div>
  );
};
