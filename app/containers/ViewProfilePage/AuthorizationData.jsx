import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import H3 from 'components/H3';
import Span from 'components/Span';

import { META_TRANSACTIONS_ALLOWED } from 'utils/constants';
import { deleteCookie, setCookie, getCookie } from 'utils/cookie';
import { TEXT_SECONDARY } from 'style-constants';

import { BaseStyled } from './SettingsOfUser';

const AuthorizationData = ({
  locale,
  ownerKey,
  loginData,
  className,
  activeKey,
  writeToBuffer,
  tgData,
  profile,
}) => {
  const { t } = useTranslation();
  const metaTransactionsAllowed = getCookie(META_TRANSACTIONS_ALLOWED);

  const [metaTransactions, setMetaTransactions] = React.useState(
    metaTransactionsAllowed,
  );

  const handleMetaTransactionsAllowed = () => {
    setCookie({
      name: META_TRANSACTIONS_ALLOWED,
      value: true,
      options: {
        neverExpires: true,
        defaultPath: true,
        allowSubdomains: true,
      },
    });
    setMetaTransactions(true);
  };

  const handleMetaTransactionsDisallowed = () => {
    deleteCookie(META_TRANSACTIONS_ALLOWED);
    setMetaTransactions(false);
  };
  return (
    <>
      <BaseStyled className={className} position="bottom">
        <H3>{t('common.settings')}</H3>
      </BaseStyled>
      <BaseStyled position="top" notRoundedStyle className={className}>
        <div>
          <div>
            <div className="mb-4">
              <div className="mb-2">
                <Span fontSize="18" bold>
                  {t('common.transactions')}
                </Span>
              </div>
              <div>
                <div>
                  <Span
                    css={css`
                      color: ${TEXT_SECONDARY};
                    `}
                    fontSize="16"
                  >
                    {t('common.transactionsText_1')}
                  </Span>
                </div>
                <div>
                  <Span
                    css={css`
                      color: ${TEXT_SECONDARY};
                    `}
                    fontSize="16"
                  >
                    {t('common.transactionsText_2')}
                  </Span>
                </div>
              </div>
            </div>
          </div>
          <div className="fz16">
            <div
              className="mb-2"
              css={css`
                font-weight: ${metaTransactions ? 'bold' : 'normal'};
              `}
            >
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  checked={metaTransactions}
                  onChange={handleMetaTransactionsAllowed}
                />
                {t('common.transactionsChange_1')}
              </label>
            </div>
            <div
              css={css`
                font-weight: ${!metaTransactions ? 'bold' : 'normal'};
              `}
            >
              <label>
                <input
                  className="mr-2"
                  type="radio"
                  checked={!metaTransactions}
                  onChange={handleMetaTransactionsDisallowed}
                />
                <span className="pr-2" bold>
                  {t('common.transactionsChange_2')}
                </span>
              </label>
            </div>
          </div>
        </div>
      </BaseStyled>
    </>
  );
};

AuthorizationData.propTypes = {
  className: PropTypes.string,
  locale: PropTypes.string,
  ownerKey: PropTypes.string,
  activeKey: PropTypes.string,
  loginData: PropTypes.object,
  isAvailable: PropTypes.bool,
  writeToBuffer: PropTypes.func,
  tgData: PropTypes.object,
  profile: PropTypes.object,
};

export default AuthorizationData;
