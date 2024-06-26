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
  lastmod: string;
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
  translations: Translation[];
};
export type Tag = {
  id: string;
  name: string;
};
export type Author = {
  displayName: string;
  id: string;
  achievements: { id: string }[];
};

export type Translation = {
  communityId: string;
  description: string | null;
  enableAutotranslation: boolean;
  id: string;
  language: string;
  name: string;
};

const SearchContent: React.FC<SearchContentProps> = ({
  locale,
  posts,
  communities,
}): JSX.Element => (
  <div>
    {posts.map((post) => (
      <Post
        key={post.id}
        id={post.id}
        locale={locale}
        communities={communities}
        lastmod={post.lastmod}
        postType={post.postType}
        title={post.title}
        postTime={post.postTime}
        content={post.content}
        tags={Array.isArray(post.tags) ? post.tags : []}
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
