import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { BG_PRIMARY, BG_PRIMARY_RGB, BUTTON_COLOR } from 'style-constants';

import { formatStringToHtmlId } from 'utils/animation';
import { singleCommunityStyles } from 'utils/communityManagement';

import { IconMd } from 'components/Icon/IconWithSizes';
import Icon from 'components/Icon';

import coinsIcon from 'images/coins.svg?external';
import crownIcon from 'images/crownIcon.svg?external';
import officialIcon from 'images/officialWhite.svg?external';

import Button from 'components/Button/Contained/PrimaryMedium';
import MarkAsAcceptedIcon, { LabelStyles } from './MarkAsAcceptedIcon';
import { B } from './QuestionTitle';

import { MARK_AS_BUTTON } from './constants';

import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const styles = singleCommunityStyles();

const Label = Button.extend`
  ${LabelStyles};
  pointer-events: ${(x) => (x.inactive ? 'none' : 'auto')};
  overflow: hidden;
  height: 1%;
  min-height: 32px;
  max-width: 300px;
  color: ${({ color }) => color || 'var(--color-white)'};
  background: ${({ bg }) => bg || 'inherit'};
  ${({ border }) => `border: 1px solid ${border}` || ''};
`;

const Div = styled.div`
  max-width: 600px;
  display: flex;
  flex-flow: row wrap;

  > button:not(:last-child) {
    margin-right: 16px;
  }

  > button {
    margin-bottom: 10px;
  }
`;

export const BestAnswerMarker = ({
  answerId,
  questionFrom,
  account,
  markAsAccepted,
  correctAnswerId,
  whoWasAccepted,
  isTheLargestRating,
  ids,
  isOfficial,
  profile,
}) => {
  const { t } = useTranslation();

  if (answerId === 0) return null;

  return (
    <Div>
      <MarkAsAcceptedIcon
        id={formatStringToHtmlId(`${MARK_AS_BUTTON}${answerId}`)}
        answerId={answerId}
        questionFrom={questionFrom}
        account={account}
        profile={profile}
        markAsAccepted={markAsAccepted}
        disabled={ids.includes(formatStringToHtmlId(`${MARK_AS_BUTTON}${answerId}`))}
        correctAnswerId={correctAnswerId}
        whoWasAccepted={whoWasAccepted}
      />

      {Boolean(isTheLargestRating) && (
        <Label bg={BG_PRIMARY} inactive>
          <Icon className="d-inline-flex mr-2" icon={crownIcon} width="11" />
          {t('post.communityChoice')}
        </Label>
      )}

      {Boolean(isOfficial) && (
        <Label bg={`rgba(${BG_PRIMARY_RGB}, 0.2)`} border={BG_PRIMARY} color={BG_PRIMARY} inactive>
          <Icon className="d-inline-flex mr-2" icon={officialIcon} width="16" color={BG_PRIMARY} />
          {t('post.officialAnswer')}
        </Label>
      )}
    </Div>
  );
};

BestAnswerMarker.propTypes = {
  answerId: PropTypes.number,
  questionFrom: PropTypes.string,
  account: PropTypes.string,
  markAsAccepted: PropTypes.func,
  correctAnswerId: PropTypes.number,
  whoWasAccepted: PropTypes.string,
  isTheLargestRating: PropTypes.bool,
  markAsAcceptedLoading: PropTypes.bool,
  ids: PropTypes.array,
  isItWrittenByMe: PropTypes.bool,
  questionId: PropTypes.string,
  isOfficial: PropTypes.bool,
  profileInfo: PropTypes.object,
  author: PropTypes.object,
};

export default React.memo(
  connect(
    (state) => ({
      profileInfo: makeSelectProfileInfo()(state),
    }),
    null,
  )(BestAnswerMarker),
);
