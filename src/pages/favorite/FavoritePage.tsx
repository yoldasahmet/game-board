import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../../features/favorite-button/FavoriteButton";
import { useTypedSelector } from "../../state/store";
import PageLayout from "../_layout/PageLayout";

const FavoritePage = (): ReactElement => {
  const navigate = useNavigate();

  const { count, list } = useTypedSelector((state) => state.favoriteGames);

  return (
    <PageLayout>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, marginTop: 2 }}
        component="div"
      >
        {`${count} Favorite ${count > 1 ? "Games" : "Game"}`}
      </Typography>
      <Grid container spacing={2}>
        {list.map((gameItem) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={gameItem.id}>
            <Card
              data-testid={`game-card-${gameItem.id}`}
              sx={{ display: "flex", height: 220 }}
              onClick={() => navigate("/detail", { state: { game: gameItem } })}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {gameItem.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {gameItem.description_preview?.length > 45
                      ? gameItem.description_preview.substring(0, 45) + "..."
                      : gameItem.description_preview}
                  </Typography>
                  <ButtonGroup variant="text">
                    <Button>{gameItem.average_user_rating?.toFixed(1)}</Button>
                    <Button>{gameItem.year_published}</Button>
                    <Button>{gameItem.primary_publisher?.name}</Button>
                  </ButtonGroup>
                </CardContent>

                <Box sx={{ pl: 1.8, pb: 1.5 }}>
                  <FavoriteButton text="Add Favorite" game={gameItem} />
                </Box>
              </Box>

              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={`${gameItem.image_url}`}
                alt="poster"
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
};

export default FavoritePage;
