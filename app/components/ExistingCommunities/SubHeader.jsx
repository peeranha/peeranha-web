/* eslint no-unused-vars: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import { TEXT_SECONDARY } from 'style-constants';

import communitiesHeader from 'images/communitiesHeader.svg?inline';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?inline';
import languageIcon from 'images/ico-languages.svg?inline';

import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import Span from 'components/Span';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';
import { MediumImageStyled } from 'components/Img/MediumImage';
import SubHeaderWrapper from 'components/Header/Complex';

import sortingOptions from './sortingOptions';

const Button = ({ sorting, icon }) => (
  <Span className="d-inline-flex align-items-center mr-2 text-capitalize" bold>
    <img className="mr-2" src={icon} alt="icon" />
    <FormattedMessage {...sorting.message} />
  </Span>
);

const Menu = ({ changeSorting, sorting, options }) => (
  <Ul>
    {Object.keys(options).map(x => (
      <CheckedItem
        key={`${options[x].message}_${options[x].order}`}
        onClick={() => changeSorting(options[x])}
        isActive={sorting.message === options[x].message}
      >
        <FormattedMessage {...options[x].message} />
      </CheckedItem>
    ))}
  </Ul>
);

export const SubHeader = ({
  changeSorting,
  sorting,
  communitiesNumber,
  setLang,
  language,
  languages,
}) => (
  <SubHeaderWrapper position="bottom" isColumnForSM>
    <H3>
      <MediumImageStyled src={communitiesHeader} alt="communitiesHeader" />

      <span>
        <FormattedMessage {...commonMessages.communities} />
        <Span className="ml-2" color={TEXT_SECONDARY} fontSize="30" bold>
          {communitiesNumber}
        </Span>
      </span>
    </H3>

    <div className="d-flex right-panel">
      {/* <Dropdown
        className="mr-3"
        button={<Button sorting={language} icon={languageIcon} />}
        menu={
          <Menu
            changeSorting={setLang}
            sorting={language}
            options={languages}
          />
        }
        id="choose-language-dropdown"
        isArrowed
      /> */}

      <Dropdown
        button={<Button sorting={sorting} icon={communitiesHeaderFilter} />}
        menu={
          <Menu
            changeSorting={changeSorting}
            sorting={sorting}
            options={sortingOptions}
          />
        }
        id="existing-communities-dropdown"
        isArrowed
      />
    </div>
  </SubHeaderWrapper>
);

Button.propTypes = {
  sorting: PropTypes.object,
  icon: PropTypes.string,
};

Menu.propTypes = {
  options: PropTypes.object,
  sorting: PropTypes.object,
  changeSorting: PropTypes.func,
};

SubHeader.propTypes = {
  sorting: PropTypes.object,
  changeSorting: PropTypes.func,
  setLang: PropTypes.func,
  communitiesNumber: PropTypes.number,
  language: PropTypes.object,
  languages: PropTypes.object,
};

export { Button, Menu };
export default React.memo(SubHeader);
