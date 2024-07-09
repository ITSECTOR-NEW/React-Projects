import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Box,
  Tabs,
  Tab,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GrainIcon from "@mui/icons-material/Grain";
import OpacityIcon from "@mui/icons-material/Opacity";

const weatherIcons = {
  Clouds: <CloudQueueIcon style={{ fontSize: "2rem", color: "lightblue" }} />,
  Clear: <WbSunnyIcon style={{ fontSize: "2rem", color: "orange" }} />,
  Snow: <AcUnitIcon style={{ fontSize: "2rem", color: "lightblue" }} />,
  Rain: <GrainIcon style={{ fontSize: "2rem", color: "blue" }} />,
  Drizzle: <OpacityIcon style={{ fontSize: "2rem", color: "blue" }} />,
};

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

const groupByDay = (forecastList) => {
  const days = {};

  forecastList.forEach((forecast) => {
    const date = new Date(forecast.dt_txt).toISOString().split("T")[0];
    if (!days[date]) {
      days[date] = [];
    }
    days[date].push(forecast);
  });

  return Object.entries(days).map(([date, forecasts]) => ({
    date,
    forecasts,
  }));
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
};

const getOverallCondition = (forecasts) => {
  const conditions = forecasts.map((forecast) => forecast.weather[0].main);
  const conditionCount = {};

  conditions.forEach((condition) => {
    conditionCount[condition] = (conditionCount[condition] || 0) + 1;
  });

  return Object.keys(conditionCount).reduce((a, b) =>
    conditionCount[a] > conditionCount[b] ? a : b
  );
};

const ForecastCard = ({ forecastData }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [chartType, setChartType] = useState("line");

  if (!forecastData || !forecastData.list) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            5-Day Forecast
          </Typography>
          <Typography variant="body2">No forecast data available.</Typography>
        </CardContent>
      </Card>
    );
  }

  const groupedForecast = groupByDay(forecastData.list);

  // Prepare data for the chart
  const chartData = groupedForecast.map((day) => ({
    date: formatDate(day.date),
    temperature:
      day.forecasts.reduce((sum, forecast) => sum + forecast.main.temp, 0) /
      day.forecasts.length,
  }));

  // Styled Typography for animation
  const AnimatedTypography = styled(Typography)({
    transition: "all 0.5s ease",
  });

  return (
    <AnimatedCard
      elevation={1}
      sx={{ maxWidth: 800, width: "100%", marginTop: 4 }}
    >
      <CardContent>
        <AnimatedTypography
          variant="h5"
          component="div"
          style={{ fontSize: "25px" }}
        >
          Next 5-Days Forecast
        </AnimatedTypography>
        <Grid container spacing={2} style={{ marginTop: "0px" }}>
          {groupedForecast.map((day, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Paper
                elevation={0}
                style={{ padding: "10px", marginBottom: "10px" }}
              >
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="h6">{formatDate(day.date)}</Typography>
                  {weatherIcons[getOverallCondition(day.forecasts)] || (
                    <CloudQueueIcon
                      style={{ fontSize: "2rem", color: "grey" }}
                    />
                  )}
                  <Typography variant="body2">
                    {getOverallCondition(day.forecasts)}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box mt={3}>
          <AnimatedTypography
            variant="h5"
            component="div"
            style={{ fontSize: "22px" }}
          >
            Temperature Trend (Next 5 Days){" "}
          </AnimatedTypography>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={(e, newType) => setChartType(newType)}
            aria-label="chart type"
          >
            <ToggleButton value="line" aria-label="line chart">
              Line Chart
            </ToggleButton>
            <ToggleButton value="bar" aria-label="bar chart">
              Bar Chart
            </ToggleButton>
          </ToggleButtonGroup>
          {chartType === "line" ? (
            <LineChart width={700} height={350} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          ) : (
            <BarChart width={700} height={350} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="temperature" fill="#8884d8" />
            </BarChart>
          )}
        </Box>
      </CardContent>
    </AnimatedCard>
  );
};

export default ForecastCard;
