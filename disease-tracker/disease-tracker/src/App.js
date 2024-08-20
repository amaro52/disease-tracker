import React, { useState } from "react";
import "./App.css";
import { MenuItem, Select, FormControl } from "@mui/material";

const App = () => {
  const [countries, setCountries] = useState(["USA", "Canada", "Mexico"]);

  return (
    <div className="App">
      <div className="app_header">
        <h1>Disease Tracker</h1>

        <FormControl className="app_dropdown">
          <Select variant="outlined" value="abc">
            {/* Loop through countries and show a drop down */}
            {countries.map((country) => (
              <MenuItem value={country}>{country}</MenuItem>
            ))}

            {/* <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldwide">worldwide</MenuItem>
            <MenuItem value="worldfdsfsdwide">worldwfdfsfdide</MenuItem> */}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default App;
