import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import Input from 'components/Input';
import Wrapper from 'components/FormFields/Wrapper';
import messages from 'components/FormFields/messages';

import okay from 'images/okayGreen.svg?inline';
import notOkay from 'images/notOkayRed.svg?inline';
import dangerIcon from 'images/dangerIcon.svg?inline';

import {
  telosCorrectSymbols,
  telosNameLength,
} from 'components/FormFields/validate';

const Div = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: center;

  img {
    height: 13px;
    width: 13px;
    margin-right: 10px;
  }
`;

export const MyOwnTelosNameForm = ({
  input,
  label,
  readOnly,
  disabled,
  meta,
  placeholder,
  isSearchable,
  isRefreshable,
  tip,
  splitInHalf,
  onClick,
  type = 'text',
  autoComplete,
  insideOfSection,
}) => {
  const { value } = input;
  const correctSymbols = telosCorrectSymbols(value);
  const correctLength = telosNameLength(value);
  const isAvailable = !correctSymbols && !correctLength && !meta.error;

  return (
    <Wrapper
      label={label}
      tip={tip}
      splitInHalf={splitInHalf}
      disabled={disabled}
      id={input.name}
      insideOfSection={insideOfSection}
    >
      <Input
        input={input}
        disabled={disabled}
        readOnly={readOnly}
        placeholder={placeholder}
        isSearchable={isSearchable}
        isRefreshable={isRefreshable}
        onClick={onClick}
        autoComplete={autoComplete}
        error={meta.touched && (meta.error || meta.warning)}
        type={type}
      />
      <Div>
        <img src={!correctLength ? okay : notOkay} alt="marker" />
        <FormattedMessage {...messages.telosNameLength} />
      </Div>
      <Div>
        <img src={!correctSymbols ? okay : notOkay} alt="marker" />
        <FormattedMessage {...messages.telosCorrectSymbols} />
      </Div>
      <Div>
        <img src={isAvailable ? okay : notOkay} alt="not okay" />
        <FormattedMessage {...messages.thisTelosNameIsAvailable} />
      </Div>
      <Div>
        <img src={dangerIcon} alt="not okay" />
        <FormattedMessage {...messages.notAbleChangeAfterCreation} />
      </Div>
    </Wrapper>
  );
};

MyOwnTelosNameForm.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isRefreshable: PropTypes.bool,
  tip: PropTypes.string,
  splitInHalf: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  autoComplete: PropTypes.string,
  onClick: PropTypes.func,
  insideOfSection: PropTypes.bool,
  eosService: PropTypes.object,
};

export default MyOwnTelosNameForm;
