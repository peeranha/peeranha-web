import React from 'react';
import { styles } from './Achievements.styled';
import { TARGET_BLANK } from 'utils/constants';

const LinkInfo: React.FC<{
  href: string;
  title: string;
  titleLink: string;
}> = ({ href, title, titleLink }): JSX.Element => (
  <div css={styles.textEllipsis}>
    <span>{title}: </span>
    <a href={href} target={TARGET_BLANK}>
      {titleLink}
    </a>
  </div>
);

export default LinkInfo;
