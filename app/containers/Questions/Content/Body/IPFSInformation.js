import React from 'react';
import commonMessages from 'common-messages';
import { translationMessages } from 'i18n';
import styled from 'styled-components';
import { BG_LIGHT, TEXT_DARK, BORDER_RADIUS_L } from 'style-constants';
import PropTypes from 'prop-types';
import { getIpfsHashFromBytes32 } from 'utils/ipfs.js';
import ipfsLogo from 'images/ipfs-logo.svg?external';
import { IconSm } from 'components/Icon/IconWithSizes';

const Label = styled.div`
  position: absolute;
  background-color: ${BG_LIGHT};
  border-radius: ${BORDER_RADIUS_L};
  width: 300px;
  top: 25px;
  z-index: 100;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  text-align: left;
  padding: 15px;
  left: -251px;

  span {
    color: ${TEXT_DARK};
    font-size: 14px;
  }
`;

const IPFSInformation = ({ locale, ipfsHash }) => {
  const hashString = getIpfsHashFromBytes32(ipfsHash);

  return (
    <Label>
      <IconSm icon={ipfsLogo} className="mr-1" />
      <span>
        {translationMessages[locale][commonMessages.ipfsHashValue.id]}
        {': '}
        {hashString}
      </span>
    </Label>
  );
};

IPFSInformation.PropTypes = {
  locale: PropTypes.string,
  ipfsHash: PropTypes.string,
};

export default IPFSInformation;
