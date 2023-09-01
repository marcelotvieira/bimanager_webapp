// import { Line } from '@ant-design/charts';
import React from 'react';
import { IGenericQueryRowData, useDatabases } from '../../Context/DatabaseContext';

type Props = {
  data: IGenericQueryRowData[],
  chartYAxisKey: string,
  chartXAxisKey: string,
}

const LineChart: React.FC<Props> = ({ data, chartXAxisKey, chartYAxisKey }) => {

  const { isLoading } = useDatabases();
  return (
    <>
      {/* <Line
        loading={isLoading}
        xField={chartYAxisKey}
        yField= {chartXAxisKey}
        seriesField={chartXAxisKey}
        data={data}
      /> */}
    </>
  );
};

export default LineChart;