import { React } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import { Paper } from "@mui/material";
import useAuth from "../hooks/useAuth";

export default function JobCard({ job }) {
  let { user } = useAuth();
  const location = useLocation();

  return (
    <Paper
      sx={{
        width: "100%",
        maxWidth: 380,
        p: 2,
        m: 2,
        height: 300,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
      elevation={24}
    >
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ justifyContent: "center" }}
          variant="h6"
          component="div"
        >
          {job.title}
        </Typography>
      </Box>

      <Divider variant="middle" />
      <Box sx={{ typography: "overline" }}>Skills:</Box>
      <Stack
        direction="column"
        spacing={0.4}
        m={1}
        justifyContent="inline-block"
      >
        <Chip label={job.skills[0]} color="error" />
        <Chip label={job.skills[1]} color="error" />
        <Chip label={job.skills[2]} color="error" />
      </Stack>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          state={{ from: location }}
          variant="outlined"
          component={Link}
          to={user ? `/jobs/${job.id}` : "/log-in"}
          color="warning"
        >
          LEARN MORE
        </Button>
      </Box>
    </Paper>
  );
}
