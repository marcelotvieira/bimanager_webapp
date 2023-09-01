import React from 'react';

// import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="animation-box">
        <div className="flex justified-between">
          <span></span>
          <span></span>
        </div>
        <div className="flex justified-between">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;