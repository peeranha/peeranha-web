import React from 'react';
import { css } from '@emotion/react';

import bestAnswerIcon from '../../../images/bestAnswer.svg?inline';
import answerIconEmptyInside from '../../../images/answerIconEmptyInside.svg?inline';
import fingerUpAllQuestionsPage from '../../../images/fingerUpAllQuestionsPage.svg?inline';
import fingerDownAllQuestionsPage from '../../../images/fingerDownAllQuestionsPage.svg?inline';
import { getFormattedNum, getFormattedNum2 } from '../../../utils/numbers';
import { styles } from './Post.styled';
import QuestionType from '../../Questions/Content/Body/QuestionType';
import Title from '../../Questions/Content/Body/Title';
import UserInfo from '../../Questions/Content/Body/UserInfo';
import TagsContainer from '../../Questions/Content/Body/TagsContainer';
import { POST_TYPE } from '../../../utils/constants';
import { Community, Tag, Author } from './index';

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
  questionBounty,
  author,
  communityId,
  bestReply,
  rating,
  replyCount,
}): JSX.Element => {
  const answerIcon = bestReply ? bestAnswerIcon : answerIconEmptyInside;
  const ratingIcon =
    rating >= 0 ? fingerUpAllQuestionsPage : fingerDownAllQuestionsPage;

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
          <Title
            locale={locale}
            title={title}
            id={id}
            questionBounty={questionBounty}
            postType={postType}
          />

          <UserInfo
            author={author}
            locale={locale}
            postTime={postTime}
            isSearchPage={true}
            communityId={communityId}
          />
          <p
            className="mb20 fz14 light full-width ovh pr"
            css={css(styles.content)}
          >
            {content}
          </p>
          <div className="df aic jcsb">
            <TagsContainer
              communities={communities}
              communityId={communityId}
              tags={tags}
              postType={postType}
              isFeed={false}
            />
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
