import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePages from "../pages/HomePage";
import JobDetail from "./JodDetail";

import FormSignIn from "../form/FormSignIn";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/page/:page" element={<HomePages />} />
        <Route path="/log-in" element={<FormSignIn />} />
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
    </>
  );
};

export default Router;

/* "/?page=2" HomePage
   "/job/:id" JobCard
   "/login" Login

*/
