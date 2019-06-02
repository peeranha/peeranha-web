import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import { TEXT_SECONDARY } from 'style-constants';

import commonMessages from 'common-messages';
import icoTagIcon from 'images/icoTag.svg?inline';
import arrowLeft from 'images/arrowLeft.svg?inline';

import communitiesHeaderFilter from 'images/communitiesHeaderFilter.svg?inline';

import H3 from 'components/H3';
import Dropdown from 'components/Dropdown';
import ArrowIcon from 'components/Dropdown/ArrowIcon';
import Span from 'components/Span';
import Ul from 'components/Ul';
import CheckedItem from 'components/Li/CheckedItem';
import { MediumImageStyled } from 'components/Img/MediumImage';

import Base from 'components/Base';
import NavigationButton from 'components/Button/Contained/Navigation';
import A from 'components/A';

import messages from './messages';
import options from './options';

const tagsRoute = routes.tags();

const H3Styled = H3.extend`
  ${ArrowIcon} {
    transform: scale(0.6);
  }
`;

const Button = /* istanbul ignore next */ ({ sorting }) => (
  <Span className="d-inline-flex align-items-center mr-2 text-capitalize" bold>
    <img
      className="mr-2"
      src={communitiesHeaderFilter}
      alt="communitiesHeaderFilter"
    />
    <FormattedMessage {...options[sorting].message} />
  </Span>
);

const Menu = /* istanbul ignore next */ ({ sortTags, sorting }) => (
  <Ul>
    {Object.keys(options).map(x => (
      <CheckedItem
        key={x}
        data-key={x}
        onClick={sortTags}
        isActive={x === sorting}
      >
        <FormattedMessage {...options[x].message} />
      </CheckedItem>
    ))}
  </Ul>
);

export const Header = /* istanbul ignore next */ ({
  goToCreateTagScreen,
  sortTags,
  sorting,
  currentCommunity,
  tagsNumber,
}) => {
  const path = window.location.pathname + window.location.hash;

  const communityTagsRoute = routes.communityTags(currentCommunity.id);
  const suggestedTagsRoute = routes.suggestedTags(currentCommunity.id);

  return (
    <div>
      <Base
        className="d-flex align-items-center justify-content-between"
        position="top"
      >
        <div>
          <A to={tagsRoute} href={tagsRoute}>
            <NavigationButton className="pl-0" isLink>
              <img className="mr-2" src={arrowLeft} alt="x" />
              <FormattedMessage {...messages.backToList} />
            </NavigationButton>
          </A>

          <A
            to={communityTagsRoute}
            href={communityTagsRoute}
            disabled={path === communityTagsRoute}
          >
            <NavigationButton isLink={path !== communityTagsRoute}>
              <FormattedMessage {...commonMessages.tags} />
            </NavigationButton>
          </A>

          <A
            to={suggestedTagsRoute}
            href={suggestedTagsRoute}
            disabled={path === suggestedTagsRoute}
          >
            <NavigationButton isLink={path !== suggestedTagsRoute}>
              <FormattedMessage {...commonMessages.voting} />
            </NavigationButton>
          </A>
        </div>

        <div>
          <NavigationButton
            onClick={goToCreateTagScreen}
            className="d-inline-flex align-items-center px-0 py-1"
            isLink
          >
            <img className="mr-1" src={icoTagIcon} alt="icoTagIcon" />
            <FormattedMessage {...commonMessages.suggestTag} />
          </NavigationButton>
        </div>
      </Base>

      <Base position="bottom">
        <H3Styled className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <MediumImageStyled
              src={currentCommunity.avatar}
              alt="communitiesHeader"
            />

            {currentCommunity.name}

            {tagsNumber && (
              <Span
                className="text-lowercase ml-3"
                color={TEXT_SECONDARY}
                fontSize="30"
                bold
              >
                <span>{`${tagsNumber} `}</span>
                <FormattedMessage {...commonMessages.tags} />
              </Span>
            )}
          </div>

          <Dropdown
            button={<Button sorting={sorting} />}
            menu={<Menu sortTags={sortTags} sorting={sorting} />}
            id="tags-dropdown"
            isArrowed
          />
        </H3Styled>
      </Base>
    </div>
  );
};

Button.propTypes = {
  sorting: PropTypes.string,
};

Menu.propTypes = {
  sorting: PropTypes.string,
  sortTags: PropTypes.func,
};

Header.propTypes = {
  currentCommunity: PropTypes.object,
  goToCreateTagScreen: PropTypes.func,
  sortTags: PropTypes.func,
  sorting: PropTypes.string,
  tagsNumber: PropTypes.number,
};

export default React.memo(Header);
