import React from 'react';
import PropTypes from 'prop-types';

import Popover from 'components/common/Popover';
import { Trans, useTranslation } from 'react-i18next';
import { graphCommunityColors } from 'utils/communityManagement';
import { TARGET_BLANK } from 'utils/constants';

const graphCommunity = graphCommunityColors();

export const tooltipStyle = {
  background: graphCommunity ? '#161425' : 'rgb(255,255,255)',
  fontSize: '16px',
  lineHeight: '16px',
  letterSpacing: '0.3px',
  width: '264px',
  filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.25))',
  color: graphCommunity ? '#E1E1E4' : 'inherit',
  border: graphCommunity ? '1px solid #3D3D54' : 'none',
  borderRadius: '5px',
};

export const OptimisticPopover = ({ isOptimisticPost, networkId, transactionHash, children }) => {
  const { t } = useTranslation();
  const NETWORK_TO_URL = {
    1: process.env.POLYGON_TRANSACTION_INFO_URL,
    2: process.env.EDGEWARE_TRANSACTION_INFO_URL,
  };
  const explorerUrl = NETWORK_TO_URL[networkId];

  return (
    <Popover event={isOptimisticPost ? 'hover' : undefined} placement="top">
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content>
        <div className="p16" css={tooltipStyle}>
          <Trans
            i18nKey="post.actionNotAvailable"
            values={{
              transaction: t('post.transaction'),
            }}
            components={[
              <a
                key={explorerUrl + transactionHash}
                href={explorerUrl + transactionHash}
                target={TARGET_BLANK}
              />,
            ]}
          />
        </div>
      </Popover.Content>
    </Popover>
  );
};

OptimisticPopover.propTypes = {
  isOptimisticPost: PropTypes.bool,
  networkId: PropTypes.number,
  transactionHash: PropTypes.string,
};
