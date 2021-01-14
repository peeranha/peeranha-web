import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import communitiesConfig from 'communities-config';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import Arrow from '../Arrow';
import { Links } from './CustomSubHeader';

const Div = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  padding: 2px 0 2px 5px;
  width: 100%;
  height: ${({ visible }) => (visible ? 'auto' : '70px')};

  color: ${({ styles }) => styles.color && styles.color.a ? styles.color.a : `#ffffff`};

  background: ${({ styles }) => styles.bg.burgerHeader || styles.bg.header || `rgb(${'80, 101, 165'})`};

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
      max-width: 240px;
      max-height: 45px;
      padding: 0;

      ${({ mobileSubHeaderImgStyles }) => mobileSubHeaderImgStyles};
    }
  }

  > div {
    padding-top: 0;
    font-family: ${({ styles }) => styles.font && styles.font.body ? styles.font.body : `inherit`};
    font-size: 15px;
    letter-spacing: 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  a {
    color: ${({ styles }) => styles.color && styles.color.a ? styles.color.a : `#ffffff`};

    :visited {
      color: ${({ styles }) => styles.color && styles.color.a ? styles.color.a : `#ffffff`};
    }
  }

  span {
    color: ${({ styles }) => styles.color && styles.color.a ? styles.color.a : `#ffffff`};
  }
`;

const CustomMobileSubHeader = ({ config, logo }) => {
  const [visible, setVisibility] = useState(false);
  const setVis = useCallback(() => setVisibility(!visible), [visible]);
  const { styles, links } = config;

  const singleCommId = +isSingleCommunityWebsite();
  const isBloggerMode = !!communitiesConfig[singleCommId].isBloggerMode;

  return (
    <Div
      visible={visible}
      styles={styles}
      mobileSubHeaderImgStyles={styles.mobileSubHeaderImgStyles}
    >
      <button
        className="d-flex justify-content-between align-items-center"
        onClick={setVis}
        disabled={isBloggerMode}
      >
        <img src={logo} alt="" />
        {!isBloggerMode && (
          <Arrow
            className="mt-auto mb-auto"
            color={styles.color.arrow}
            rotate={visible}
          />
        )}
      </button>
      {(visible && !isBloggerMode) && <Links links={links} styles={styles} device="mobile" />}
    </Div>
  );
};

CustomMobileSubHeader.propTypes = {
  config: PropTypes.object,
  logo: PropTypes.string,
};

export default CustomMobileSubHeader;
