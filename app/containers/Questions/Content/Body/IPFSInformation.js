import React from 'react';
import commonMessages from 'common-messages';
import { translationMessages } from 'i18n';
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
  top: 25px;
  z-index: 10000;
  max-height: 350px;
  overflow-y: scroll;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  text-align: left;
  padding: 15px;
  left: -401px;
`;

const IPFSInformation = ({ locale, ipfsHash, histories }) => {
  const columns = {
    transactionHash: translationMessages[locale][messages.transactionHash.id],
    eventName: translationMessages[locale][messages.eventName.id],
    timeStamp: translationMessages[locale][messages.timeStamp.id],
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
          {transactionHash.substring(0, 12) + '...'}
        </A>
      ),
      eventName:
        translationMessages[locale][messages[eventEntity].id] +
        ' ' +
        translationMessages[locale][messages[eventName].id],
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
        {translationMessages[locale][commonMessages.ipfsHashValue.id]}
        {': '}
        {hashString}
      </Span>

      {formattedData?.length > 0 && (
        <table className="table mt-1 mb-0">
          <thead>
            {Object.values(columns).map(column => <th>{column}</th>)}
          </thead>

          <tbody>
            {formattedData.map(item => (
              <tr>
                {Object.keys(columns).map(column => <td>{item[column]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Label>
  );
};

IPFSInformation.PropTypes = {
  locale: PropTypes.string,
  ipfsHash: PropTypes.string,
  histories: PropTypes.array,
};

export default IPFSInformation;
