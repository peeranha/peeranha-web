import React from 'react';
import { FormattedMessage } from 'react-intl';

import communitiesHeader from 'images/communitiesHeader.svg';

import H3 from 'components/H3';
import { MediumImageStyled } from 'components/Img/MediumImage';

import messages from './messages';

const SubHeader = () => (
  <H3 className="d-flex align-items-end">
    <MediumImageStyled
      src={communitiesHeader}
      alt="communities-voting-header"
    />
    <FormattedMessage {...messages.votingForNewComm} />
  </H3>
);

export default React.memo(SubHeader);
