import { Bar } from '@ant-design/charts';
import React from 'react';
import { IGenericQueryRowData, useDatabases } from '../../Context/DatabaseContext';
import Loading from '../Loading';

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
        grid: {
          line: {
            style: {
              lineWidth: 2,
              opacity: 0.05,
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
      loadingTemplate={<Loading />}
      xField={chartYAxisKey}
      yField= {chartXAxisKey}
      seriesField={chartYAxisKey}
      height={700}
      className='antd-bar-chart-container'
      // maxBarWidth={30}
      // minBarWidth={24}
      
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