import React from 'react';

// import { Container } from './styles';

const Socials: React.FC = () => {
  return (
    <div className="socials">
      <a href="#" target='_blank'>
        <i className="fa-brands fa-whatsapp" />

      </a>
      <a href="https://superadministrador.com.br" target="_blank" rel="noreferrer">
        <i className="fa-solid fa-circle-info" />
      </a>
    </div>
  );
};

export default Socials;