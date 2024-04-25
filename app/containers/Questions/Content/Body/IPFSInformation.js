/* eslint-disable no-nested-ternary */
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { BG_LIGHT, BORDER_RADIUS_L } from 'style-constants';
import ipfsLogo from 'images/ipfs-logo.svg?external';

import { getIpfsHashFromBytes32 } from 'utils/ipfs.js';
import { getFormattedDate } from 'utils/datetime';
import { isSuiBlockchain, MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';
import { graphCommunityColors, singleCommunityColors } from 'utils/communityManagement';

import { messengerData } from 'containers/ViewQuestion/BotInfo';
import { IconSm } from 'components/Icon/IconWithSizes';
import A from 'components/A';
import Span from 'components/Span';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const Label = styled.div`
  position: absolute;
  background-color: ${graphCommunity ? '#161425' : BG_LIGHT};
  border-radius: ${BORDER_RADIUS_L};
  width: ${({ isSocialPostType }) => (isSocialPostType ? 'max-content' : '455px')};
  left: 50%;
  top: calc(100% + 10px);
  transform: translateX(-95%);
  z-index: 8;
  max-height: 350px;
  overflow: auto;
  box-shadow: 0 0 4px 0 ${graphCommunity ? '#3D3D54' : 'rgba(0, 0, 0, 0.3)'};
  text-align: left;
  padding: 15px;
  border: ${graphCommunity ? '1px solid #3D3D54' : 'none'};
  @media only screen and (max-width: 600px) {
    transform: translateX(-98%);
    width: 88vw;
  }
`;

const IPFSInformation = ({
  locale,
  ipfsHash,
  histories,
  networkId,
  isSocialPostType,
  messenger,
}) => {
  const { t } = useTranslation();
  const columns = {
    transactionHash: t('post.transactionHash'),
    eventName: t('post.eventName'),
    timeStamp: t('post.timeStamp'),
  };

  const hashString = getIpfsHashFromBytes32(ipfsHash);
  const explorerUrl = isSuiBlockchain
    ? process.env.SUI_TRANSACTION_INFO_URL
    : networkId === 1
    ? process.env.POLYGON_TRANSACTION_INFO_URL
    : process.env.EDGEWARE_TRANSACTION_INFO_URL;
  const ipfsURL = process.env.IPFS_CDN_URL;

  const formattedData = histories?.map(
    ({ transactionHash, eventName, timeStamp, eventEntity }) => ({
      transactionHash: (
        <A
          target="_blank"
          to={{
            pathname: isSuiBlockchain
              ? explorerUrl.replace('{0}', transactionHash)
              : explorerUrl + transactionHash,
          }}
          href={
            isSuiBlockchain
              ? explorerUrl.replace('{0}', transactionHash)
              : explorerUrl + transactionHash
          }
        >
          {`${transactionHash.substring(0, 12)}...`}
        </A>
      ),
      eventName: `${t(`post.${eventEntity}`)} ${t(`post.${eventName}`)}`,
      timeStamp: getFormattedDate(timeStamp, locale, MONTH_3LETTERS__DAY_YYYY_TIME),
    }),
  );

  return (
    <Label isSocialPostType={isSocialPostType}>
      {isSocialPostType ? (
        <div className="df fdc">
          <Span fontSize="16" lineHeight="24">
            <A
              target="_blank"
              to={{ pathname: messenger?.messageLink }}
              href={ipfsURL + hashString}
              css={{
                color: graphCommunity ? '#6F4CFF' : colors.linkColor || 'rgba(87, 111, 237, 1)',
              }}
            >
              {t('post.linkToMessage')}
            </A>
          </Span>
        </div>
      ) : (
        <>
          <IconSm icon={ipfsLogo} className="mr-1" />
          <Span fontSize="14">
            {t('common.ipfsHashValue')}
            {': '}
            <A target="_blank" to={{ pathname: ipfsURL + hashString }} href={ipfsURL + hashString}>
              {hashString}
            </A>
          </Span>

          {formattedData?.length > 0 && (
            <table className="table mt-2 mb-0" css={graphCommunity && { color: '#E1E1E4' }}>
              <thead>
                <tr>
                  {Object.values(columns).map((column, index) => (
                    <th key={`${column}${index}`}>{column}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {formattedData.map((item) => (
                  <tr key={item.transactionHash.props.children}>
                    {Object.keys(columns).map((column, index) => (
                      <td key={`${column}${index}`}>{item[column]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </Label>
  );
};

IPFSInformation.propTypes = {
  locale: PropTypes.string,
  ipfsHash: PropTypes.string,
  histories: PropTypes.array,
  networkId: PropTypes.string,
  isSocialPostType: PropTypes.bool,
  messenger: PropTypes.object,
};

export default IPFSInformation;
