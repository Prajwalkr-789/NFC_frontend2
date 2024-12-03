import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

const ExtraPage = () => {
  React.useEffect(() => {
    window.location.href = "/Extra.html";
  }, []);
  return null; // Render nothing as we're redirecting
};

export default ExtraPage;
