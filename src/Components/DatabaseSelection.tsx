import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { IDatabase, useDatabases } from '../Context/DatabaseContext';
import { IUser, useUser } from '../Context/UserContext';
import { getConnections } from '../api/api';
import AnimatedContainer from './AnimatedContainer';

type Props = {
  user: IUser,
  history: { push: (url: string) => void },
}


const DatabaseSelection: React.FC<Props> = ({
  user: { user, token },
  history,
}) => {

  const { setUserConnections, userConnections } = useUser();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { database, setDatabase } = useDatabases();

  useEffect(() => {
    getConnections(user.id, token)
      .then(({ data }) => {
        console.log(data.response);
        setUserConnections(data);
      })
      .catch((err: Error) => console.log(err));

    setIsVisible(true);
  }, []);

  const handleSelectConnection = (d: IDatabase) => {
    setDatabase(d);
    history.push('/Dashboard');
  };


  return (
    <AnimatedContainer animationIn="fadeIn" animationOut="fadeOut" isVisible={isVisible} >
      {userConnections && <div className="database-selection">
        <div>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
        </div>
        <div>
          <h2>Bancos de Dados:</h2>
          <ul>
            {
              userConnections?.databases.map((d) => (
                <li key={d.id}>
                  <Button
                    type="primary"
                    onClick={() => handleSelectConnection(d)}
                  >
                    {d.name}
                  </Button>
                </li>
              ))
            }
          </ul>
        </div>
      </div>}
    </AnimatedContainer >

  );
};

export default DatabaseSelection;