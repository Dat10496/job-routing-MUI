import { React, useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import { NavLink, useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Typography, Paper, alpha, Divider } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import axios from "axios";

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
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  with: 300,
  height: 500,
};

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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

function SearchParams() {
  let [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        const result = response.data;
        setStorageData(result);
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchData();
  }, []);
  const [storageData, setStorageData] = useState([]);

  return (
    <Paper elevation={24} sx={style}>
      <Search
        value={searchParams.get("filter") || ""}
        onChange={(event) => {
          let filter = event.target.value;
          if (filter) {
            setSearchParams({ filter });
          } else {
            setSearchParams({});
          }
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 0.5,
        }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>

        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Divider variant="middle" color="primary.dark" sx={{ mt: 1 }} />
      {storageData
        .filter((job) => {
          let filter = searchParams.get("filter");
          if (!filter) return "";
          let name = job.title.toLowerCase();
          return name.startsWith(filter.toLowerCase());
        })
        .map((job) => (
          <Box sx={{ flexWrap: "wrap", ml: 2 }}>
            <NavLink to={`/job/${job.id}`} key={job.id} underline="hover">
              <Typography
                sx={{ m: 0.5, color: "warning.light" }}
                variant="caption text"
              >
                {job.title}
              </Typography>
            </NavLink>
          </Box>
        ))}
    </Paper>
  );
}

export default SearchParams;
