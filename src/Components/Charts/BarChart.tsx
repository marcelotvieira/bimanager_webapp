import { Bar } from '@ant-design/charts';
import React from 'react';
import { IGenericQueryRowData, useDatabases } from '../../Context/DatabaseContext';

type Props = {
  data: IGenericQueryRowData[],
  chartYAxisKey: string,
  chartXAxisKey: string,
}



const BarChart: React.FC<Props> = ({ data, chartXAxisKey, chartYAxisKey }) => {

  const { isLoading } = useDatabases();

  return (
    
    <Bar
      label={{
        formatter: (item) => (item[chartYAxisKey]
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })),
      }}
      xAxis={{ 
        maxTickCount: 8,
        grid: {
          line: {
            style: {
              lineWidth: 2,
              opacity: 0.3,
              stroke: 'rgba(120, 140, 235, 0.5)',
            }
          },
        },
      }}

      yAxis={{
        label:{
          autoHide: true,
          autoRotate: true,
          autoEllipsis: true,
          style: {
            fontSize: 9,
          }
        }
      }}

      loading={isLoading}
      xField={chartYAxisKey}
      yField= {chartXAxisKey}
      seriesField={chartYAxisKey}
      height={700}
      className='antd-bar-chart-container'      
      scrollbar={{
        type: 'vertical',
        width: 20,
        style:{
          thumbColor: 'rgb(29, 74, 151)',
          trackColor: 'rgba(10, 10, 10, 0.15)',
        }
      }}

      tooltip={{
        formatter: (item) => ({
          name: item[chartXAxisKey],
          value: item[chartYAxisKey].toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })
        })
      }}

      data={
        data.map((d) => ({
          [chartYAxisKey]: Number(d[chartYAxisKey]),
          [chartXAxisKey]: d[chartXAxisKey],
        }))
      }
    />
  );
};

export default BarChart;