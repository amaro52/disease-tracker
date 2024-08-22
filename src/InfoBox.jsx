import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card className="infobox">
      <CardContent>
        {/* TItle */}
        <Typography color="textSecondary">{title}</Typography>

        {/* Number of Cases */}
        <h2 className="infobox_cases">{cases} Cases</h2>

        {/* Total Cases */}
        <Typography className="infobox_total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
