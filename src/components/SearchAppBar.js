import { React, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SearchParams from "./SearchParams";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useLocation } from "react-router-dom";
import { Button, InputBase, Modal, Paper } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  with: 300,
  height: 400,
};

export default function SearchAppBar() {
  const location = useLocation();
  const [openSearch, setOpenSearch] = useState(false);
  const handleOpenSearch = () => setOpenSearch(true);
  const handleCloseSearch = () => setOpenSearch(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Job Route
          </Typography>
          <Search onClick={handleOpenSearch}>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Modal
            open={openSearch}
            onClose={handleCloseSearch}
            sx={{
              width: 500,
              height: 500,
              position: "absolute",
              left: 400,
              top: 80,
            }}
          >
            <Paper elevation={24} sx={style}>
              <SearchParams />
            </Paper>
          </Modal>
          <Box
            sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}
          >
            <Button state={{ from: location }} component={Link} to={"/log-in"}>
              <LoginIcon sx={{ mr: 1 }}></LoginIcon>
              {<Typography>Sign In</Typography>}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
