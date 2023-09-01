import { Tabs } from 'antd';
import React from 'react';
import { IGenericQueryRowData, useDatabases } from '../Context/DatabaseContext';
import BarChart from './Charts/BarChart';
import PeriodSelection from './PeriodSelection';
import Printable from './PrintableTable';
import Table from './Table';

// import { Container } from './styles';

const DashboardTabs: React.FC = () => {

  const { 
    currentQuery,
    queryData,
    isLoading,
  } = useDatabases();


  return (
    <Tabs
      type='card'
      items={[
        {
          label: 'Tabela',
          key: 'table',
          children: (
            <div>
                    
              { currentQuery?.isCompatibleWithPeriod && <PeriodSelection />}

              <div>
                {queryData && queryData.length > 0 ? (
                  <Printable
                    trigger={() => <button>Imprimir</button>}
                  >
                    <Table
                      isLoading={isLoading}
                      data={queryData as IGenericQueryRowData[]}
                    />
                  </Printable>
                )
                  : (<p>Não existem dados para este período.</p>)
                }
              </div>

            </div>
          )
        },
        {
          label: 'Gráfico',
          key: 'graphic',
          children: (
            <>
              <PeriodSelection />
              
              { currentQuery?.chartXAxisKey !== '' ? 
                <><BarChart
                  data={queryData as IGenericQueryRowData[]}
                  chartXAxisKey={currentQuery?.chartXAxisKey as string}
                  chartYAxisKey={currentQuery?.chartYAxisKey as string}
                />
                </>
                : (<p>Esta consulta não possui gráfico.</p>)
              }
              {/* <LineChart
                data={queryData as IGenericQueryRowData[]}
                chartXAxisKey={currentQuery?.chartXAxisKey as string}
                chartYAxisKey={currentQuery?.chartYAxisKey as string}
              /> */}
            </>
            
          )
        }
      ]} />
  );
};

export default DashboardTabs;