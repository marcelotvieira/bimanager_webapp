import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../Components/LoginForm';
import { useUser } from '../Context/UserContext';

// import { Container } from './styles';

const Signin: React.FC = () => {

  const { user } = useUser();

  if (user) return <Redirect to="/" />;
  return (
    <div className="page-container">
      <LoginForm />
    </div>
  );
};

export default Signin;