import { Bar } from '@ant-design/charts';
import React from 'react';
import { IGenericQueryRowData } from '../../Context/DatabaseContext';

type Props = {
  data: IGenericQueryRowData[],
  chartYAxisKey: string,
  chartXAxisKey: string,
}

// const { isLoading } = useDatabases();

const BarChart: React.FC<Props> = ({ data, chartXAxisKey, chartYAxisKey }) => {

  console.log(chartXAxisKey);
  console.log(chartYAxisKey);
  return (
    
    <Bar

      xField={chartXAxisKey}
      yField= {chartYAxisKey}
      seriesField={chartXAxisKey}
      height={700}
      yAxis={{
        label: {
          autoRotate: false,
        },
      }}
      className='antd-bar-chart-container'

      scrollbar={{
        type: 'vertical',
        style:{
          thumbColor: 'rgb(29, 74, 151)',

        }
      }}


    
      data={
      //   data.sort((a, b) => {
      //   if (a[chartYAxisKey] && b[chartYAxisKey]) {
      //     return Number(a[chartYAxisKey]) - Number(b[chartYAxisKey]);
      //   }
      //   return 0;
      // })
        data
      }
    />
  );
};

export default BarChart;