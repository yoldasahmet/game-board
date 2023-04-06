import {
  Box,
  Button,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import FavoriteButton from "src/features/favorite-button/FavoriteButton";
import PageLayout from "../_layout/PageLayout";

const DetailPage = (): ReactElement => {
  const { state } = useLocation();
  const { game } = state;

  return (
    <>
      <PageLayout>
        {game ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                <Typography variant="h3" data-testid={`game-title-label`}>
                  {game?.name}
                </Typography>

                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                  <Rating
                    name="rating"
                    defaultValue={game?.average_user_rating}
                    size="large"
                    readOnly
                    precision={0.1}
                    max={5}
                  />
                </Stack>

                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={{ xs: 1, md: 3 }}
                >
                  <Button variant="outlined">{game?.playtime + " mins"}</Button>
                  <Button variant="outlined">{game.year_published}</Button>
                  <Button variant="outlined">
                    {game?.players + " Players"}
                  </Button>
                </Stack>
                <Typography
                  data-testid={`game-desc-label`}
                  variant="body1"
                  component="div"
                  sx={{ paddingTop: 2, paddingBottom: 2 }}
                >
                  {game?.description_preview}
                </Typography>

                <Box sx={{ pb: 1.5 }}>
                  <FavoriteButton text="Add Favorite" game={game} />
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <img
                  src={`${game.image_url}`}
                  alt={""}
                  loading="lazy"
                  width="100%"
                />
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </PageLayout>
    </>
  );
};

export default DetailPage;
