import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import { DatabaseProvider } from './Context/DatabaseContext';
import { UserProvider } from './Context/UserContext';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Signin from './pages/Signin';
import './styles/styles.css';

// import { Container } from './styles';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <UserProvider>
          <DatabaseProvider>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/Dashboard" component={Dashboard} />
          </DatabaseProvider>
          <Route exact path="/auth/Signin" component={Signin} />
        </UserProvider>
      </Switch>
    </BrowserRouter>
  );
};

export default App;