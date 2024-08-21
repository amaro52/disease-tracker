import React, { useEffect, useState } from "react";
import "./App.css";
import { MenuItem, Select, FormControl } from "@mui/material";
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
    <div className="App">
      <div className="app_header">
        {/* Title */}
        <h1>Disease Tracker</h1>

        {/* Header */}
        <FormControl className="app_dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
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
        {/* Infoboxes title="Coronavirus Cases"*/}
        <InfoBox title="COVID-19 Cases" cases={123} total={2000} />

        {/* Infoboxes title="Coronoavirus Recoveries" */}
        <InfoBox title="Recovered" cases={123} total={2000} />

        {/* Infoboxes */}
        <InfoBox title="Deaths" cases={123} total={3000} />
      </div>
    </div>
  );
};

export default App;
