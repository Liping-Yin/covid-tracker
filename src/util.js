import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";
import React from "react";

const casesTypeColors = {
  cases: {
    hex: "#fc715e",
    rgb: "rgb(252,113,94)",
    half_op: "rgba(252,113,94,.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#fed500",
    rgb: "rgb(254,213,0)",
    half_op: "rgba(254,213,0,.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#a174f2",
    rgb: "rgb(161,116,242)",
    half_op: "rgba(161,116,242,.5)",
    multiplier: 2000,
  },
};
export const sortData = (data) => {
  const sortedData = [...data];

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

export const buildChartData = (data, casesType = "cases") => {
  const chartData = [];
  let lastDataPoint;
  for (let date in data[casesType]) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};
// Draw circles on map
export const showDataOnMap = (data, casesType = "cases") => {
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lastDataPoint, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType]["half_op"]}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name">{country.country}</div>
          <div className="info-cases">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered:{numeral(country.recovered).format("0,0")}{" "}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
};

// info box

export const prettyPrintStat = (stat) =>
  stat ? `+ ${numeral(stat).format("0.0a")}` : "0.0";
