import React from "react";
import "./App.css";
import { MenuItem, Select, FormControl } from "@mui/material";

const App = () => {
  return (
    <div className="App">
      <h1>Disease Tracker</h1>

      <FormControl className="app_dropdown">
        <Select variant="outlined" value="abc">
          <MenuItem value="worldwide">worldwide</MenuItem>
          <MenuItem value="worldwide">worldwide</MenuItem>
          <MenuItem value="worldfdsfsdwide">worldwfdfsfdide</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default App;
