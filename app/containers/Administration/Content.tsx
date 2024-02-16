import { useTranslation } from 'react-i18next';
import React from 'react';
import * as routes from 'routes-config';

import { BORDER_PRIMARY } from 'style-constants';
import closeIcon from 'images/closeCircle.svg?external';

import { getUserAvatar } from 'utils/profileManagement';
import { getUserName } from 'utils/user';
import { getUsersModeratorByRoles } from 'utils/accountManagement';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

import { styles } from 'containers/Administration/Administration.styled';
import AreYouSure from 'containers/Administration/AreYouSure';
import { User, Moderator } from 'containers/Administration/types';
import BaseRoundedNoPadding from 'components/Base/BaseRoundedNoPadding';
import { BaseSpecial } from 'components/Base/BaseTransparent';
import MediumImage from 'components/Img/MediumImage';
import P from 'components/P';
import A from 'components/A';
import { Tag } from 'components/TagsList';
import { IconMd } from 'components/Icon/IconWithSizes';
import Loader from 'components/LoadingIndicator/WidthCentered';
import { XCircleGraph } from 'components/icons';

const graphCommunity = graphCommunityColors();

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

const communityColors = singleCommunityColors();

export const Content: React.FC<ContentProps> = ({
  single,
  profileInfo,
  moderators,
  revokeRole,
  communityId,
  moderatorsLoading,
}): JSX.Element | null => {
  function filterDuplicatesById(arr: any[]) {
    const idSet = new Set();
    return arr.filter((obj) => !idSet.has(obj.id) && idSet.add(obj.id));
  }

  const usersModeratorByRoles = getUsersModeratorByRoles(
    filterDuplicatesById(moderators.map((moderator) => moderator.user)),
    communityId,
    moderators,
    Roles,
  );

  const { t } = useTranslation();

  if (moderatorsLoading) return <Loader />;

  return (
    <BaseRoundedNoPadding css={styles.contentBlock}>
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

            <A className="ovh" to={routes.profileView(moderator.user.id)} key={moderator.user.id}>
              <P className="text-ellipsis fz14">
                {getUserName(moderator.user.displayName, moderator.user.id)}
              </P>
            </A>
          </div>

          <div css={graphCommunity && { color: '#E1E1E4' }} className="mr16 tc text-ellipsis fz14">
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
                        <button
                          className="dif"
                          css={styles.removeTagIcon}
                          type="button"
                          onClick={onClick}
                        >
                          {graphCommunity ? (
                            <XCircleGraph fill="#6F4CFF" size={[20, 20]} />
                          ) : (
                            <IconMd
                              icon={closeIcon}
                              fill={communityColors.tagColor || BORDER_PRIMARY}
                              color={communityColors.tagColor || BORDER_PRIMARY}
                            />
                          )}
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
