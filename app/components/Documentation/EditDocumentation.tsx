import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { keyframes } from '@emotion/react';
import Header from './components/Header';

import DocumentationMenu from 'containers/LeftMenu/Documentation/Documentation';
import DocumentationForm from 'containers/Faq';

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

const EditDocumentation: React.FC<any> = ({ documentationMenu }) => {
  const refOverlay = useRef<HTMLDivElement>(null);
  const [paddingLeft, setPaddingLeft] = useState<number>(86);

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
            refOverlay?.current.clientWidth - paddingLeft - 86,
          boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Header />
        <section
          className="dg"
          css={{
            height: '100%',
            gridTemplateColumns: '262px 1fr 262px',
            boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            css={{ background: '#FAFAFA', height: '100%', overflow: 'auto' }}
          >
            <DocumentationMenu
              documentationMenu={documentationMenu}
              isModeratorModeSingleCommunity
              match={{ params: { sectionId: '' } }}
              isEditDocumentation
            />
          </div>
          <div>
            <DocumentationForm />
          </div>
          <div css={{ background: '#FAFAFA', height: '100%' }}></div>
        </section>
      </div>
    </>
  );
};

export default EditDocumentation;
