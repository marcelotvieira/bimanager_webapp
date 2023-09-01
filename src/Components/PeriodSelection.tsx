
import { DatePicker, DatePickerProps } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import locale from 'antd/es/date-picker/locale/pt_BR';
import dayjs from 'dayjs';
import React from 'react';
import { useDatabases } from '../Context/DatabaseContext';

const { RangePicker } = DatePicker;

const DATE_FORMAT = 'DD/MM/YYYY';


const PeriodSelection: React.FC = () => {

  const { setInitialDate,initialDate, finalDate, setFinalDate} = useDatabases();

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    const period = value as dayjs.Dayjs[];
    if (period[0] !== null && period[1] !== null) {
      setInitialDate(period[0].toDate());
      setFinalDate(period[1].toDate());
    }
  };

  return (
    <div className="period-selection">
      <h4>Selecione o período</h4>
      {/* <div className='flex gaped1'> */}

      <RangePicker
        defaultValue={[dayjs(initialDate), dayjs(finalDate)]}
        allowClear={false}
        locale={locale}
        showTime

        format="YYYY-MM-DD"
        onOk={onOk}

      />

      {/* <DatePicker
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
        /> */}
      {/* </div> */}
    </div>
  );
};

export default PeriodSelection;