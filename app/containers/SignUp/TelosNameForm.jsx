import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import { formatStringToHtmlId } from 'utils/animation';
import { Label, Icon as StylesIcon } from 'components/Input/Checkbox';
import { APP_FONT, BORDER_PRIMARY, BORDER_SECONDARY } from 'style-constants';

import messages from './messages';

import { AUTOGENERATED, MY_OWN } from './constants';

const Icon = StylesIcon.extend`
  margin: 0;
  border-radius: 50%;
  background-image: none;
  background-color: white;
  max-height: 22px;
  max-width: 22px;
  border: ${x =>
    x.value ? `6px solid ${BORDER_PRIMARY}` : ` 1px solid ${BORDER_SECONDARY}`};
`;

const Base = styled.div`
  height: 1%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  > h6 {
    font-weight: 600;
    margin-bottom: 10px;
  }

  div {
    display: flex;
    position: relative;
    align-items: center;
  }

  input {
    position: absolute;
    opacity: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    max-height: 22px;
    max-width: 22px;
  }

  label {
    white-space: nowrap;
    margin-left: 10px;
    font-family: ${APP_FONT};
  }

  > div {
    > div:nth-child(1) {
      margin-right: 15px;
    }

    @media only screen and (max-width: 277px) {
      flex-direction: column;
      align-items: flex-start;
      height: 50px;
      justify-content: space-between;

      > div:nth-child(1) {
        margin-right: 0;
      }
    }
  }
`;

const TelosNameForm = ({ input: { value, ...input }, label, disabled }) => (
  <Base>
    <h6>{label}</h6>
    <div>
      <div>
        <div>
          <Icon value={value === AUTOGENERATED} disabled={disabled} />
          <input
            {...input}
            type="radio"
            value={AUTOGENERATED}
            checked={value === AUTOGENERATED}
            id={formatStringToHtmlId(AUTOGENERATED)}
            name={formatStringToHtmlId(AUTOGENERATED)}
            disabled={disabled}
          />
        </div>
        <Label
          htmlFor={formatStringToHtmlId(AUTOGENERATED)}
          disabled={disabled}
        >
          <FormattedMessage {...messages.autogenerated} />
        </Label>
      </div>
      <div>
        <div>
          <Icon value={value === MY_OWN} disabled={disabled} />
          <input
            {...input}
            type="radio"
            value={MY_OWN}
            checked={value === MY_OWN}
            id={formatStringToHtmlId(MY_OWN)}
            name={formatStringToHtmlId(MY_OWN)}
            disabled={disabled}
          />
        </div>
        <Label htmlFor={formatStringToHtmlId(MY_OWN)} disabled={disabled}>
          <FormattedMessage {...messages.myOwn} />
        </Label>
      </div>
    </div>
  </Base>
);

TelosNameForm.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
};

export default TelosNameForm;
