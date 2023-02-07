import { singleCommunityColors } from 'utils/communityManagement';
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { FormattedMessage } from 'react-intl';

import H3 from 'components/H3';
import Span from 'components/Span';
import styled from 'styled-components';

import commonMessages from 'common-messages';
import { META_TRANSACTIONS_ALLOWED } from 'utils/constants';
import { deleteCookie, setCookie, getCookie } from 'utils/cookie';
import { TEXT_SECONDARY, TEXT_PRIMARY } from 'style-constants';

import { BaseStyled } from './SettingsOfUser';
import A from 'components/A';
import { svgDraw } from 'components/Icon/IconStyled';

const Link = styled(A)`
  ${svgDraw({ color: TEXT_PRIMARY })};
`;

const colors = singleCommunityColors();

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
      <BaseStyled
        className={className}
        position="bottom"
        css={css`
        border-top-left-radius: 0; !important;
        border-top-right-radius: 0; !important;
      `}
      >
        <H3>
          <FormattedMessage id={commonMessages.settings.id} />
        </H3>
      </BaseStyled>
      <BaseStyled position="top" className={className}>
        <div>
          <div>
            <div className="mb-4">
              <div className="mb-2">
                <Span fontSize="18" bold>
                  <FormattedMessage id={commonMessages.transactions.id} />
                </Span>
              </div>
              <div>
                <div>
                  <Span
                    css={css`
                      color: ${colors.black || TEXT_SECONDARY};
                    `}
                    fontSize="16"
                  >
                    <FormattedMessage
                      id={commonMessages.transactionsText_1.id}
                    />
                  </Span>
                </div>
                <div>
                  <Span
                    css={css`
                      color: ${colors.black || TEXT_SECONDARY};
                    `}
                    fontSize="16"
                  >
                    <FormattedMessage
                      id={commonMessages.transactionsText_2.id}
                    />
                  </Span>
                </div>
              </div>
            </div>
          </div>
          <div className="fz16">
            <div
              className="mb-2"
              css={css`
                color: ${colors.black || ''};
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
                <FormattedMessage id={commonMessages.transactionsChange_1.id} />
              </label>
            </div>
            <div
              css={css`
                color: ${colors.black || ''};
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
                <FormattedMessage
                  className="pr-2"
                  bold
                  id={commonMessages.transactionsChange_2.id}
                />
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
