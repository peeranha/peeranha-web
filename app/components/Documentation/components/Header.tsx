import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { keyframes } from '@emotion/react';
import Button from 'common-components/Button';
import SaveIcon from 'icons/Save';

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

const Header: React.FC<any> = () => {
  console.log('sdfsdfsdf');
  const refOverlay = useRef<HTMLDivElement>(null);
  const [paddingLeft, setPaddingLeft] = useState<number>(86);

  console.dir(paddingLeft);

  useEffect(() => {
    if (refOverlay?.current) {
      setPaddingLeft((refOverlay.current.clientWidth - 1366) / 2);
    }
  }, [refOverlay]);

  return (
    <div
      className="df jcsb aic pl32 pr32"
      css={{
        height: 72,
        background: '#A5BCFF',
        color: 'var(--color-white)',
        fontWeight: 600,
        fontSize: 38,
        lineHeight: '48px',
      }}
    >
      <div>Edit documentation</div>
      <div>
        <Button variant="secondary" icon={<SaveIcon className="icon" />}>
          Button Secondary Icon
        </Button>
        <Button variant="secondary" icon={<SaveIcon className="icon" />}>
          Button Secondary Icon
        </Button>
      </div>
    </div>
  );
};

export default Header;
