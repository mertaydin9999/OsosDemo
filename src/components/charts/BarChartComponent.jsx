import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const BarChartComponent = ({ transformedData, selectedOption, width }) => {
  console.log(selectedOption, "selectedopt", transformedData);
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        width={300}
        height={300}
        data={transformedData}
        margin={{
          top: 10,
          right: 20,
          left: 20,
          bottom: 10,
        }}
      >
        {selectedOption.chartStyle === "Kareli" ? (
          <CartesianGrid strokeDasharray="3 3" />
        ) : (
          ""
        )}
        <XAxis dataKey="donemAy" stroke="white" />
        <YAxis stroke="white" />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={selectedOption.dataType}
          stackId="donemAy"
          fill="#8884d8"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
