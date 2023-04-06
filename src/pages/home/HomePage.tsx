import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { ReactElement, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "src/features/favorite-button/FavoriteButton";
import { useGetGamesQuery } from "src/services/GameService";
import { updateParams } from "src/state/slices/SearchParamsSlice";
import { useTypedDispatch, useTypedSelector } from "src/state/store";
import PageLayout from "../_layout/PageLayout";

const HomePage = (): ReactElement => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { players, playtime, page } = useTypedSelector(
    (state) => state.searchParams
  );

  const {
    data: gameList,
    isLoading: isGameListLoading,
    isFetching: isGameListFetching,
  } = useGetGamesQuery({
    players,
    playtime,
    page,
  });

  const onScroll = () => {
    const scrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;
    if (scrolledToBottom && !isGameListFetching) {
      dispatch(
        updateParams({
          page: (page || 0) + 1,
        })
      );
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);

    return function () {
      document.removeEventListener("scroll", onScroll);
    };
  }, [page, isGameListFetching]);

  return (
    <PageLayout>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, marginTop: 2 }}
        component="div"
      >
        All Games
      </Typography>

      {gameList?.games?.length === 0 && !isGameListLoading ? (
        <Typography gutterBottom variant="h5" component="div">
          No item
        </Typography>
      ) : (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {gameList?.games?.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={3} key={item.id + index}>
              <Card
                data-testid={`game-card-${item.id}`}
                onClick={() => navigate("/detail", { state: { game: item } })}
              >
                <CardActionArea component={"a"}>
                  <FavoriteButton game={item} />

                  <CardMedia
                    component="img"
                    image={`${item.image_url}`}
                    alt="poster"
                    height={300}
                  />
                  <CardContent sx={{ minHeight: 135 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body1" color={"GrayText"}>
                      {"Publisher: " + item.primary_publisher?.name}
                    </Typography>
                    <Stack
                      direction={{ xs: "column", sm: "column", md: "row" }}
                      spacing={1}
                      mt={1}
                    >
                      <Chip
                        icon={<AccessTimeIcon />}
                        label={item.playtime + " min."}
                        variant="outlined"
                      />
                      <Chip
                        icon={<GroupIcon />}
                        label={item.players}
                        variant="outlined"
                      />
                    </Stack>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {isGameListFetching ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <></>
      )}
    </PageLayout>
  );
};

export default HomePage;
