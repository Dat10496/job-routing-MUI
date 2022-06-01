import { React, useEffect, useState } from "react";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { Alert, Container, Paper } from "@mui/material";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import EventIcon from "@mui/icons-material/Event";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

export default function JobDetail() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [storageData, setStorageData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/jobs");
        const result = response.data;
        setStorageData(result);
      } catch (error) {
        setError(error.message);
        console.log(error, "error");
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  // find job from id
  const job = storageData.find((job) => job.id === id);

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
        {loading ? (
          <LoadingScreen />
        ) : (
          <>
            {error ? (
              <Alert severity="error">{error}</Alert>
            ) : (
              <>
                {" "}
                {job && (
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
                      <LocationCityIcon sx={{ mt: 2 }} />:{" "}
                      <Chip label={job.city} />
                      <br />
                      <EventIcon />: <Chip label={job.postedDate} />
                      <br />
                      <PriceCheckIcon />: <Chip label={job.salaryHigh} />
                    </Stack>
                  </Paper>
                )}{" "}
                {!job && (
                  <Typography variant="h6">404 Job not found!</Typography>
                )}
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
}
