/* eslint-disable no-nested-ternary */
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { css } from '@emotion/react';
import * as routes from 'routes-config';
import communitiesConfig from 'communities-config';

import DisLikeIcon from 'icons/DisLike';
import LikeIcon from 'icons/Like';
import BestAnswerIcon from 'icons/BestAnswer';
import AnswerIcon from 'icons/Answer';
import { getFormattedNum, getFormattedNum2 } from 'utils/numbers';
import { MONTH_3LETTERS__DAY_YYYY_TIME, POST_TYPE } from 'utils/constants';
import { getFormattedDate } from 'utils/datetime';
import {
  getFollowedCommunities,
  isSingleCommunityWebsite,
  graphCommunityColors,
} from 'utils/communityManagement';
import { TheBestGraph, ChatTextGraph, ThumbsUpGraph, ThumbsDownGraph } from 'components/icons';
import QuestionType from 'containers/Questions/Content/Body/QuestionType';

import { styles } from './Post.styled';
import { Community, Tag, Author, Translation } from './index';

const single = isSingleCommunityWebsite();
const graphCommunity = graphCommunityColors();

type PostProps = {
  id: string;
  locale: string;
  communities: Community[];
  postType: number;
  title: string;
  lastmod: string;
  postTime: string;
  content: string;
  tags: Tag[];
  questionBounty: object;
  author?: Author | null;
  communityId: number | string;
  bestReply: number;
  rating: number;
  replyCount: number;
};

const Post: React.FC<PostProps> = ({
  id,
  locale,
  communities,
  lastmod,
  postType,
  title,
  postTime,
  content,
  tags,
  communityId,
  bestReply,
  rating,
  replyCount,
}): JSX.Element => {
  const { t } = useTranslation();
  const community = getFollowedCommunities(communities, [communityId])[0] || {};

  const postLink = routes.getPostRoute({ postType, id, title });
  const communityLink = () => {
    if (postType === POST_TYPE.tutorial) {
      return routes.tutorials(communityId);
    }
    if (postType === POST_TYPE.expertPost) {
      return routes.expertPosts(communityId);
    }
    if (postType === POST_TYPE.documentation) {
      return routes.feed(communityId);
    }
    if (postType === POST_TYPE.autoscraped) {
      return routes.discordPosts();
    }
    // To do: telegam and slack
    return routes.questions(communityId);
  };

  const communityDocumentationURL = communitiesConfig[communityId]?.origin + postLink;

  const communityTranslationTitle = community?.translations?.find(
    (translation: Translation) => translation.language === locale,
  )?.name;

  const isSocialPostType = postType === POST_TYPE.autoscraped;

  return (
    <div className="df mb8 border-box" css={styles.post}>
      <div className="m16 full-width" css={styles.container}>
        <div className="df aic">
          <QuestionType postType={postType} isSearch={true} className="mr4" />
          {!single && postType === POST_TYPE.documentation ? (
            <a href={communityDocumentationURL} css={styles.title}>
              {title}
            </a>
          ) : (
            <Link to={postLink} css={styles.title}>
              {title}
            </Link>
          )}
        </div>

        <div css={css(styles.mainInfo)}>
          {lastmod && postType === POST_TYPE.documentation && (
            <span className="db mt8 fz14 light" css={css(styles.creationTime)}>
              {t('common.lastUpdated')}{' '}
              {getFormattedDate(lastmod, locale, MONTH_3LETTERS__DAY_YYYY_TIME)}
            </span>
          )}
          {postTime && postType !== POST_TYPE.documentation && (
            <span className="db mt8 fz12 light" css={styles.creationTime}>
              {t('common.asked')}{' '}
              {getFormattedDate(postTime, locale, MONTH_3LETTERS__DAY_YYYY_TIME)}
            </span>
          )}

          <p className="dib pr mt12 fz14 light ovh" css={styles.content}>
            {content}
          </p>
        </div>

        <div css={styles.additionalInfo}>
          <div className="mt12" css={styles.tagsAndCommunity}>
            {tags.map((tag: Tag) => (
              <span key={tag.id} className="dib fz14 light mr8 no-wrap mb8" css={styles.tag}>
                {tag.name}
              </span>
            ))}
            {!single && (
              <Link to={communityLink()} className="df aic full-height">
                {community.avatar && (
                  <img src={community.avatar} alt="community avatar" css={styles.communityAvatar} />
                )}
                <span className="ml4 fz14 light no-wrap" css={styles.communityName}>
                  {communityTranslationTitle || community.name}
                </span>
              </Link>
            )}
          </div>

          {postType !== POST_TYPE.documentation && (
            <div className="mt12 df">
              {postType !== POST_TYPE.tutorial && (
                <div css={styles[bestReply ? 'bestReply' : 'noBestReply']} className="mr24">
                  <span className="df aic">
                    {bestReply ? (
                      graphCommunity ? (
                        <TheBestGraph className="mr-2" size={[24, 24]} fill="#4BCA81" />
                      ) : (
                        <BestAnswerIcon stroke="rgb(40, 167, 69)" className="mr8" />
                      )
                    ) : graphCommunity ? (
                      <ChatTextGraph className="mr-2" size={[24, 24]} fill="#6F4CFF" />
                    ) : (
                      <AnswerIcon stroke="rgb(53, 74, 137)" className="mr8" />
                    )}
                    <span css={styles.count} className="fz16 light">
                      {getFormattedNum(replyCount)}
                    </span>
                  </span>
                </div>
              )}
              {!isSocialPostType && (
                <div>
                  <span className="df aic">
                    {rating >= 0 ? (
                      graphCommunity ? (
                        <ThumbsUpGraph className="mr-2" size={[24, 24]} fill="#6F4CFF" />
                      ) : (
                        <LikeIcon stroke="rgb(53, 74, 137)" className="mr8" />
                      )
                    ) : graphCommunity ? (
                      <ThumbsDownGraph className="mr-2" size={[24, 24]} fill="#6F4CFF" />
                    ) : (
                      <DisLikeIcon stroke="rgb(53, 74, 137)" className="mr8" />
                    )}
                    <span css={styles.count} className="fz16 light">
                      {getFormattedNum2(rating)}
                    </span>
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
