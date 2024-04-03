import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const LineChartComponent = ({ transformedData, selectedOption }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart
        width={400}
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
        <Line
          type="monotone"
          dataKey={selectedOption.dataType}
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
