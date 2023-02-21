import React from 'react';

const LinkInfo: React.FC<{
  href: string;
  title: string;
  titleLink: string;
}> = ({ href, title, titleLink }): JSX.Element => (
  <div className="text-ellipsis">
    <span>{title}: </span>
    <a
      href={href}
      css={{
        color: 'var(--color-link)',
      }}
      target="_blank"
    >
      {titleLink}
    </a>
  </div>
);

export default LinkInfo;
