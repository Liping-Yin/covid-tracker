import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import "./InfoBox.css";
import { prettyPrintStat } from "./util";
export default function InfoBox({
  title,
  active,
  isBlue,
  cases,
  total,
  ...props
}) {
  return (
    <Card
      className={`infoBox ${active && "infoBox--selected"} ${
        isBlue && "infoBox--blue"
      } `}
      onClick={props.onClick}

    >
      <CardContent>
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        <h2 className={`infoBox__cases ${!isBlue && "infoBox__cases--blue"}`}>{prettyPrintStat(cases)}</h2>
        <Typography className="infoBox__total" color="textSecondary">
          {prettyPrintStat(total)} Total
        </Typography>
      </CardContent>
    </Card>
  );
}
