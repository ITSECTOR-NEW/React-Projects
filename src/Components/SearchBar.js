import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";

// component for the animated text
const AnimatedTypography = styled(Typography)(({ bgColor }) => ({
  transition: "color 0.5s ease, background-color 0.5s ease",
  color: bgColor,
}));

// styled components for the search box and button
const StyledTextField = styled(TextField)({
  borderRadius: "8px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "8px",
    },
  },
  "& label.Mui-focused": {
    color: "#007BFF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#007BFF",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#007BFF",
  },
});

const StyledButton = styled(Button)({
  borderRadius: "8px",
  textTransform: "none",
  backgroundColor: "#007BFF",
  "&:hover": {
    backgroundColor: "#0056b3",
  },
});

const SearchBar = ({ onWeatherDataFetched }) => {
  const [city, setCity] = useState("");
  const [displayedCity, setDisplayedCity] = useState("");
  const [bgColor, setBgColor] = useState("#000000");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const defaultCity = ["Delhi", "Bangalore", "Hyderabad", "Chennai"];

  const fetchWeatherData = async (city) => {
    const apiKey = "86ed5b3626ee5a0adc4f19f2d545bcc1";
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const { lat, lon } = weatherResponse.data.coord;
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      );

      setDisplayedCity(city);
      onWeatherDataFetched(weatherResponse.data, forecastResponse.data);

      // Generating a random color for text when new data is fetched
      setBgColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);

      setOpenSnackbar(false); // Hide snackbar if data is fetched successfully
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setSnackbarMessage("Error: City not found.");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    // Fetch weather data for the default city when the component mounts
    fetchWeatherData(defaultCity[0]);
  }, []);

  // Function for Search and Enter after writing the city
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && city) {
      fetchWeatherData(city);
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherData(city);
    }
  };

  //Function for error notification
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <Box
        my={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box display="flex" gap={2} alignItems="center">
          <StyledTextField
            label="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            variant="outlined"
            onKeyDown={handleKeyDown}
            margin="normal"
            style={{ maxWidth: "200px" }}
          />
          <StyledButton
            variant="contained"
            color="primary"
            onClick={handleSearch}
          >
            Search
          </StyledButton>
        </Box>
      </Box>
      <Box>
        {displayedCity && (
          <AnimatedTypography
            variant="h6"
            style={{ marginTop: "20px", fontSize: "35px" }}
            bgColor={bgColor}
          >
            {displayedCity}
          </AnimatedTypography>
        )}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SearchBar;
