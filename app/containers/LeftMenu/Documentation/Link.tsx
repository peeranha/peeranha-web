import React from 'react';
import * as routes from 'routes-config';
import cn from 'classnames';
import { A1 } from 'containers/LeftMenu/MainLinks';
import { DocumentationSection } from 'pages/Documentation/types';

type LinkProps = {
  item: DocumentationSection;
  level: number;
  match: { params: { sectionId: string } };
  editArticleId?: string;
  isOpen: boolean;
};

const Link: React.FC<LinkProps> = ({
  item,
  isOpen,
  match,
  editArticleId,
  level,
}) => (
  <A1
    to={routes.documentation(item.id)}
    name={`documentation/${item.id}`}
    className={cn('p0')}
    css={{
      fontSize: 16,
      lineHeight: '20px',
      flexGrow: 1,
      ...(level > 0 && {
        color: '#7B7B7B',
      }),
      ...((isOpen ||
        match.params.sectionId === item.id ||
        editArticleId === item.id) && {
        fontWeight: 700,
        color: 'var(--color-black)',
      }),
    }}
  >
    {item.title}
  </A1>
);

export default Link;
