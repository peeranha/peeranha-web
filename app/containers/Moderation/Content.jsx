import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import styled from 'styled-components';
import { Trans } from 'react-i18next';

import { BORDER_SECONDARY, BG_TRANSPARENT, BORDER_TRANSPARENT, TEXT_DARK } from 'style-constants';

import okayGreen from 'images/okayGreen.svg?external';

import { IconSm } from 'components/Icon/IconWithSizes';
import H4 from 'components/H4';
import Span from 'components/Span';

import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import Button from 'components/Button/Outlined/PrimaryLarge';
import { permissions } from './messages';
import styles from './Moderation.styled';

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
    & strong {
      font-weight: 600;
    }
  }

  &:last-child {
    padding-bottom: 15px;
  }
`.withComponent('li');

const PermissionBoxBody = styled.div`
  width: 100%;
`;

const Permission = ({ title, permissionCode, sectionCode, getPermissionCode }) => {
  const permissionId = getPermissionCode(sectionCode, permissionCode);
  const ico = okayGreen;

  return (
    <PermissionBox key={permissionId} id={permissionId}>
      <ImgWrapper>
        <IconSm
          icon={ico}
          css={css`
            path {
              stroke: ${colors.btnColor || '#25A745'};
            }
          `}
        />
      </ImgWrapper>

      <PermissionBoxBody>
        <h5 className="d-flex align-items-center">
          <Span fontSize="18" lineHeight="35" mobileFS="18">
            <Trans
              i18nKey={permissions[title]?.title}
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
  sectionPermissions,
  sectionCode,
  getSectionCode,
  getPermissionCode,
  permission,
}) => {
  const sectionId = getSectionCode(sectionCode);

  return (
    <SectionStyled id={sectionId}>
      <BaseTransparent css={styles.sectionHeader}>
        <H4 mobileFS="24">
          <span>{sectionPermissions[0]?.h2}</span>
        </H4>
      </BaseTransparent>

      {sectionPermissions.map(({ h3, blocks }) => (
        <div className="d-block" key={h3}>
          <div css={styles.roleTitle}>{h3}</div>
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
      ))}
    </SectionStyled>
  );
};

const Content = ({
  moderatorPermissions,
  route,
  getSectionCode,
  getPermissionCode,
  communitiesCount,
}) => (
  <div className="mb-3">
    {moderatorPermissions.map((permission) => (
      <Section
        sectionPermissions={permission}
        key={permission[0].h2}
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
