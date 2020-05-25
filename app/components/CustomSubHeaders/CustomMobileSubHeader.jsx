import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import TelosLogo from 'images/communities-logos/telos-logo-dark_TM.png';

import Arrow from '../Arrow';
import { Links } from './CustomSubHeader';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2px 0 2px 5px;
  width: 100%;
  height: ${({ visible }) => (visible ? 'auto' : '70px')};
  background: ${props => props.styles.background || `rgb(${'80, 101, 165'})`};

  * {
    padding: 10px 0 10px 15px;
  }

  > button > div {
    padding: 0;
    > img {
      padding: 0;
    }
  }

  > div {
    padding-top: 0;
    font-family: Neue Haas Grotesk Display Pro Roman;
    font-size: 15px;
    letter-spacing: 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const CustomMobileSubHeader = ({ config, logo }) => {
  const [visible, setVisibility] = useState(false);
  const setVis = useCallback(() => setVisibility(!visible), [visible]);
  const { styles, links } = config;

  return (
    <Div visible={visible} styles={styles.header}>
      <button className="d-flex justify-content-between" onClick={setVis}>
        <img className="align-self-start" width="100px" src={logo} alt="" />
        <Arrow className="mt-auto mb-auto" color="white" rotate={visible} />
      </button>
      {visible && <Links links={links} styles={styles.subitems} />}
    </Div>
  );
};

export default CustomMobileSubHeader;
