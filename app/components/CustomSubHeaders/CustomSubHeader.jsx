import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { BG_PRIMARY_DARK_RGB } from 'style-constants';

const Div = styled.div`
  position: relative;
  padding: 6px 0;
  background: ${props => props.styles.background || `rgb(${'80, 101, 165'})`};

  > div > div {
    position: relative;
    float: right;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;

    font-family: Neue Haas Grotesk Display Pro Roman;
    font-size: 15px;
    letter-spacing: 1px;
  }

  @media only screen and (max-width: 576px) {
    display: none;
  }
`;

const Link = styled.a`
  margin: 6px 0;
  margin-left: 14px;

  color: #fff;
  white-space: nowrap;

  :hover {
    color: rgba(255, 255, 255, 0.4);
  }

  transition: color 170ms ease-in-out;

  :visited {
    color: #fff;
  }
`;

export const A = ({ href, text }) => (
  <Link href={href} target="_blank">
    {text}
  </Link>
);

A.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
};

export const Links = ({ links }) => (
  <div>
    {links.map(({ text, href }) => <A text={text} href={href} key={href} />)}
  </div>
);

Links.propTypes = {
  links: PropTypes.array.isRequired,
};

const CustomSubHeader = ({ config }) => {
  const { styles, links } = config;

  return (
    <Div styles={styles.header}>
      <div className="container h-100">
        <Links links={links} />
      </div>
    </Div>
  );
};

CustomSubHeader.propTypes = {
  config: PropTypes.object.isRequired,
};

export default CustomSubHeader;
