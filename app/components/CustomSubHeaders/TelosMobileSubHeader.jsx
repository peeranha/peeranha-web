import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import TelosLogo from 'images/communities-logos/telos-logo-dark_TM.png';

import Arrow from '../Arrow';
import { Links } from './TelosSubHeader';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2px 0 2px 5px;
  width: 100%;
  height: ${({ visible }) => (visible ? 260 : 70)}px;
  background: #041238;

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

const TelosMobileSubHeader = () => {
  const [visible, setVisibility] = useState(false);
  const setVis = useCallback(() => setVisibility(!visible), [visible]);
  return (
    <Div visible={visible}>
      <button className="d-flex justify-content-between" onClick={setVis}>
        <img
          className="align-self-start"
          id="telos-logo"
          width="100px"
          src={TelosLogo}
          alt="telos"
        />
        <Arrow className="mt-auto mb-auto" color="white" rotate={visible} />
      </button>
      {visible && <Links />}
    </Div>
  );
};

export default TelosMobileSubHeader;
