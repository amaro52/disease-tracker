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
  const [countryInfo, setCountryInfo] = useState({});

  /** To display data when worldwide is selected in drop down */
  useEffect(() => {
    const worldwideData = async () => {
      const response = await axios.get("https://disease.sh/v3/covid-19/all");
      const result = response.data;

      setCountryInfo(result);
    };

    worldwideData();
  }, []);

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
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    // set url based on if a country is selected or not
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/countries"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const response = await axios.get(url);
    const result = response.data;

    setCountry(countryCode);
    setCountryInfo(result);

    console.log("Country Code >>> ", countryCode);
    console.log("Country Info >>> ", countryInfo);
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
          <InfoBox
            title="COVID-19 Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />

          {/* Recoveries */}
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          {/* Deaths */}
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
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
