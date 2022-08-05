import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BG_LIGHT, BORDER_RADIUS_L } from 'style-constants';
import PropTypes from 'prop-types';
import { getIpfsHashFromBytes32 } from 'utils/ipfs.js';
import ipfsLogo from 'images/ipfs-logo.svg?external';
import { IconSm } from 'components/Icon/IconWithSizes';
import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';
import A from 'components/A';
import Span from 'components/Span';
import messages from 'containers/ViewQuestion/messages';

const Label = styled.div`
  position: absolute;
  background-color: ${BG_LIGHT};
  border-radius: ${BORDER_RADIUS_L};
  width: 450px;
  left: 50%;
  top: calc(100% + 10px);
  transform: translateX(-95%);
  z-index: 8;
  max-height: 350px;
  overflow: auto;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  text-align: left;
  padding: 15px;

  @media only screen and (max-width: 600px) {
    transform: translateX(-98%);
    width: 88vw;
  }
`;

const IPFSInformation = ({ locale, ipfsHash, histories }) => {
  const { t } = useTranslation();
  const columns = {
    transactionHash: t('post.transactionHash'),
    eventName: t('post.eventName'),
    timeStamp: t('post.timeStamp'),
  };

  const hashString = getIpfsHashFromBytes32(ipfsHash);
  const polygonURL = process.env.BLOCKCHAIN_TRANSACTION_INFO_URL;

  const formattedData = histories?.map(
    ({ transactionHash, eventName, timeStamp, eventEntity }) => ({
      transactionHash: (
        <A
          target="_blank"
          to={{ pathname: polygonURL + transactionHash }}
          href={polygonURL + transactionHash}
        >
          {`${transactionHash.substring(0, 12)}...`}
        </A>
      ),
      eventName: `${t(messages[eventEntity])} ${t(messages[eventName])}`,
      timeStamp: getFormattedDate(
        timeStamp,
        locale,
        MONTH_3LETTERS__DAY_YYYY_TIME,
      ),
    }),
  );

  return (
    <Label>
      <IconSm icon={ipfsLogo} className="mr-1" />
      <Span fontSize="14">
        {t('common.ipfsHashValue')}
        {': '}
        {hashString}
      </Span>

      {formattedData?.length > 0 && (
        <table className="table mt-2 mb-0">
          <thead>
            <tr>
              {Object.values(columns).map((column, index) => (
                <th key={`${column}${index}`}>{column}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {formattedData.map(item => (
              <tr key={item.transactionHash.props.children}>
                {Object.keys(columns).map((column, index) => (
                  <td key={`${column}${index}`}>{item[column]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Label>
  );
};

IPFSInformation.propTypes = {
  locale: PropTypes.string,
  ipfsHash: PropTypes.string,
  histories: PropTypes.array,
};

export default IPFSInformation;
