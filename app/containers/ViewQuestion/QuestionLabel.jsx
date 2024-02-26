import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  TEXT_PRIMARY,
  BORDER_RADIUS_M,
  TEXT_PRIMARY_DARK,
  TUTORIAL_ICON_COLOR,
} from 'style-constants';
import { useTranslation } from 'react-i18next';
import { POST_TYPE } from '../../utils/constants';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

const types = {
  [POST_TYPE.generalPost]: {
    title: 'common.general',
    color: graphCommunity ? 'rgba(237, 74, 109, 1)' : TEXT_PRIMARY_DARK,
  },
  [POST_TYPE.expertPost]: {
    title: 'common.expert',
    color: graphCommunity ? 'rgba(76, 105, 255, 1)' : TEXT_PRIMARY,
  },
  [POST_TYPE.tutorial]: {
    title: 'common.tutorial',
    color: graphCommunity ? 'rgba(75, 202, 129, 1)' : TUTORIAL_ICON_COLOR,
  },
};

export const TypeContainer = styled.div`
  position: relative;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  padding: 0 20px;

  margin-top: 10px;
  margin-left: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  word-break: initial;
  white-space: nowrap;

  color: ${({ color }) => color};

  @media only screen and (max-width: 576px) {
    height: 25px;
    font-size: 14px;
  }

  :before {
    content: '';
    position: absolute;
    background: ${({ color }) => color};
    opacity: 0.2;
    border-radius: ${BORDER_RADIUS_M};
    height: 100%;
    width: 100%;
  }

  > span {
    white-space: nowrap;
  }
`;

const QuestionType = ({ postType }) => {
  const { t } = useTranslation();

  return <TypeContainer color={types[postType].color}>{t(types[postType].title)}</TypeContainer>;
};

QuestionType.propTypes = {
  postType: PropTypes.number,
};

export default QuestionType;
