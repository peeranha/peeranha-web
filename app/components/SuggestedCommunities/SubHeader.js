import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import communitiesHeader from 'images/communitiesHeader.svg';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg';

import Dropdown from 'components/Dropdown';
import { MediumImageStyled } from 'components/Img/MediumImage';

import {
  Button,
  Menu,
  H3Styled,
} from 'components/ExistingCommunities/SubHeader';

import messages from './messages';

const SubHeader = /* istanbul ignore next */ ({
  setLang,
  language,
  languages,
}) => (
  <H3Styled className="d-flex align-items-end justify-content-between">
    <div>
      <MediumImageStyled
        src={communitiesHeader}
        alt="communities-voting-header"
      />
      <FormattedMessage {...messages.votingForNewComm} />
    </div>

    <Dropdown
      className="mr-3"
      button={<Button sorting={language} icon={communitiesHeaderFilter} />}
      menu={
        <Menu changeSorting={setLang} sorting={language} options={languages} />
      }
      id="choose-language-dropdown"
      isArrowed
    />
  </H3Styled>
);

SubHeader.propTypes = {
  setLang: PropTypes.func,
  language: PropTypes.object,
  languages: PropTypes.object,
};

export default React.memo(SubHeader);
