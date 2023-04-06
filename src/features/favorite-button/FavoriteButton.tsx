import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, IconButton } from "@mui/material";
import { ReactElement } from "react";
import { Game } from "src/models/GameModel";
import {
  addFavoriteGame,
  removeFavoriteGame,
} from "src/state/slices/FavoriteGamesSlice";
import { useTypedDispatch, useTypedSelector } from "src/state/store";

const FavoriteButton = (props: { game: Game; text?: string }): ReactElement => {
  const { game, text } = props;
  const { list } = useTypedSelector((state) => state.favoriteGames);
  const dispatch = useTypedDispatch();

  const isCurrentFavorite = list.find((favItem) => favItem.id === game.id);

  const currentIcon = isCurrentFavorite ? (
    <FavoriteIcon color="error" />
  ) : (
    <FavoriteBorderIcon color="error" />
  );

  const buttonText = isCurrentFavorite ? "Remove Favorite" : text;

  const handleOnClick = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
    if (isCurrentFavorite) {
      dispatch(removeFavoriteGame(game.id));
    } else {
      dispatch(addFavoriteGame(game));
    }
  };

  if (text) {
    return (
      <Button
        data-testid={`favorite-link-${game.id}`}
        color="inherit"
        variant="text"
        size="small"
        startIcon={currentIcon}
        onClick={handleOnClick}
        sx={{
          textTransform: "none",
          textAlign: "left",
          lineHeight: 1.4,
          justifyContent: "flex-start",
        }}
      >
        {buttonText}
      </Button>
    );
  }

  return (
    <IconButton
      data-testid={`favorite-button-${game.id}`}
      color="error"
      sx={{ position: "absolute", right: 0 }}
      onClick={handleOnClick}
    >
      {currentIcon}
    </IconButton>
  );
};

export default FavoriteButton;
