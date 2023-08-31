/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Animated } from 'react-animated-css';

function AnimatedContainer ({
  animationIn,
  animationOut,
  isVisible,
  children,
} ) {
  return (
    <Animated animateOnMount animationInDelay={800} animationIn={animationIn} isVisible={isVisible} animationOut={animationOut}>
      { children }
    </Animated>
  );
}



export default AnimatedContainer;