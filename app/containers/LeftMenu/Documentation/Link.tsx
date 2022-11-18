import React from 'react';
import * as routes from 'routes-config';
import cn from 'classnames';
import { A1 } from 'containers/LeftMenu/MainLinks';
import { getIpfsHashFromBytes32, getBytes32FromIpfsHash } from 'utils/ipfs';
import { DocumentationSection } from 'pages/Documentation/types';
import PinIcon from 'icons/Pin';

type LinkProps = {
  item: DocumentationSection;
  level: number;
  match: { params: { sectionId: string } };
  editArticleId?: string;
  isOpen: boolean;
  pinnedItemMenuId?: string;
};

const Link: React.FC<LinkProps> = ({
  item,
  isOpen,
  match,
  editArticleId,
  level,
  pinnedItemMenuId,
}) => {
  const ipfsHash = getIpfsHashFromBytes32(item.id);

  return (
    <>
      {pinnedItemMenuId == item.id && (
        <PinIcon
          css={{ fill: 'rgba(118, 153, 255, 0.2)', marginRight: '5px' }}
        />
      )}
      <A1
        to={routes.documentation(ipfsHash)}
        name={`documentation/${ipfsHash}`}
        className={cn('p0')}
        css={{
          padding: '7px 0',
          fontSize: 16,
          lineHeight: '20px',
          flexGrow: 1,
          ...(level > 0 && {
            color: '#7B7B7B',
          }),
          ...(level === 0 && { padding: '12px 0' }),
          ...((isOpen ||
            (match.params.sectionId &&
              getBytes32FromIpfsHash(match.params.sectionId) === item.id) ||
            editArticleId === item.id) && {
            fontWeight: 700,
            color: 'var(--color-black)',
          }),
        }}
      >
        {item.title}
      </A1>
    </>
  );
};

export default Link;
