import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePages from "../pages/HomePage";
import JobDetail from "../components/JodDetail";
import SignInPage from "../pages/SignInPage";

const Router = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePages />} />
        <Route path="/page/:page" element={<HomePages />} />
        <Route path="/jobs/:id" element={<JobDetail />} />
        <Route path="/log-in" element={<SignInPage />} />
      </Routes>
    </>
  );
};

export default Router;

/* "/?page=2" HomePage
   "/job/:id" JobCard
   "/login" Login

*/
