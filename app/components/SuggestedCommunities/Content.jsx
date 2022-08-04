/* eslint indent: 0, no-unused-vars: 0 */
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { BORDER_SECONDARY } from 'style-constants';

import arrowDownIcon from 'images/arrowDown.svg?external';

import P from 'components/P';
import Icon from 'components/Icon';
import Base from 'components/Base/BaseRoundedNoPadding';
import { BaseSpecial } from 'components/Base/BaseTransparent';
import { MediumImageStyled } from 'components/Img/MediumImage';
import InfinityLoader from 'components/InfinityLoader';
import BlockShadow from 'components/BlockShadow';

import { DescriptionBlock } from 'components/ExistingCommunities/Content';

import messages from './messages';

export const DEFAULT_DESCRIPTION_HEIGHT = 70;

export const BaseStyled = Base.extend`
  margin-bottom: 15px;

  > :nth-child(1) {
    img {
      margin-right: 15px;
    }

    button:not(:last-child) {
      margin-right: 10px;
    }
  }

  > :not(:last-child) {
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }
`;

export const Description = BaseSpecial.extend`
  cursor: pointer;

  ${P} {
    font-size: 16px;
    line-height: 19px;
    overflow: ${x => (!x.isOpened && x.isArrowVisible ? 'hidden' : 'visible')};
    max-height: ${x =>
      !x.isOpened ? `${DEFAULT_DESCRIPTION_HEIGHT}px` : 'auto'};
  }

  ${BlockShadow} {
    display: ${x => (!x.isOpened && x.isArrowVisible ? 'block' : 'none')};
  }
`;

const DESCRIPTION_ID = 'description-content-id';

const Item = x => {
  const [isOpened, changeView] = useState(false);
  const [isArrowVisible, changeArrowVisibility] = useState(false);

  useEffect(() => {
    const { scrollHeight } = document.getElementById(
      `${DESCRIPTION_ID}_${x.id}`,
    );

    if (scrollHeight > DEFAULT_DESCRIPTION_HEIGHT) {
      changeArrowVisibility(true);
    }
  });

  return (
    <BaseStyled key={x.id}>
      <BaseSpecial className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
        <DescriptionBlock className="flex-grow-1 mb-to-sm-2">
          <MediumImageStyled
            className="bg-transparent"
            src={x.avatar}
            alt={x.name}
          />

          <div>
            <P fontSize="24" lineHeight="31" bold>
              {x.name}
            </P>
            {/* <P className="d-none d-md-block" fontSize="14" lineHeight="18">
              <FormattedMessage {...commonMessages[x.language]} />
            </P> */}
            <P fontSize="14" lineHeight="18">
              {x.description}
            </P>
          </div>
        </DescriptionBlock>
      </BaseSpecial>

      <Description
        onClick={() => changeView(!isOpened)}
        isOpened={isOpened}
        isArrowVisible={isArrowVisible}
      >
        <P className="d-flex align-items-center mb-2" bold>
          <FormattedMessage {...messages.whyWeeNeedIt} />
          <Icon
            className={!isArrowVisible ? 'd-none' : 'ml-2'}
            icon={arrowDownIcon}
            rotate={isOpened}
            width="12"
          />
        </P>

        <div className="position-relative">
          <P id={`${DESCRIPTION_ID}_${x.id}`}>{x.main_description}</P>
          <BlockShadow />
        </div>
      </Description>
    </BaseStyled>
  );
};

const Content = ({
  suggestedCommunities,
  suggestedCommunitiesLoading,
  isLastFetch,
  getSuggestedCommunities,
  language,
}) => {
  if (!suggestedCommunities || !suggestedCommunities.length) return null;

  return (
    <InfinityLoader
      loadNextPaginatedData={getSuggestedCommunities}
      isLoading={suggestedCommunitiesLoading}
      isLastFetch={isLastFetch}
    >
      <div>
        {suggestedCommunities
          .filter(
            x => (language.sortBy ? x.language === language.sortBy : true),
          )
          .map(x => <Item key={x.id} {...x} />)}
      </div>
    </InfinityLoader>
  );
};

Content.propTypes = {
  suggestedCommunities: PropTypes.array,
  suggestedCommunitiesLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  getSuggestedCommunities: PropTypes.func,
  language: PropTypes.object,
};

export default React.memo(Content);
