import { Table as AntdTable } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { IGenericQueryRowData } from '../Context/DatabaseContext';

type Props = {
  data: IGenericQueryRowData[];
  isLoading: boolean;
}

const Table: React.FC<Props> = ({ data, isLoading }) => {

  const headers = Object.keys(data[0]);
  const columns: ColumnsType<any> =  headers.map((h, i) => ({
    title: h,
    dataIndex: h,
    key: i,
    sorter: (a, b) => {
      const valueA = a[h];
      const valueB = b[h];

      if (valueA === null || valueB === null) {
        if (valueA === valueB) return 0;
        if (valueA === null) return -1;
        return 1;
      }
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return valueA.localeCompare(valueB);
      }
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return valueA - valueB;
      }
      return 0;
    },
  }));

  return (
    <div>
      <div className="table-container">

        <AntdTable
          loading={isLoading}
          showSorterTooltip
          dataSource={data.map((d, i) => ({
            key: i,
            ...d
          }))}
          columns={
            columns
          } />

        <table className="table-to-print">
          <thead>
            <tr>
              {
                headers.map((h) => (<th key={h}>{h}</th>))
              }
            </tr>
          </thead>
          <tbody>
            {
              data.map((p, i) => (
                <tr key={i}>
                  {Object.values(p).map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;