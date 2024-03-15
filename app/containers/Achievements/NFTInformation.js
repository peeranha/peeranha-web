import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { BG_LIGHT, BORDER_RADIUS_L } from 'style-constants';
import PropTypes from 'prop-types';
import Span from 'components/Span';
import A from 'components/A';
import { graphCommunityColors } from 'utils/communityManagement';

const graphCommunity = graphCommunityColors();

const Label = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: ${graphCommunity ? '#161425' : BG_LIGHT};
  border-radius: ${BORDER_RADIUS_L};
  width: 500px;
  top: 120px;
  z-index: 10000;
  box-shadow: 0 0 4px 0 ${graphCommunity ? '#3D3D54' : 'rgba(0, 0, 0, 0.3)'};
  text-align: left;
  padding: 15px;
  left: -30px;
`;

const NFTInformation = ({ id, ipfsHash, contractAddress }) => {
  const { t } = useTranslation();
  const contractAddressURL = process.env.BLOCKCHAIN_EXPLORERE_URL + contractAddress;

  return (
    <Label>
      <Span>
        {'ID: '}
        {id}
      </Span>
      <Span>
        {t('common.ipfsHashValue')}
        {': '}
        {ipfsHash}
      </Span>
      <A target="_blank" to={{ pathname: contractAddressURL }} href={contractAddressURL}>
        {t('common.contractAddress')}
        {': '}
        {contractAddress}
      </A>
    </Label>
  );
};

NFTInformation.PropTypes = {
  id: PropTypes.number,
  ipfsHash: PropTypes.string,
  contractAddress: PropTypes.string,
};

export default NFTInformation;
