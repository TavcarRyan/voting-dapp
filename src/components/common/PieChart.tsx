import React from "react";
import Chart from "react-apexcharts";

const PieChart = (props: any) => {
  const data: any = {
    series: props.series,
    options: {
      colors: ["#FFC246", "#07BB62", "#5470DE", "#6F6F6F"],
      labels: props.labels,
      chart: {
        width: 280,
        type: "donut",
      },
      tooltip: {
        y: {
          formatter: function (val: string) {
            return "";
          },
          title: {
            formatter: function (seriesName: string) {
              return seriesName;
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: false,
        position: "right",
        offsetY: 0,
        height: 230,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "30%",
          },
        },
      },
    },
  };

  return (
    <Chart
      options={data.options}
      series={data.series}
      type="pie"
      height={250}
    />
  );
};

export default PieChart;
