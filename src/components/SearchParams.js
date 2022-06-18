import { React, useEffect, useState } from "react";
import InputBase from "@mui/material/InputBase";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Paper, alpha, Divider, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/system";
import apiService from "../app/apiService";
import { Link } from "react-router-dom";

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
  top: "45%",
  left: "50%",
  backgroundColor: "#4b4f4f",
  color: "white",
  transform: "translate(-50%, -50%)",
  with: 300,
  height: 550,
  p: 0,
  textDecoration: "none",
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
  const [storageData, setStorageData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.get("/jobs");
        const result = response.data;
        setStorageData(result);
      } catch (error) {
        console.log(error, "error");
      }
    };

    fetchData();
  }, []);

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
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          p: 1,
          ml: 1,
          flexDirection: "column",
          textDecoration: "none",
          color: "white",
        }}
      >
        {storageData
          .filter((job) => {
            let filter = searchParams.get("filter");
            if (!filter) return "";
            let name = job.title.toLowerCase();
            return name.startsWith(filter.toLowerCase());
          })
          .map((job) => (
            <Typography
              key={job.id}
              component={Link}
              to={`/movie/${job.id}`}
              sx={{ textDecoration: "none", color: "white" }}
            >
              {job.title}
            </Typography>
          ))}
      </Box>
    </Paper>
  );
}

export default SearchParams;
