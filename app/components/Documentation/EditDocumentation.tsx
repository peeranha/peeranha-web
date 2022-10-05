import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { keyframes } from '@emotion/react';
import Header from './components/Header';

const animationDocumentation = (screenWidth) =>
  keyframes({
    '0%': {
      left: '100%',
    },
    '80%': {
      left: screenWidth + 50,
    },
    '90%': {
      left: screenWidth + 100,
    },
    '95%': {
      left: screenWidth + 75,
    },
    '100%': {
      left: screenWidth + 86,
    },
  });

const EditDocumentation: React.FC<any> = () => {
  console.log('sdfsdfsdf');
  const refOverlay = useRef<HTMLDivElement>(null);
  const [paddingLeft, setPaddingLeft] = useState<number>(86);

  console.dir(paddingLeft);

  useEffect(() => {
    if (refOverlay?.current) {
      setPaddingLeft((refOverlay.current.offsetWidth - 1366) / 2);
    }
  }, [refOverlay]);

  return (
    <>
      {document.querySelector('header') &&
        ReactDOM.createPortal(
          <div
            ref={refOverlay}
            css={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 100,
              height: '100vh',
              background: 'rgba(0, 0, 0, 0.4)',
            }}
          />,
          document.querySelector('header'),
        )}
      <div
        css={{
          position: 'fixed',
          top: 0,
          height: '100vh',
          zIndex: 101,
          background: 'var(--color-white)',
          animation: `${animationDocumentation(
            paddingLeft,
          )} 1s ease-in forwards`,
          width:
            refOverlay?.current &&
            refOverlay?.current.clientWidth - paddingLeft,
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Header />
      </div>
    </>
  );
};

export default EditDocumentation;
