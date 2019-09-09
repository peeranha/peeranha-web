import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import communitiesHeader from 'images/communitiesHeader.svg?inline';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?inline';

import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import { MediumImageStyled } from 'components/Img/MediumImage';
import SubHeaderWrapper from 'components/Header/Complex';

import { Button, Menu } from 'components/ExistingCommunities/SubHeader';

import messages from './messages';

const SubHeader = ({ setLang, language, languages }) => (
  <SubHeaderWrapper position="bottom">
    <H3>
      <MediumImageStyled
        src={communitiesHeader}
        alt="communities-voting-header"
      />
      <FormattedMessage {...messages.votingForNewComm} />
    </H3>

    <div className="right-panel">
      <Dropdown
        button={<Button sorting={language} icon={communitiesHeaderFilter} />}
        menu={
          <Menu
            changeSorting={setLang}
            sorting={language}
            options={languages}
          />
        }
        id="choose-language-dropdown"
        isArrowed
      />
    </div>
  </SubHeaderWrapper>
);

SubHeader.propTypes = {
  setLang: PropTypes.func,
  language: PropTypes.object,
  languages: PropTypes.object,
};

export default React.memo(SubHeader);
