import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from 'styled-components';
import { Trans } from 'react-i18next';

import { BORDER_SECONDARY, BG_TRANSPARENT, BORDER_TRANSPARENT, TEXT_DARK } from 'style-constants';

import H4 from 'components/H4';
import Span from 'components/Span';

import BaseTransparent from 'components/Base/BaseTransparent';
import BaseRounded from 'components/Base/BaseRounded';
import Button from 'components/Button/Outlined/PrimaryLarge';
import { permissions } from './messages';

const SectionStyled = BaseRounded.extend`
  margin-bottom: 15px;
  padding: 0 0 32px;

  > :not(:last-child) {
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }

  ${Button} {
    margin-left: 43px;
    margin-bottom: 10px;
  }
`;

const PermissionBox = BaseTransparent.extend`
  display: flex;
  align-items: start;
  padding: 0 30px;
  background: ${BG_TRANSPARENT};
  border: 1px solid ${BORDER_TRANSPARENT};
  margin-bottom: 12px;

  h5 span {
    color: ${TEXT_DARK};
    line-height: 24px;
    & strong {
      font-weight: 600;
    }
  }
  &::before {
    content: '';
    width: 5px;
    height: 5px;
    margin-top: 11px;
    border-radius: 50%;
    background-color: #576fed;
    margin-right: 10px;
  }
`.withComponent('li');

const PermissionBoxBody = styled.div`
  width: 100%;
`;

const Permission = ({ title, permissionCode, sectionCode, getPermissionCode }) => {
  const permissionId = getPermissionCode(sectionCode, permissionCode);

  return (
    <PermissionBox key={permissionId} id={permissionId} nullMobilePadding>
      <PermissionBoxBody>
        <h5 className="d-flex align-items-center">
          <Span fontSize="18" lineHeight="35" mobileFS="18">
            <Trans
              i18nKey={permissions[title].title}
              values={{ boldText: 'All Things Web3' }}
              components={[<strong key={permissionCode} />]}
            />
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
      <BaseTransparent css={{ padding: '32px 32px 16px' }}>
        <H4 mobileFS="24">
          <span>{h2}</span>
        </H4>
      </BaseTransparent>

      <div className="d-block">
        <div
          css={css`
            padding: 16px 32px;
            font-size: 20px;
            font-weight: 600;
          `}
        >
          {h3}
        </div>
        <ul>
          {blocks.map((x) => (
            <Permission
              {...x}
              key={getPermissionCode(sectionCode, x.permissionCode)}
              permission={permission}
              sectionCode={sectionCode}
              getPermissionCode={getPermissionCode}
            />
          ))}
        </ul>
      </div>
    </SectionStyled>
  );
};

const Content = ({ content, route, getSectionCode, getPermissionCode, communitiesCount }) => (
  <div className="mb-3">
    {content.map((x) => (
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
