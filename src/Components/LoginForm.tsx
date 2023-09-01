import { Button } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useUser } from '../Context/UserContext';
import logo from '../assets/images/LOGO-SUPER_3-HORIZONTAL.png';
import Socials from './Socials';

// import { Container } from './styles';

const LoginForm: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [err, setErr] = useState<string | null>(null);

  const history = useHistory();
  const { handleLogin } = useUser();


  const handleSubmit = async () => {
    handleLogin(username, password, history)
      .then()
      .catch((err: Error) => setErr(err.message));
  };

  return (
    <div className="login-form-container">
      <form action="">
        <img src={logo} alt="" className="logo" />
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          type="text"
          placeholder='Usuário'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder='Senha'
        />

        <Button
          type="primary"
          onClick={handleSubmit}
        >
          Entrar
        </Button>

        {err && <p className="error-message">{err}</p>}
      </form>
      <Socials />
    </div>
  );
};

export default LoginForm;