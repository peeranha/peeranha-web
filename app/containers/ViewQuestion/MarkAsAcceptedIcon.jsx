import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import {
  BG_LIGHT,
  BG_TRANSPARENT,
  BG_SUCCESS,
  BORDER_SUCCESS,
  TEXT_LIGHT,
  TEXT_DARK,
  BG_SUCCESS_LIGHT,
} from 'style-constants';

import okayIconWhite from 'images/okay.svg?inline';
import okayIconGreen from 'images/okayGreen.svg?inline';

import { Icon } from 'components/Input/Checkbox';
import AcceptAnswerView from 'components/Button/Contained/SuccessMedium';

import messages from './messages';

export const MarkAnswerNotification = styled.div`
  display: inline-flex;
  border-radius: 3px;
  background-color: ${BG_SUCCESS_LIGHT};
  padding: 5px 15px 5px 10px;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 8px;
`;

export const LabelStyles = css`
  height: 32px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  color: ${TEXT_LIGHT};
`;

const Label = AcceptAnswerView.extend`
  ${LabelStyles};
  pointer-events: ${x => (x.inactive ? 'none' : 'auto')};
  background: ${x => (!x.value ? BG_TRANSPARENT : BG_SUCCESS)};
  border: ${x => (!x.value ? '1' : '0')}px solid ${BORDER_SUCCESS};
  color: ${x => (!x.value ? TEXT_DARK : TEXT_LIGHT)};
  padding: ${x => (!x.value ? '0 10px 0 5px' : '0px 10px')};

  ${Icon} {
    background-color: ${BG_LIGHT};
    background-image: url(${x => (x.value ? okayIconGreen : '')});
    border: ${x => (!x.value ? '1' : '0')}px solid ${BORDER_SUCCESS};
    box-shadow: none;
  }
`;

export const MarkAsAcceptedIcon = ({
  correctAnswerId,
  answerId,
  questionFrom,
  account,
  id,
  markAsAccepted,
  disabled,
  whoWasAccepted,
  className,
  isGeneral,
}) => {
  if (isGeneral) return null;

  // There is accepted answer && I am not question's author
  if (
    correctAnswerId === answerId &&
    answerId !== 0 &&
    account !== questionFrom
  ) {
    return (
      <Label className={`mr-2 ${className}`} inactive value>
        <img className="d-inline-flex mr-2" src={okayIconWhite} alt="icon" />
        <FormattedMessage {...messages.theBest} />
      </Label>
    );
  }

  // I am question's author
  if (answerId !== 0 && account === questionFrom) {
    return (
      <Label
        className={className}
        onClick={markAsAccepted}
        data-answerid={correctAnswerId === answerId ? 0 : answerId}
        data-whowasaccepted={whoWasAccepted}
        disabled={disabled}
        value={correctAnswerId === answerId}
        id={id}
      >
        <Icon />
        <FormattedMessage
          {...messages[
            correctAnswerId === answerId ? 'theBestAnswer' : 'markAsBest'
          ]}
        />
      </Label>
    );
  }

  // There is no accepted answer && I am not question's author
  return null;
};

MarkAsAcceptedIcon.propTypes = {
  correctAnswerId: PropTypes.number,
  answerId: PropTypes.number,
  questionFrom: PropTypes.string,
  account: PropTypes.string,
  id: PropTypes.string,
  markAsAccepted: PropTypes.func,
  whoWasAccepted: PropTypes.string,
  className: PropTypes.string,
  markAsAcceptedLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  isGeneral: PropTypes.bool,
};

export default React.memo(MarkAsAcceptedIcon);
