const LoadingAnimation = () => {
  const wrapperStyle = {
    minHeight: '3rem',
    minWidth: '14rem',
    fontSize: '2rem',
    position: 'relative',
    overflow: 'hidden',
    maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0))',
    fontFamily: 'spaced',
  };

  const letterStyle = {
    width: '1ch',
    position: 'absolute',
    top: '50%',
    transform: 'translate(0px, -50%)',
    left: '100%',
    animation: 'scroll 2.5s linear infinite, rainbow 2.5s infinite',
  };

  // Define the animation delay calculation
  const getAnimationDelay = (index) => {
    return `${(2.5 / 10) * (10 - index) * -1}s`;
  };

  // Create an array of letters to display
  const letters = 'Loading...'.split('').map((letter, index) => (
    <span
      key={index}
      style={{
        ...letterStyle,
        animationDelay: getAnimationDelay(index),
        color: 'white', // Start color before rainbow animation
      }}
    >
      {letter}
    </span>
  ));

  return (
    <div style={wrapperStyle} className='w-28 overflow-y-hidden overflow-x-hidden flex justify-center m-auto items-center h-screen'>
      <style>
        {`
          @keyframes scroll {
            to {
              left: -1ch;
            }
          }
          
         @keyframes rainbow {
  0% { color: #c71585; }  /* Dark Pink */
  10% { color: #d1006b; } /* Medium Dark Pink */
  20% { color: #e10082; } /* Medium Pink */
  30% { color: #f20099; } /* Light Pink */
  40% { color: #f594b7; } /* Very Light Pink */
  50% { color: #f8b7e4; } /* Pale Pink */
  60% { color: #d6a0e0; } /* Light Lavender */
  70% { color: #b97cd7; } /* Medium Purple */
  80% { color: #9b59b6; } /* Purple */
  90% { color: #7d3c98; } /* Dark Purple */
  100% { color: #6c3483; } /* Very Dark Purple */
}
        `}
      </style>
      {letters}
    </div>
  );
};

export default LoadingAnimation;
