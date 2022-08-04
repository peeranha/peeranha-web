import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { BG_PRIMARY_LIGHT, BORDER_SECONDARY } from 'style-constants';

import processIndicator from 'images/progress-indicator.svg?inline';

import {
  HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from 'containers/Header/constants';

const width = 156;
const height = 50;

const Box = styled.div`
  position: fixed;
  top: ${x => (x.inProgress ? HEADER_HEIGHT * 1.25 : -HEADER_HEIGHT)}px;
  opacity: ${x => (x.inProgress ? 1 : 0)};
  left: calc(50% - ${width / 2}px);
  width: ${width}px;
  height: ${height}px;
  z-index: 1000000;
  transition: 0.5s;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 ${BORDER_SECONDARY};
  background-color: ${BG_PRIMARY_LIGHT};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-right: 10px;
    animation: rotation 1s infinite linear;
  }

  span:after {
    content: '...';
  }

  @media only screen and (max-width: 991px) {
    top: ${x =>
      x.inProgress ? MOBILE_HEADER_HEIGHT * 1.25 : -MOBILE_HEADER_HEIGHT}px;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const View = ({ inProgress }) => {
  const { t } = useTranslation();

  return (
    <Box inProgress={inProgress}>
      <img src={processIndicator} alt="icon" />
      {t('common.inProgress')}
    </Box>
  );
};

View.propTypes = {
  inProgress: PropTypes.bool,
};

export default React.memo(View);
