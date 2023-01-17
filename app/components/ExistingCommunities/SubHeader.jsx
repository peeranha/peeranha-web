/* eslint no-unused-vars: 0 */
import Dropdown from 'components/common/Dropdown';
import { ArrowDown } from 'components/icons';
import useTrigger from 'hooks/useTrigger';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { css } from '@emotion/react';
import commonMessages from 'common-messages';
import { DARK_SECONDARY, TEXT_SECONDARY } from 'style-constants';

import communitiesHeader from 'images/communitiesHeader.svg?inline';
import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?inline';

import H3 from 'components/H3';
import Span from 'components/Span';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';
import { MediumImageStyled } from 'components/Img/MediumImage';
import SubHeaderWrapper, {
  SubHeaderWrapperRightPanel,
} from 'components/Header/Complex';

import sortingOptions from './sortingOptions';

const Button = ({ sorting, icon }) => {
  const [isOpen, open, close] = useTrigger(false);
  document.addEventListener('click', () => {
    if (isOpen) {
      close();
    }
  });
  return (
    <Span
      className="d-inline-flex align-items-center mr-2 text-capitalize"
      bold
      onClick={(event) => {
        event.stopPropagation();
        isOpen ? close() : open();
      }}
    >
      <img className="mr-2" src={icon} alt="icon" />

      <div
        css={css`
          display: none;
          @media (min-width: 768px) {
            display: inline;
          }
        `}
      >
        <FormattedMessage id={sorting.message.id} />

        <ArrowDown
          css={{
            color: DARK_SECONDARY,
            width: 18,
            height: 18,
            transition: 'transform 0.5s',
            ...(isOpen && { transform: 'rotate(180deg)' }),
          }}
        />
      </div>
    </Span>
  );
};

const Menu = ({ changeSorting, sorting, options }) => (
  <Ul>
    {Object.keys(options).map((x) => (
      <CheckedItem
        key={`${options[x].message.id}_${options[x].order}`}
        onClick={() => changeSorting(options[x])}
        isActive={sorting.message.id === options[x].message.id}
      >
        <FormattedMessage id={options[x].message.id} />
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
}) => {
  const options = Object.keys(sortingOptions).map((x, index) => ({
    label: <FormattedMessage {...sortingOptions[x].message} />,
    value: index,
    render: (
      <CheckedItem
        key={`${sortingOptions[x].message.id}_${sortingOptions[x].order}`}
        onClick={() => changeSorting(sortingOptions[x])}
        isActive={sorting.message.id === sortingOptions[x].message.id}
        css={css`padding-left: 0; !important;`}
      >
        <FormattedMessage {...sortingOptions[x].message} />
      </CheckedItem>
    ),
  }));

  return (
    <SubHeaderWrapper position="bottom">
      <H3>
        <MediumImageStyled src={communitiesHeader} alt="communitiesHeader" />

        <span>
          <FormattedMessage id={commonMessages.communities.id} />
          <Span className="ml-2" color={TEXT_SECONDARY} fontSize="30" bold>
            {communitiesNumber}
          </Span>
        </span>
      </H3>

      <SubHeaderWrapperRightPanel className="d-flex right-panel">
        <Dropdown
          options={options}
          trigger={<Button sorting={sorting} icon={communitiesHeaderFilter} />}
          id="existing-communities-dropdown"
          appendTo="parent"
        />
      </SubHeaderWrapperRightPanel>
    </SubHeaderWrapper>
  );
};

Button.propTypes = {
  sorting: PropTypes.object,
  icon: PropTypes.string,
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
