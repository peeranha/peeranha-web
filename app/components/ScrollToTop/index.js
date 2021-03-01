import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import isMobile from 'ismobilejs';

import { TEXT_LIGHT, TEXT_SECONDARY } from 'style-constants';
import { LEFT_MENU_ID } from 'containers/LeftMenu/constants';
import { HEADER_ID } from 'containers/Header/constants';

import Icon from 'components/Icon';
import toTopArrow from 'images/toTopArrow.svg?external';

const Button = styled.button`
  position: fixed;
  bottom: ${isMobile().apple.phone ? 70 : 20}px;
  right: 20px;
  z-index: 1000;
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: ${TEXT_SECONDARY};
  opacity: 0.5;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;

  * {
    fill: ${TEXT_LIGHT};
  }

  @media only screen and (max-width: 576px) {
    width: 36px !important;
    height: 36px !important;
  }
`;

const ScrollToTop = () => {
  const [visible, setVisibility] = useState(false);

  let timerOn = false;
  let timeoutId;

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  useEffect(
    () => () => {
      setVisibility(false);
      clearTimeout(timeoutId);
    },
    [],
  );

  let previousPosition = window.pageYOffset;

  function scrollHandler() {
    const currentPosition = window.pageYOffset;

    if (currentPosition > 1000 && currentPosition > previousPosition) {
      setVisibility(true);

      if (timerOn) {
        timerOn = false;
        clearTimeout(timeoutId);
      }

      timerOn = true;
      timeoutId = setTimeout(() => {
        setVisibility(false);
        clearTimeout(timeoutId);
        timerOn = false;
      }, 3000);
    }

    if (currentPosition <= 1000 || currentPosition < previousPosition) {
      setVisibility(false);

      timerOn = false;
      clearTimeout(timeoutId);
    }

    previousPosition = currentPosition;
  }

  const clickHandler = () => {
    window.scrollTo(0, 0);
    document.querySelector(`#${HEADER_ID}`).classList.remove('sticky');
    document.querySelector(`#${LEFT_MENU_ID}`).classList.remove('sticky');
  };

  return (
    <Button visible={visible} onClick={clickHandler} gray>
      <Icon icon={toTopArrow} width="14" height="14" />
    </Button>
  );
};

export default ScrollToTop;
