import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import communitiesHeader from 'images/communitiesHeader.svg';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg';

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

const Button = ({ sorting }) => (
  <Span className="d-inline-flex align-items-center mr-2 text-capitalize" bold>
    <img
      className="mr-2"
      src={communitiesHeaderFilter}
      alt="communitiesHeaderFilter"
    />
    <FormattedMessage {...sorting.message} />
  </Span>
);

const Menu = ({ changeSorting, sorting }) => (
  <Ul>
    {Object.keys(sortingOptions).map(x => (
      <CheckedItem
        onClick={() => changeSorting(sortingOptions[x])}
        isActive={sorting.message === sortingOptions[x].message}
      >
        <FormattedMessage {...sortingOptions[x].message} />
      </CheckedItem>
    ))}
  </Ul>
);

const SubHeader = ({ changeSorting, sorting, communitiesNumber }) => (
  <H3Styled className="d-flex align-items-end justify-content-between">
    <div className="d-flex align-items-center">
      <MediumImageStyled src={communitiesHeader} alt="communitiesHeader" />
      <FormattedMessage {...commonMessages.communities} />
      <Span className="ml-2" color="gray" fontSize="30" bold>
        {communitiesNumber}
      </Span>
    </div>

    <Dropdown
      button={<Button sorting={sorting} />}
      menu={<Menu changeSorting={changeSorting} sorting={sorting} />}
      isArrowed
    />
  </H3Styled>
);

Button.propTypes = {
  sorting: PropTypes.object,
};

Menu.propTypes = {
  sorting: PropTypes.object,
  changeSorting: PropTypes.func,
};

SubHeader.propTypes = {
  sorting: PropTypes.object,
  changeSorting: PropTypes.func,
  communitiesNumber: PropTypes.number,
};

export default React.memo(SubHeader);
