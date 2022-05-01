import React from 'react';
import commonMessages from 'common-messages';
import { translationMessages } from 'i18n';
import styled from 'styled-components';
import { BG_LIGHT, BORDER_RADIUS_L } from 'style-constants';
import PropTypes from 'prop-types';
import { getIpfsHashFromBytes32 } from 'utils/ipfs.js';
import Span from 'components/Span';

const Label = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${BG_LIGHT};
  border-radius: ${BORDER_RADIUS_L};
  width: 420px;
  top: 120px;
  z-index: 10000;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  text-align: left;
  padding: 15px;
  left: -30px;
`;

const NFTInformation = ({ id, locale, ipfsHash, contractAddress }) => {
  const hashString = getIpfsHashFromBytes32(ipfsHash);

  return (
    <Label>
      <Span fontSize="14">
        {'ID: '}
        {id}
      </Span>
      <Span fontSize="14">
        {translationMessages[locale][commonMessages.ipfsHashValue.id]}
        {': '}
        {hashString}
      </Span>
      <Span fontSize="14">
        {translationMessages[locale][commonMessages.contractAddress.id]}
        {': '}
        {contractAddress}
      </Span>
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
