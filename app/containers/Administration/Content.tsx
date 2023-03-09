import { useTranslation } from 'react-i18next';
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

import * as routes from 'routes-config';

import closeIcon from 'images/closeCircle.svg?external';
import { BORDER_PRIMARY } from 'style-constants';

import { getUsersModeratorByRoles } from 'utils/accountManagement';

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
  const usersModeratorByRoles = getUsersModeratorByRoles(
    usersModerator,
    communityId,
    moderators,
    Roles,
  );

  const { t } = useTranslation();

  if (moderatorsLoading) return <Loader />;

  return (
    <BaseRoundedNoPadding className="fdc mb16">
      {usersModeratorByRoles.map((moderator, index) => (
        <BaseSpecial
          last={usersModeratorByRoles.length - 1 === index}
          first={!index}
          className="dg jcc aic"
          css={styles.contentGrid}
          key={moderator.user.id}
        >
          <div className="df aic" css={styles.mainInfo}>
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

          <div className="mr16 tc text-ellipsis fz14">{moderator.user.id}</div>

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
                        <button
                          className="dif"
                          css={styles.removeTagIcon}
                          type="button"
                          onClick={onClick}
                        >
                          <IconMd icon={closeIcon} fill={BORDER_PRIMARY} />
                        </button>
                      )}
                      roleName={roleName}
                    />
                  )}
                </Tag>
              );
            })}
          </div>
        </BaseSpecial>
      ))}
    </BaseRoundedNoPadding>
  );
};

export default React.memo(Content);
