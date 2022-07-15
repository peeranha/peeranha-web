import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  TEXT_PRIMARY,
  BORDER_RADIUS_M,
  TEXT_PRIMARY_DARK,
  TUTORIAL_ICON_COLOR,
} from 'style-constants';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import { POST_TYPE } from '../../utils/constants';

const types = {
  [POST_TYPE.generalPost]: {
    title: commonMessages.general.id,
    color: TEXT_PRIMARY_DARK,
  },
  [POST_TYPE.expertPost]: {
    title: commonMessages.expert.id,
    color: TEXT_PRIMARY,
  },
  [POST_TYPE.tutorial]: {
    title: commonMessages.tutorial.id,
    color: TUTORIAL_ICON_COLOR,
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

  color: ${({ color }) => color};

  @media only screen and (max-width: 576px) {
    height: 25px;
    font-size: 14px;
  }

  :before {
    content: '';
    position: absolute;
    background: ${({ color }) => color};
    opacity: 0.15;
    border-radius: ${BORDER_RADIUS_M};
    height: 100%;
    width: 100%;
  }

  > span {
    white-space: nowrap;
  }
`;

const QuestionType = ({ postType }) => (
  <TypeContainer color={types[postType].color}>
    <FormattedMessage id={types[postType].title} />
  </TypeContainer>
);

QuestionType.propTypes = {
  postType: PropTypes.number,
};

export default QuestionType;
