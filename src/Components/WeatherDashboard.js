import React, { useState } from "react";
import { Typography, Paper, Box } from "@mui/material";
import { styled } from "@mui/system";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import ForecastCard from "./ForecastCard";

// Styled Box with background animation
const AnimatedBox = styled(Box)({
//   position: "relative",
//   overflow: "hidden",
//   padding: "20px",
//   marginBottom: "20px",
//   borderRadius: "8px",
//   background: "linear-gradient(135deg, #f3f4f6 25%, #e0e7ff 75%)",
//   backgroundSize: "200% 200%",
//   animation: "gradientAnimation 10s ease infinite",
//   "@keyframes gradientAnimation": {
//     "0%": {
//       backgroundPosition: "0% 0%",
//     },
//     "50%": {
//       backgroundPosition: "100% 100%",
//     },
//     "100%": {
//       backgroundPosition: "0% 0%",
//     },
//   },
});

const AnimatedTypography = styled(Typography)({
  transition: "all 0.5s ease",
});

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState("");
  const [forecastData, setForecastData] = useState("");

  const handleWeatherDataFetched = (weather, forecast) => {
    setWeatherData(weather);
    setForecastData(forecast);
  };
  

  

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f0f2f5", padding: 2 }}
    >
      <AnimatedBox
        sx={{
          maxWidth: "1000px",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <Paper
          elevation={1}
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "8px",
            backgroundColor: "#F0F8FF"
          }}
        >
          <AnimatedTypography variant="h5" component="div" align="center" style={{fontSize: "40px" }}>
             Weather Dashboard
          </AnimatedTypography>
          
          <Box my={2} sx={{ width: "100%" }}>
            <SearchBar onWeatherDataFetched={handleWeatherDataFetched} />
          </Box>
          {weatherData && <WeatherCard weatherData={weatherData} />}
          {forecastData && <ForecastCard forecastData={forecastData} />}
        </Paper>
      </AnimatedBox>
    </Box>
  );
};

export default WeatherDashboard;
