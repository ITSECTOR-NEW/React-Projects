import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
// import ThermostatIcon from "@mui/icons-material/Thermostat";
// import WhatshotIcon from "@mui/icons-material/Whatshot";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

// Styled Typography for animation
const AnimatedTypography = styled(Typography)({
  transition: "all 0.5s ease",
});

// Styled Card with background animation
const AnimatedCard = styled(Card)({
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(135deg, #f0f8ff, #e0ffff)",
  backgroundSize: "200% 200%",
  animation: "backgroundAnimation 15s ease infinite",
  borderRadius: "12px",
  "@keyframes backgroundAnimation": {
    "0%": {
      backgroundPosition: "0% 0%",
    },
    "50%": {
      backgroundPosition: "100% 100%",
    },
    "100%": {
      backgroundPosition: "0% 0%",
    },
  },
});

// Function to select the icon based on temperature
const getTemperatureIcon = (temp) => {
  if (temp > 30) {
    return <WbSunnyIcon style={{ fontSize: "2rem", color: "orange" }} />;
  } else if (temp > 15) {
    return <CloudQueueIcon style={{ fontSize: "2rem", color: "lightblue" }} />;
  } else {
    return <AcUnitIcon style={{ fontSize: "2rem", color: "blue" }} />;
  }
};

const WeatherCard = ({ weatherData }) => {
  if (!weatherData || !weatherData.main) {
    return null;
  }

  const { temp, humidity } = weatherData.main;
  const { description } = weatherData.weather[0];
    getTemperatureIcon(temp);

  return (
    <AnimatedCard elevation={1}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          style={{ width: "100%", minWidth: "400px" }}
        >
          <AnimatedTypography
            variant="h5"
            component="div"
            style={{ fontSize: "30px" }}
          >
            Current Weather
          </AnimatedTypography>

          <Box display="flex" 
          alignItems="center">

            {getTemperatureIcon(temp)}

            <AnimatedTypography variant="h6" style={{ marginLeft: "10px" }}>
              Temperature: {temp} °C
            </AnimatedTypography>

          </Box>

          <AnimatedTypography variant="h6" mt={2}>
            Humidity: {humidity} %
          </AnimatedTypography>
          <AnimatedTypography variant="body2" mt={1}>
            Condition: {description}
          </AnimatedTypography>
        </Box>
      </CardContent>
    </AnimatedCard>
  );
};

export default WeatherCard;
