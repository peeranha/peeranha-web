/* eslint react/jsx-no-bind: 0, jsx-a11y/click-events-have-key-events: 0, jsx-a11y/no-noninteractive-element-interactions: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import createdHistory from 'createdHistory';

import {
  BORDER_SECONDARY,
  BG_SECONDARY_SPECIAL_4,
  BG_TRANSPARENT,
  BORDER_TRANSPARENT,
  TEXT_PRIMARY,
  TEXT_DARK,
  BORDER_PRIMARY_LIGHT,
  BG_SUCCESS,
} from 'style-constants';

import MinusIcon from 'icons/Minus';
import PlusCircleIcon from 'icons/PlusCircle';
import CheckedIcon from 'icons/Checked';

import H4 from 'components/H4';
import Span from 'components/Span';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import Button from 'components/Button/Outlined/PrimaryLarge';
import messages from './messages';

import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const SectionStyled = BaseRoundedNoPadding.extend`
  margin-bottom: 15px;

  > :not(:last-child) {
    border-bottom: 1px solid ${BORDER_SECONDARY};
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
  padding: 0 30px;
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BORDER_TRANSPARENT};

  h5 span {
    color: ${TEXT_DARK};
    margin-bottom: 5px;
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
  return (
    <PermissionBox key={permissionId} id={permissionId}>
      <ImgWrapper>
        <CheckedIcon stroke={colors.btnColor || '#25A745'} />
      </ImgWrapper>

      <PermissionBoxBody>
        <h5 className="d-flex align-items-center">
          <Span fontSize="20" lineHeight="35" mobileFS="18">
            <FormattedMessage id={messages.permissions[title].title.id} />
          </Span>
        </h5>
      </PermissionBoxBody>
    </PermissionBox>
  );
};

const Section = ({
  h2,
  h3,
  blocks,
  sectionCode,
  route,
  getSectionCode,
  getPermissionCode,
  permission,
}) => {
  const sectionId = getSectionCode(sectionCode);

  return (
    <SectionStyled id={sectionId}>
      <BaseTransparent>
        <H4 className="d-flex align-items-center" mobileFS="24">
          <span>{h2}</span>
        </H4>
      </BaseTransparent>

      <div className="d-block">
        <div
          css={css`
            padding: 30px 0 10px 44px;
            font-size: 20px;
          `}
        >
          {h3}
        </div>
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
