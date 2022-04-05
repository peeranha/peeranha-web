/* eslint react/jsx-no-bind: 0, jsx-a11y/click-events-have-key-events: 0, jsx-a11y/no-noninteractive-element-interactions: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import createdHistory from 'createdHistory';

import textBlockStyles from 'text-block-styles';

import {
  BORDER_SECONDARY,
  BG_SECONDARY_SPECIAL_4,
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  TEXT_DARK,
  BORDER_PRIMARY_LIGHT,
} from 'style-constants';

import plusIcon from 'images/Plus.svg?inline';
import minusIcon from 'images/Minus.svg?inline';
import okayGreen from 'images/okayGreen.svg?external';
import notOkay from 'images/notOkayRed.svg?external';

import H4 from 'components/H4';
import Span from 'components/Span';
import { IconSm } from 'components/Icon/IconWithSizes';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import Button from 'components/Button/Outlined/PrimaryLarge';
import messages from './messages';

export const TextBlock = styled.div`
  display: ${x => (x.isOpened ? 'block' : 'none')};
  margin-top: ${x => (x.isOpened ? '15px' : '0px')};

  ${textBlockStyles};

  > * {
    margin-bottom: 5px;
  }
`;

const SectionStyled = BaseRoundedNoPadding.extend`
  margin-bottom: 15px;

  h4,
  h5 {
    cursor: pointer;
  }

  > :not(:last-child) {
    border-bottom: ${x => (x.isOpened ? '1' : '0')}px solid ${BORDER_SECONDARY};
  }

  ${Button} {
    margin-left: 43px;
    margin-bottom: 10px;
  }
`;

const ImgWrapper = styled.div`
  margin-right: 18px;
  width: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  :hover {
    cursor: pointer;
  }

  @media only screen and (max-width: 576px) {
    margin-right: 8px;
  }
`;

const PermissionBox = BaseTransparent.extend`
  display: flex;
  align-items: baseline;
  padding: 15px 30px;
  background: ${x => (x.isOpened ? BG_SECONDARY_SPECIAL_4 : BG_TRANSPARENT)};
  border: 1px solid
    ${x => (x.isOpened ? BORDER_PRIMARY_LIGHT : BORDER_TRANSPARENT)};

  h5 span {
    color: ${x => (x.isOpened ? TEXT_PRIMARY : TEXT_DARK)};
    margin-bottom: 5px;
  }

  &:first-child {
    padding-top: 15px;
  }

  &:last-child {
    padding-bottom: 15px;
  }
`.withComponent('li');

const PermissionBoxBody = styled.div`
  width: 100%;
`;

const Permission = ({
  title,
  permissionCode,
  sectionCode,
  getPermissionCode,
}) => {
  const permissionId = getPermissionCode(sectionCode, permissionCode);
  const ico = okayGreen;
  return (
    <PermissionBox key={permissionId} id={permissionId} isOpened={false}>
      <ImgWrapper>
        <IconSm icon={ico} />
      </ImgWrapper>

      <PermissionBoxBody>
        <h5 className="d-flex align-items-center">
          <Span fontSize="20" lineHeight="35" mobileFS="18">
            <FormattedMessage {...messages.permissions[title].title} />
          </Span>
        </h5>
        <Span fontSize="16" mobileFS="14">
          <FormattedMessage {...messages.permissions[title].description} />
        </Span>
      </PermissionBoxBody>
    </PermissionBox>
  );
};

const Section = ({
  h2,
  blocks,
  sectionCode,
  route,
  getSectionCode,
  getPermissionCode,
  permission,
}) => {
  const { hash } = window.location;

  const [isOpened, collapse] = useState(false);
  const [isExtendedSection, extendSection] = useState(false);

  const collapseSection = () => {
    createdHistory.push(route());
    collapse(!isOpened);
  };

  const sectionId = getSectionCode(sectionCode);

  if (hash.match(sectionId) && !isOpened) {
    collapse(true);

    if (!isExtendedSection) {
      extendSection(true);
    }
  }

  return (
    <SectionStyled isOpened={isOpened} id={sectionId}>
      <BaseTransparent>
        <H4
          className="d-flex align-items-center"
          onClick={collapseSection}
          mobileFS="24"
        >
          <ImgWrapper>
            <img src={isOpened ? minusIcon : plusIcon} alt="icon" />
          </ImgWrapper>
          <span>{h2}</span>
        </H4>
      </BaseTransparent>

      <div className={isOpened ? 'd-block' : 'd-none'}>
        <ul>
          {blocks.map(x => {
            return (
              <Permission
                {...x}
                key={getPermissionCode(sectionCode, x.permissionCode)}
                permission={permission}
                sectionCode={sectionCode}
                getPermissionCode={getPermissionCode}
              />
            );
          })}
        </ul>
      </div>
    </SectionStyled>
  );
};

const Content = ({
  content,
  route,
  getSectionCode,
  getPermissionCode,
  communitiesCount,
}) => (
  <div className="mb-3">
    {content.map(x => (
      <Section
        {...x}
        key={x.h2}
        route={route}
        getSectionCode={getSectionCode}
        getPermissionCode={getPermissionCode}
        communitiesCount={communitiesCount}
      />
    ))}
  </div>
);

Permission.propTypes = {
  permissionCode: PropTypes.number,
  sectionCode: PropTypes.number,
  getPermissionCode: PropTypes.func,
  permission: PropTypes.array,
  title: PropTypes.string,
};

Section.propTypes = {
  h2: PropTypes.string,
  blocks: PropTypes.array,
  sectionCode: PropTypes.number,
  route: PropTypes.func,
  getSectionCode: PropTypes.func,
  getPermissionCode: PropTypes.func,
  permission: PropTypes.array,
};

Content.propTypes = {
  content: PropTypes.array,
  route: PropTypes.func,
  getSectionCode: PropTypes.func,
  getPermissionCode: PropTypes.func,
};

export default Content;
