import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from './TextNavbar.styled';

type TextNavbarProps = {
  headers: Array<string>;
};

const TextNavbar: React.FC<TextNavbarProps> = ({ headers }): JSX.Element => (
  <div className="dn" css={styles.wrapper}>
    <div className="ps t0">
      <div className="pt32 pl24 pb32 pr16">
        {headers.map((header: string, id: number) => {
          const sameHeaders = headers
            .slice(0, id)
            .filter(
              (item) => item.replace(/^#+/g, '') === header.replace(/^#+/g, ''),
            );
          const sameHeadersCount = sameHeaders.length
            ? `-${sameHeaders.length}`
            : '';

          const link = `${header
            .replace(/[#.,?!@$%^&*()+=|/:;'"\\]/g, '')
            .trim()
            .replace(/[" "" +"]/g, '-')}${sameHeadersCount}`.toLowerCase();

          const text = header.replace(/^#+/g, '');

          const padding = header.length - header.replace(/^#+/g, '').length;

          return (
            <Link
              key={id}
              to={`#${link}`}
              className="db mb12"
              css={{
                ...styles.navbarItem,
                ...styles.navbarItemHover,
                paddingLeft: `${5 * padding}px`,
              }}
            >
              {text}
            </Link>
          );
        })}
      </div>
    </div>
  </div>
);

export default TextNavbar;
