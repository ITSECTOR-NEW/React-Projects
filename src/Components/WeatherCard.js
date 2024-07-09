import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

// Styled Typography for animation
const AnimatedTypography = styled(Typography)({
  transition: "all 0.5s ease",
});

// Styled Card with background animation and responsive design
const AnimatedCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  background: "linear-gradient(135deg, #f0f8ff, #e0ffff)",
  backgroundSize: "200% 200%",
  animation: "backgroundAnimation 15s ease infinite",
  borderRadius: "12px",
  maxWidth: "100%", // Ensure it fits within its container
  width: "100%",    // Full width on smaller screens
  [theme.breakpoints.up("sm")]: {
    maxWidth: "400px", // Limit width on larger screens
  },
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
}));

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
  const Icon = getTemperatureIcon(temp); // Store the icon in a variable

  return (
    <AnimatedCard elevation={1}>
      <CardContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          style={{ width: "100%" }} // Full width
        >
          <AnimatedTypography
            variant="h5"
            component="div"
            style={{ fontSize: "1.5rem" }} // Adjust font size for mobile
          >
            Current Weather
          </AnimatedTypography>

          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            textAlign="center" // Center align text
            style={{ marginTop: "10px" }}
          >
            {Icon}

            <AnimatedTypography variant="h6" style={{ marginTop: "10px" }}>
              Temperature: {temp} °C
            </AnimatedTypography>

            <AnimatedTypography variant="h6" style={{ marginTop: "10px" }}>
              Humidity: {humidity} %
            </AnimatedTypography>

            <AnimatedTypography variant="body2" style={{ marginTop: "10px" }}>
              Condition: {description}
            </AnimatedTypography>
          </Box>
        </Box>
      </CardContent>
    </AnimatedCard>
  );
};

export default WeatherCard;
