import React from 'react';
import Post from './Post';

type SearchContentProps = {
  locale: string;
  posts: Post[];
  communities: Community[];
};
export type Post = {
  id: string;
  author: Author;
  bestReply: number;
  communityId: string;
  content: string;
  postTime: string;
  postType: number;
  rating: number;
  replyCount: number;
  tags: Tag[];
  title: string;
  questionBounty: object;
};
export type Community = {
  id: number;
  tags: Tag[];
};
export type Tag = {
  id: string;
};
export type Author = {
  displayName: string;
  id: string;
  achievements: { id: string }[];
};

const SearchContent: React.FC<SearchContentProps> = ({
  locale,
  posts,
  communities,
}): JSX.Element => (
  <div>
    {posts.map(post => (
      <Post
        key={post.id}
        id={post.id}
        locale={locale}
        communities={communities}
        postType={post.postType}
        title={post.title}
        postTime={post.postTime}
        content={post.content}
        tags={post.tags}
        questionBounty={post.questionBounty}
        author={post.author}
        communityId={post.communityId}
        bestReply={post.bestReply}
        rating={post.rating}
        replyCount={post.replyCount}
      />
    ))}
  </div>
);

export default SearchContent;
