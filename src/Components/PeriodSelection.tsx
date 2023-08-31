
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/pt_BR';
import dayjs from 'dayjs';
import React from 'react';
import { useDatabases } from '../Context/DatabaseContext';



const DATE_FORMAT = 'DD/MM/YYYY';


const PeriodSelection: React.FC = () => {

  const { setInitialDate,initialDate, finalDate, setFinalDate} = useDatabases();


  return (
    <div className="period-selection">
      <h4>Selecione o período</h4>
      <div className='flex gaped1'>
        <DatePicker
          showTime={false}

          // showToday={false}
          allowClear={false}
          locale={locale}
          value={dayjs(initialDate)}
          picker='date'
          onChange={(_, d) =>  setInitialDate(dayjs(d).toDate())}
        />
        <DatePicker
          showTime={false}
          // showToday={false}
          allowClear={false}
          locale={locale}
          value={dayjs(finalDate)}
          picker='date'
          onChange={(_, d) => setFinalDate(dayjs(d).toDate())}
        />
      </div>
    </div>
  );
};

export default PeriodSelection;