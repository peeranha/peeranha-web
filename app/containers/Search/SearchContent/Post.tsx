import React from 'react';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import bestAnswerIcon from '../../../images/bestAnswer.svg?inline';
import answerIconEmptyInside from '../../../images/answerIconEmptyInside.svg?inline';
import fingerUpAllQuestionsPage from '../../../images/fingerUpAllQuestionsPage.svg?inline';
import fingerDownAllQuestionsPage from '../../../images/fingerDownAllQuestionsPage.svg?inline';
import { getFormattedNum, getFormattedNum2 } from '../../../utils/numbers';
import { getPostRoute } from '../../../routes-config';
import { styles } from './Post.styled';
import QuestionType from '../../Questions/Content/Body/QuestionType';
import {
  MONTH_3LETTERS__DAY_YYYY_TIME,
  POST_TYPE,
} from '../../../utils/constants';
import { Community, Tag, Author } from './index';
import { getFormattedDate } from '../../../utils/datetime';
import {
  getFollowedCommunities,
  isSingleCommunityWebsite,
} from '../../../utils/communityManagement';
import commonMessages from '../../../common-messages';
import * as routes from '../../../routes-config';

const single = isSingleCommunityWebsite();

type PostProps = {
  id: string;
  locale: string;
  communities: Community[];
  postType: number;
  title: string;
  postTime: string;
  content: string;
  tags: Tag[];
  questionBounty: object;
  author: Author | null | undefined;
  communityId: number | string;
  bestReply: number;
  rating: number;
  replyCount: number;
};

const Post: React.FC<PostProps> = ({
  id,
  locale,
  communities,
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
  const answerIcon = bestReply ? bestAnswerIcon : answerIconEmptyInside;
  const ratingIcon =
    rating >= 0 ? fingerUpAllQuestionsPage : fingerDownAllQuestionsPage;

  const community =
    getFollowedCommunities(communities, [+communityId])[0] || {};
  const postTags = community.tags.filter(tag =>
    tags.includes(+tag.id.split('-')[1]),
  );
  const postLink = getPostRoute(postType, id);
  const communityLink = () => {
    if (postType === POST_TYPE.tutorial) {
      return routes.tutorials(communityId);
    }
    if (postType === POST_TYPE.expertPost) {
      return routes.expertPosts(communityId);
    }
    return routes.questions(communityId);
  };

  return (
    <div className="df mb8 border-box" css={css(styles.post)}>
      <div className="ml32 mt24 mr24 mb24 df full-width">
        <div>
          <QuestionType
            postType={postType}
            locale={locale}
            className="mt8 mr16"
          />
        </div>
        <div className="df fdc full-width">
          <Link
            to={postLink}
            className="fz24 semi-bold"
            css={css(styles.title)}
          >
            {title}
          </Link>

          <span className="mt8 fz14 light" css={css(styles.creationData)}>
            <FormattedMessage id={commonMessages.asked.id} />{' '}
            {getFormattedDate(postTime, locale, MONTH_3LETTERS__DAY_YYYY_TIME)}
          </span>

          <p
            className="mt20 fz14 light full-width ovh pr"
            css={css(styles.content)}
          >
            {content}
          </p>
          <div className="mt20 df aic jcsb">
            <div className="df aic">
              <div className="mr4">
                {postTags.map(tag => (
                  <span
                    key={tag.id}
                    className="fz14 light mr8 no-wrap"
                    css={css(styles.tag)}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              {!single && (
                <Link to={communityLink()} className="df aic">
                  <img
                    src={community.avatar}
                    alt="community avatar"
                    css={css(styles.communityAvatar)}
                  />
                  <span
                    className="ml4 fz14 light"
                    css={css(styles.communityName)}
                  >
                    {community.name}
                  </span>
                </Link>
              )}
            </div>
            <div className="df">
              {postType !== POST_TYPE.tutorial && (
                <div
                  css={css(styles[bestReply ? 'bestReply' : 'noBestReply'])}
                  className="mr24"
                >
                  <span className="df aic">
                    <img src={answerIcon} alt="icon" className="mr8" />
                    <span css={css(styles.count)}>
                      {getFormattedNum(replyCount)}
                    </span>
                  </span>
                </div>
              )}
              <div>
                <span className="df aic">
                  <img src={ratingIcon} alt="icon" className="mr8" />
                  <span css={css(styles.count)}>
                    {getFormattedNum2(rating)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
