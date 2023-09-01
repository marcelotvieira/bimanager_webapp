// import { saveAs } from 'file-saver';
import { NotificationInstance } from 'antd/es/notification/interface';
import * as XLSX from 'xlsx';
import { IGenericQueryRowData } from '../Context/DatabaseContext';
import { openNotification } from './openNotification';

export const toXLSX = (
  data: IGenericQueryRowData[],
  fileName: string,
  period?: { initialDate: string, finalDate: string},
  api?: NotificationInstance,
) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Tabela');
  
  XLSX.writeFile(
    workbook,
    `${fileName}_${period?.initialDate}_${period?.finalDate}.xlsx`);

  if (api) {
    openNotification({
      type: 'success',
      api,
      info: {
        message: 'Dados Exportados!',
        description: `
        ${fileName} | ${period?.initialDate} | ${period?.finalDate}`,
        placement: 'bottomRight'
      }
    });
  }
};