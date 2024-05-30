import { AspectRatio, Skeleton, Typography } from "@mui/joy";

export const ContentSkeleton = () => {
  return (
    <>
      <AspectRatio ratio="21/9" sx={{ mb: 2 }}>
        <Skeleton loading={true} variant="overlay" animation="wave">
          <img
            alt=""
            src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
          />
        </Skeleton>
      </AspectRatio>
      <Typography>
        <Skeleton loading={true} animation="wave">
          Lorem ipsum is placeholder text commonly used in the graphic, print,
          and publishing industries.
        </Skeleton>
      </Typography>
    </>
  );
};
