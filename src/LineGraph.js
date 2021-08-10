import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { buildChartData } from "./util";

const options = {
  legend: { display: false },
};

function LineGraph() {
  const [data, setData] = useState();

  // https://disease.sh/v3/covid-19/historical/all?lastdays=120
  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          const chartData = buildChartData(data);
          setData(chartData);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                data: data,
                borderColor: "#CC1034",
                backgroundColor: "rgba(204,16,52,.5)",
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
