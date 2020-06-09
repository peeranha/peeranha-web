import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import Arrow from '../Arrow';
import { Links } from './CustomSubHeader';

const Div = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  padding: 2px 0 2px 5px;
  width: 100%;
  height: ${({ visible }) => (visible ? 'auto' : '70px')};

  color: ${({styles}) => styles.color.a || `#ffffff`};

  background: ${({styles}) => styles.bg.header || `rgb(${'80, 101, 165'})`};

  * {
    padding: 10px 0 10px 15px;
  }

  > button {
    height: 100%;

    > div {
      padding: 0;

      > img {
        padding: 0;
      }
    }

    > img {
      max-height: 45px;
      padding: 0;
    }
  }

  > div {
    padding-top: 0;
    font-family: ${({styles}) => styles.font.body || `#inherit`};
    font-size: 15px;
    letter-spacing: 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  a {
    color: ${({styles}) => styles.color.a || `#ffffff`};

    :visited {
      color: ${({styles}) => styles.color.a || `#ffffff`};
    }
  }

  span {
    color: ${({styles}) => styles.color.a || `#ffffff`};
  }
`;

const CustomMobileSubHeader = ({ config, logo }) => {
  const [visible, setVisibility] = useState(false);
  const setVis = useCallback(() => setVisibility(!visible), [visible]);
  const { styles, links } = config;

  return (
    <Div visible={visible} styles={styles}>
      <button
        className="d-flex justify-content-between align-items-center"
        onClick={setVis}
      >
        <img src={logo} alt="" />
        <Arrow
          className="mt-auto mb-auto"
          color={styles.color.arrow}
          rotate={visible}
        />
      </button>
      {visible && <Links links={links} styles={styles} device={"mobile"} />}
    </Div>
  );
};

export default CustomMobileSubHeader;
