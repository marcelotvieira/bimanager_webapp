import React, { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import { checkToken } from '../api/api';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user, setUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) return;
    checkToken(token)
      .then(({ data }) => {
        setUser({ token: token, user: data});
      });
  }, []);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/auth/Signin" />
      }
    />
  );
};

export default ProtectedRoute;
