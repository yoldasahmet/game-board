import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchParamsState } from "src/models/SearchModel";
import GameService from "src/services/GameService";
import { updateParams } from "src/state/slices/SearchParamsSlice";
import { useTypedDispatch, useTypedSelector } from "src/state/store";
import Combobox from "../combobox/ComboBox";

const Header = (): ReactElement => {
  const { count } = useTypedSelector((state) => state.favoriteGames);
  const { players, playtime } = useTypedSelector((state) => state.searchParams);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useTypedDispatch();

  const handleSelect = (
    e: SelectChangeEvent<string>,
    param: SearchParamsState
  ) => {
    e.preventDefault();
    dispatch(GameService.util.resetApiState());
    dispatch(updateParams(param));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default">
        <Container maxWidth="xl" sx={{ alignSelf: "center" }}>
          <Toolbar sx={{ padding: 0, justifyContent: "space-between" }}>
            <Stack direction={"row"}>
              <IconButton
                data-testid="logo-button"
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 1 }}
                onClick={() => navigate("/")}
              >
                <VideogameAssetIcon fontSize="large" color="primary" />
              </IconButton>
              <Typography
                variant="h4"
                sx={{
                  display: { xs: "none", sm: "block" },
                  letterSpacing: 1,
                  color: "#d13330",
                  marginTop: 1,
                }}
              >
                game
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  display: { xs: "none", sm: "block" },
                  letterSpacing: 1,
                  color: "#2d85cc",
                  marginTop: 1,
                }}
              >
                board
              </Typography>
            </Stack>
            {location.pathname === "/" && (
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Combobox
                  id="players-select"
                  title={"Min Players"}
                  value={String(players && players > 0 ? players : "")}
                  list={[
                    { key: "None", value: "" },
                    { key: "1 Player", value: "1" },
                    { key: "2 Players", value: "2" },
                    { key: "3 Players", value: "3" },
                    { key: "4 Players", value: "4" },
                    { key: "5 Players", value: "5" },
                    { key: "6 Players", value: "6" },
                    { key: "7 Players", value: "7" },
                    { key: "8 Players", value: "8" },
                  ]}
                  onChange={(e: SelectChangeEvent<string>): void => {
                    handleSelect(e, {
                      players: Number(e.target.value),
                      page: 0,
                    });
                  }}
                />
                <Combobox
                  id="playtime-select"
                  title="Max Playtime"
                  value={String(playtime && playtime > 0 ? playtime : "")}
                  list={[
                    { key: "None", value: "" },
                    { key: "15 Min", value: "15" },
                    { key: "30 Min", value: "30" },
                    { key: "45 Min", value: "45" },
                    { key: "60 Min", value: "60" },
                    { key: "90 Min", value: "90" },
                    { key: "120 Min", value: "120" },
                  ]}
                  onChange={(e: SelectChangeEvent<string>): void => {
                    handleSelect(e, {
                      playtime: Number(e.target.value),
                      page: 0,
                    });
                  }}
                />
              </Box>
            )}

            <IconButton
              data-testid="favorite-icon-button"
              color="default"
              onClick={() => navigate("/favorite")}
            >
              <Badge
                data-testid="favorite-badge"
                badgeContent={count}
                color="error"
              >
                <FavoriteBorderIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
