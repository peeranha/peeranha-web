import React from 'react';
import commonMessages from 'common-messages';
import { translationMessages } from 'i18n';
import styled from 'styled-components';
import { BG_LIGHT, BORDER_RADIUS_L } from 'style-constants';
import PropTypes from 'prop-types';
import { getIpfsHashFromBytes32 } from 'utils/ipfs.js';
import Span from 'components/Span';
import A from 'components/A';

const Label = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${BG_LIGHT};
  border-radius: ${BORDER_RADIUS_L};
  width: 500px;
  top: 120px;
  z-index: 10000;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  text-align: left;
  padding: 15px;
  left: -30px;
`;

const NFTInformation = ({ id, locale, ipfsHash, contractAddress }) => {
  const contractAddressURL =
    process.env.BLOCKCHAIN_EXPLORERE_URL + contractAddress;

  return (
    <Label>
      <Span>
        {'ID: '}
        {id}
      </Span>
      <Span>
        {translationMessages[locale][commonMessages.ipfsHashValue.id]}
        {': '}
        {ipfsHash}
      </Span>
      <A
        target="_blank"
        to={{ pathname: contractAddressURL }}
        href={contractAddressURL}
      >
        {translationMessages[locale][commonMessages.contractAddress.id]}
        {': '}
        {contractAddress}
      </A>
    </Label>
  );
};

NFTInformation.PropTypes = {
  id: PropTypes.number,
  locale: PropTypes.string,
  ipfsHash: PropTypes.string,
  contractAddress: PropTypes.string,
};

export default NFTInformation;
