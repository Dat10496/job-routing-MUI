import * as React from "react";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import jobs from "../jobs.json";
import { useParams } from "react-router-dom";
import { Container, Paper } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EventIcon from "@mui/icons-material/Event";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";

export default function JobDetail() {
  const { id } = useParams();

  const hihi = jobs.length
  console.log(hihi)

  
  

  // find job from id
  const job = jobs.find((job) => job.id === id);

  if (!job)
    return (
      <Typography gutterBottom variant="h5" component="div">
        Job not Found!!
      </Typography>
    );
  return (
    <>
      <Container
        sx={{
          width: "100%",
          maxWidth: 360,
          borderRadius: 3,
          p: 1,
          mt: 2,
        }}
      >
        <Paper sx={{ my: 3, mx: 2, p: 1 }} elevation={24}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                {job.title}
              </Typography>
            </Grid>
          </Grid>
          <Typography color="text.secondary" variant="body2">
            {job.description}
          </Typography>
          <Divider variant="middle" />
          <Stack
            direction="column"
            spacing={0.5}
            sx={{
              display: "block",
              alignItems: "center",
              padding: 0.5,
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <LocationCityIcon sx={{ mt: 2 }} />: <Chip label={job.city} />
            <br />
            <EventIcon />: <Chip label={job.postedDate} />
            <br />
            <PriceCheckIcon />: <Chip label={job.salaryHigh} />
          </Stack>
        </Paper>
      </Container>
    </>
  );
}
