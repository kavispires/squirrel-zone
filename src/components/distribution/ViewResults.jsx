import React from 'react';
import { Chart } from 'react-google-charts';

function ViewResults({ dimensions, distributionResults }) {
  const pieChartSize = dimensions.pieChart.size;
  return (
    <div className="line-distribution__live-lyrics line-distribution__live-lyrics--results">
      <h1>Results</h1>
      <div className="">
        <Chart
          width={'100%'}
          height={pieChartSize}
          chartType="PieChart"
          loader={<div>Loading Results...</div>}
          data={distributionResults?.data ?? {}}
          options={{
            ...(distributionResults?.options ?? {}),
          }}
        />
      </div>
    </div>
  );
}
export default ViewResults;
