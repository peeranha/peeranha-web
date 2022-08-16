import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { CURRENCIES, WALLETS } from 'wallet-config';
import {
  BORDER_SECONDARY,
  BORDER_PRIMARY,
  BORDER_PRIMARY_RGB,
  TEXT_PRIMARY,
} from 'style-constants';

import { Wrapper } from 'components/FormFields/Wrapper';
import Label from 'components/FormFields/Label';

const Option = styled.div`
  padding: 8px 14px;
  height: 40px;
  border-radius: 3px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 12px;
  white-space: nowrap;
  cursor: pointer;
  img {
    height: 20px;
  }

  &:not(:last-child) {
    margin-right: 12px;
  }

  border: 1px solid
    ${x => (!x.isCurrentValue ? BORDER_SECONDARY : BORDER_PRIMARY)};
  box-shadow: ${x =>
    x.isCurrentValue ? `0 0 0 3px rgba(${BORDER_PRIMARY_RGB}, 0.4)` : `none`};
  ${x => (x.disabled ? `opacity: 0.6` : ``)};
`;

const B = styled.button`
  padding-bottom: 6px;
  margin-left: 5px;
  color: ${TEXT_PRIMARY};
  cursor: pointer;
`;

const LabelFitContent = styled(Label)`
  width: fit-content !important;
`;

const CurrencyField = ({
  input,
  label,
  disabled,
  meta,
  options,
  sendFromAccountFieldValue,
  selectScatterAccount,
  selectKeycatAccount,
  isPeer,
  withKeycat,
  withScatter,
  isKeycatWalletSelected,
  isScatterWalletSelected,
}) => {
  const { t } = useTranslation();

  if (!options) return null;

  const value = input.value.toJS ? input.value.toJS() : input.value;

  const selectAccount = () => {
    if (
      value.name === WALLETS.SCATTER_SQRL_WOMBAT.name ||
      value.name === WALLETS.WOMBAT.name
    ) {
      selectScatterAccount(t);
    }
    if (value.name === WALLETS.KEYCAT.name) selectKeycatAccount(t);
  };

  const isCurrency = Object.values(CURRENCIES)
    .map(el => el.name)
    .includes(value.name);

  return (
    <Wrapper
      className="mb-0"
      label={label}
      meta={meta}
      disabled={disabled}
      id={input.name}
    >
      {options.map(option => (
        <Option
          key={option.name}
          onClick={() => input.onChange(option)}
          isCurrentValue={value.name === option.name}
          disabled={disabled}
        >
          {!Array.isArray(option.logo) ? (
            <>
              <img src={option.logo} alt="logo" />
              {!option.doNotShowName &&
                option.name && <span className="ml-2">{option.name}</span>}
            </>
          ) : (
            option.logo.map((logo, i) => (
              <React.Fragment key={logo}>
                <img src={logo} alt="logo" />
                {!!option.names[i] && (
                  <span style={{ fontWeight: 600 }}>{option.names[i]}</span>
                )}
                {i !== option.logo.length - 1 ? (
                  <span className="pl-1 pr-1" style={{ fontWeight: 900 }}>
                    /
                  </span>
                ) : null}
              </React.Fragment>
            ))
          )}
        </Option>
      ))}

      {!isCurrency && (
        <div className="d-flex">
          <LabelFitContent>{t('profile.sendFromAccount')}</LabelFitContent>
          {!isPeer &&
            !(withScatter && isScatterWalletSelected) &&
            !(withKeycat && isKeycatWalletSelected) && (
              <B onClick={selectAccount} type="button">
                {t(
                  `profile.${
                    sendFromAccountFieldValue
                      ? 'changeAccount'
                      : 'chooseAccount'
                  }`,
                )}
              </B>
            )}
        </div>
      )}
    </Wrapper>
  );
};

CurrencyField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.array,
  isPeer: PropTypes.bool,
  selectScatterAccount: PropTypes.func,
  selectKeycatAccount: PropTypes.func,
  sendFromAccountFieldValue: PropTypes.string,
  withKeycat: PropTypes.bool,
  withScatter: PropTypes.bool,
  isKeycatWalletSelected: PropTypes.bool,
  isScatterWalletSelected: PropTypes.bool,
};

export default CurrencyField;
