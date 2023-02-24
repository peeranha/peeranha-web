import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import { css } from '@emotion/react';
import React from 'react';

import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import { BaseSpecial } from 'components/Base/BaseTransparent';
import MediumImage from 'components/Img/MediumImage';
import P from 'components/P';
import A from 'components/A';
import { Tag } from 'components/TagsList';
import { IconMd } from 'components/Icon/IconWithSizes';
import Loader from 'components/LoadingIndicator/WidthCentered';

import { styles } from 'containers/Administration/Administration.styled';
import AreYouSure from 'containers/Administration/AreYouSure';
import { User, Moderator } from 'containers/Administration/types';

import { getUserAvatar } from 'utils/profileManagement';
import { getUserName } from 'utils/user';
import styled from 'styled-components';

import * as routes from 'routes-config';

// @ts-ignore
import closeIcon from 'images/closeCircle.svg?external';
import { BORDER_PRIMARY } from 'style-constants';

import { getUsersModeratorByRols } from 'utils/accountManagement';

const RemoveTagIcon = styled.button`
  display: inline-flex;
  padding: 0 0 0 10px;
`;

enum Roles {
  communityAdmin = 0,
  communityModerator = 1,
}

type ContentProps = {
  locale: string;
  single: number;
  profileInfo: User;
  moderators: Array<Moderator>;
  revokeRole: (userAddress: string, roles: Roles, communityId: number) => void;
  communityId: number;
  moderatorsLoading: boolean;
  revokeRoleLoading: boolean;
};

export const Content: React.FC<ContentProps> = ({
  single,
  profileInfo,
  moderators,
  revokeRole,
  communityId,
  moderatorsLoading,
  revokeRoleLoading,
}): JSX.Element | null => {
  const usersModerator = [
    ...new Set(moderators.map((moderator) => moderator.user)),
  ];
  const usersModeratorByRols = getUsersModeratorByRols(
    usersModerator,
    communityId,
    moderators,
    Roles,
  );

  const { t: translate } = useTranslation();

  if (moderatorsLoading) return <Loader />;

  return (
    <BaseRoundedNoPadding className="fdc mb16">
      {usersModeratorByRols.map((moderator, index) => {
        const baseSpecialProps = {
          last: usersModeratorByRols.length - 1 === index,
          first: !index,
        };

        return (
          <BaseSpecial
            {...baseSpecialProps}
            className="dg jcc aic"
            css={css`
              grid-template-columns: 3fr 5fr 6fr;
            `}
            key={moderator.user.id}
          >
            <div css={css(styles.mainInfo)}>
              <MediumImage
                isBordered
                className="flex-shrink-0 mr8"
                src={getUserAvatar(moderator.user.avatar)}
                alt="avatar"
              />

              <A
                className="ovh"
                to={routes.profileView(moderator.user.id)}
                key={moderator.user.id}
              >
                <P className="text-ellipsis fz14">
                  {getUserName(moderator.user.displayName, moderator.user.id)}
                </P>
              </A>
            </div>

            <div className="mr16 tc text-ellipsis fz14">
              {moderator.user.id}
            </div>

            <div className="mr16 tc text-ellipsis fz14">
              {moderator.userRoles.map((role) => {
                let roleName = t('administration.communityModerator');

                if (role === Roles.communityAdmin) {
                  roleName = t('administration.communityAdministrator');
                }
                return (
                  <Tag className="float-left" key={moderator.user.id + role}>
                    <span>{roleName}</span>
                    {moderator.user.id !== profileInfo?.id && profileInfo?.id && (
                      <AreYouSure
                        submitAction={() => {
                          revokeRole(moderator.user.id, role, single);
                        }}
                        // @ts-ignore
                        Button={({
                          onClick,
                        }: {
                          onClick: React.MouseEventHandler<HTMLButtonElement>;
                        }) => (
                          <RemoveTagIcon type="button" onClick={onClick}>
                            <IconMd icon={closeIcon} fill={BORDER_PRIMARY} />
                          </RemoveTagIcon>
                        )}
                        roleName={roleName}
                      />
                    )}
                  </Tag>
                );
              })}
            </div>
          </BaseSpecial>
        );
      })}
    </BaseRoundedNoPadding>
  );
};

export default React.memo(Content);
