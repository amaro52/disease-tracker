import React, { useEffect, useState } from "react";
import "./App.css";
import {
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent,
} from "@mui/material";
import InfoBox from "./InfoBox";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      const response = await axios.get(
        "https://disease.sh/v3/covid-19/countries"
      );
      const result = response.data;

      const countries = result.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2,
      }));

      setCountries(countries);
    };

    getCountriesData();
  }, []);

  // when selected country is changed in the drop down, change the display name on the menu
  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    console.log(countryCode);
  };

  return (
    <div className="app">
      {/* Left side of screen */}
      <div className="app_left">
        <div className="app_header">
          {/* Title */}
          <h1>Disease Tracker</h1>

          {/* Header */}
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              {/* Map countires to the drop down */}
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Infoboxes */}
        <div className="app_stats">
          {/* Cases */}
          <InfoBox title="COVID-19 Cases" cases={123} total={2000} />

          {/* Recoveries */}
          <InfoBox title="Recovered" cases={123} total={2000} />

          {/* Deaths */}
          <InfoBox title="Deaths" cases={123} total={3000} />
        </div>
      </div>

      {/* Right side of screen */}
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table */}

          <h3>Worldwide new cases</h3>
          {/* Graph */}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
