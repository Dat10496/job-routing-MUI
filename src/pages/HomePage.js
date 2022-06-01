import { React, useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import { Box, Grid, Pagination, PaginationItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import apiService from "../app/apiService";

function HomePages() {
  const limit = 5;
  const { page } = useParams();
  const num1 = limit * (page - 1);
  const num2 = limit * page;

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
  const [storageData, setStorageData] = useState([]);

  return (
    <>
      <Grid container spacing={0.5}>
        {storageData.slice(num1, num2).map((job) => (
          <Grid key={job.id} item xs={12} md={4}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", m: 1 }}>
        <Pagination
          count={Math.ceil(storageData.length / limit)}
          color="primary"
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/page/${item.page}`}
              {...item}
            />
          )}
        />
      </Box>
    </>
  );
}

export default HomePages;
