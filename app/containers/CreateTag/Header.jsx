import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';
import suggestTagIcon from 'images/tagsHeaderIcon.svg?external';
import closeIcon from 'images/closeCircle.svg?external';

import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

import A from 'components/A';
import H3 from 'components/H3';
import Span from 'components/Span';
import Wrapper, { WrapperRightPanel } from 'components/Header/Simple';
import Icon from 'components/Icon';
import { IconMd } from 'components/Icon/IconWithSizes';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import { TagGraph, XCircleGraph } from 'components/icons';

const colors = singleCommunityColors();

const graphCommunity = graphCommunityColors();
export const Header = ({ title, closeRedirectPage, closeButtonAction = null }) => {
  const { t } = useTranslation();

  return (
    <Wrapper className="mb-to-sm-0 mb-from-sm-3">
      <H3>
        <MediumIconStyled>
          {graphCommunity ? (
            <TagGraph size={[24, 24]} />
          ) : (
            <Icon
              icon={suggestTagIcon}
              width="43"
              fill={colors.btnColor || BORDER_PRIMARY}
              isColorImportant
            />
          )}
        </MediumIconStyled>
        {title || t('tags.newTag')}
      </H3>

      <WrapperRightPanel className="right-panel">
        <A to={closeRedirectPage} onClick={closeButtonAction}>
          <button>
            {graphCommunity ? (
              <XCircleGraph className="mr-1" size={[24, 24]} />
            ) : (
              <IconMd
                className="mr-1"
                icon={closeIcon}
                fill={colors.btnColor || BORDER_PRIMARY}
                isColorImportant
              />
            )}
            <Span color={colors.btnColor || TEXT_PRIMARY} className="button-label">
              {t('common.close')}
            </Span>
          </button>
        </A>
      </WrapperRightPanel>
    </Wrapper>
  );
};

Header.propTypes = {
  title: PropTypes.element,
  closeRedirectPage: PropTypes.string,
  closeButtonAction: PropTypes.func,
};

export default React.memo(Header);
