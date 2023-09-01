import { DownloadOutlined } from '@ant-design/icons';
import { Button, notification } from 'antd';
import React from 'react';
import { IGenericQueryRowData, useDatabases } from '../Context/DatabaseContext';
import { toOnlyDate } from '../utils/toOnlyDate';
import { toXLSX } from '../utils/toXLSX';

type Props = {
  data: IGenericQueryRowData[],
}



const TableToXLSXButton: React.FC<Props> = ({ 
  data,
}) => {

  const [
    notificationApi,
    contextHolder,
  ] = notification.useNotification();

  const { isLoading, currentQuery, initialDate, finalDate } = useDatabases();
  return (
    currentQuery && 
    (
      <>
        {contextHolder}
        
        <Button
          disabled={isLoading}
          icon={<DownloadOutlined />}
          onClick={() => toXLSX(
            data,
            currentQuery.name,
            currentQuery.isCompatibleWithPeriod ? {
              initialDate: toOnlyDate(initialDate
                ?.toISOString() as string) ,
              finalDate: toOnlyDate(finalDate
                ?.toISOString() as string),
            } : undefined,
            notificationApi) }
          type='primary'
        >
      Exportar
        </Button>
      </>
    )
  );
};

export default TableToXLSXButton;