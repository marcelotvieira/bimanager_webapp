import { Image } from 'antd';
import React, { useEffect } from 'react';
import DashboardTabs from '../Components/DashboardTabs';
import Menu from '../Components/Menu';
import Socials from '../Components/Socials';
import {
  IQuery,
  useDatabases
} from '../Context/DatabaseContext';
import { useUser } from '../Context/UserContext';
import logo from '../assets/images/LOGO-SUPER_3-HORIZONTAL.png';



const Dashboard: React.FC = () => {

  const { user } = useUser();
  const { 
    database,
    initialDate,
    finalDate,
    currentQuery,
    getData,
    setIsLoading,
  } = useDatabases();

  useEffect(() => {
    if (database && currentQuery && user) {
      setIsLoading(true);
      getData(database?.id, currentQuery?.id, user?.token)
        .then(() => setIsLoading(false));
    }
  }, [currentQuery, initialDate, finalDate]);


  return (
    <div className="page-container">
      <div className="dashboard-container">

        <aside>
          <div>
            <Image preview={false} src={logo} className="logo" />
            <h3>{user?.user.username}</h3>
            <h4>{database?.name}</h4>
          </div>
          <Menu queries={database?.queries as IQuery[]} />
          <Socials />
        </aside>

        {
          currentQuery && <div className="query-content">
            <DashboardTabs />
          </div>
        }

      </div>
    </div>
  );
};

export default Dashboard;