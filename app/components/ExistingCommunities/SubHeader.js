import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import { TEXT_SECONDARY } from 'style-constants';

import communitiesHeader from 'images/communitiesHeader.svg?inline';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?inline';

import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import ArrowIcon from 'components/Dropdown/ArrowIcon';
import Span from 'components/Span';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';
import { MediumImageStyled } from 'components/Img/MediumImage';

import sortingOptions from './SortingOptions';

const H3Styled = H3.extend`
  ${ArrowIcon} {
    transform: scale(0.6);
  }
`;

const Button = /* istanbul ignore next */ ({ sorting, icon }) => (
  <Span className="d-inline-flex align-items-center mr-2 text-capitalize" bold>
    <img className="mr-2" src={icon} alt="icon" />
    <FormattedMessage {...sorting.message} />
  </Span>
);

const Menu = /* istanbul ignore next */ ({
  changeSorting,
  sorting,
  options,
}) => (
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

export const SubHeader = /* istanbul ignore next */ ({
  changeSorting,
  sorting,
  communitiesNumber,
  setLang,
  language,
  languages,
}) => (
  <H3Styled className="d-flex align-items-center justify-content-between">
    <div className="d-flex align-items-center">
      <MediumImageStyled src={communitiesHeader} alt="communitiesHeader" />

      <span>
        <FormattedMessage {...commonMessages.communities} />
        <Span className="ml-2" color={TEXT_SECONDARY} fontSize="30" bold>
          {communitiesNumber}
        </Span>
      </span>
    </div>

    <div className="d-flex">
      <Dropdown
        className="mr-3"
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
  </H3Styled>
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

export { Button, Menu, H3Styled };
export default React.memo(SubHeader);
