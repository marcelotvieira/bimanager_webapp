import { Select } from 'antd';
import React, { useState } from 'react';
import { IQuery, useDatabases } from '../Context/DatabaseContext';

// import { Container } from './styles';
type Props = {
  queries: IQuery[]
}

const Menu: React.FC<Props> = ({ queries }) => {

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const { currentQuery, setCurrentQuery } = useDatabases();

  const queryOptions = (
    <ul className="menu-list">
      { queries.map((q) => (
        <li
          className={q === currentQuery ? 'active' : ''}
          key={q.id}
          onClick={() => {
            setCurrentQuery(q);
            setShowDrawer(false);
          }}
        >
          {q.name}
        </li>
      ))}
    </ul>
  );


  return (
    <div className="query-menu">

      <Select
        onChange={(q: number) => {
          setCurrentQuery(queries.find((query) => query.id === q) as IQuery);
          setShowDrawer(false);
        }}
        showSearch
        placeholder="Buscar consulta"
        optionFilterProp='children'
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
        options={queries.map((q) => ({
          value: q.id,
          label: q.name,
        }))}
      />

    </div>
  );
};

export default Menu;