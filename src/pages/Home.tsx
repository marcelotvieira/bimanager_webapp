import React from 'react';
import { useHistory } from 'react-router-dom';
import DatabaseSelection from '../Components/DatabaseSelection';
import { useUser } from '../Context/UserContext';

// import { Container } from './styles';

const Home: React.FC = () => {

  const history = useHistory();

  const { user } = useUser();
  
  return (
    <div className="page-container">
      {user && <DatabaseSelection history={history as { push: (url: string) => void }} user={user} />}
    </div>

  );
};

export default Home;