import React from "react";
import jobs from "../jobs.json";
import JobCard from "../components/JobCard";
import { Grid, Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";

function HomePages({ num1, num2 }) {
  const navigate = useNavigate();
  const jobPage = jobs.length
  console.log(jobPage)


  return (
    <>
      <Grid container spacing={0.5}>
        {jobs.slice(num1, num2).map((job) => (
          <Grid key={job.id} item xs={12} md={4}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      <Grid sx={{ display: "flex", justifyContent: "center", m: 1 }}>
        <Pagination
          count={jobPage / 5}
          color="primary"
          onChange={(e, p) => navigate(`/page/${p}`)}
        />
      </Grid>
    </>
  );
}

export default HomePages;
