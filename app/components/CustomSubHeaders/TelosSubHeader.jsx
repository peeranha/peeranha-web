import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const telosLinks = [
  {
    text: 'HQ',
    href: 'https://www.telos.net/',
  },
  {
    text: 'Vision',
    href: 'https://www.telos.net/vision',
  },
  {
    text: 'Developers',
    href: 'https://www.telos.net/developers',
  },
  {
    text: 'Foundation',
    href: 'https://www.telos.net/foundation',
  },
  {
    text: 'Explore',
    href: 'https://explore.telos.net/',
  },
];

const Div = styled.div`
  position: relative;
  height: 40px;
  background: #041238;

  > div > div {
    font-family: Neue Haas Grotesk Display Pro Roman;
    font-size: 15px;
    letter-spacing: 1px;
    height: 100%;
    width: 375px;
    float: right;
    display: flex;
    position: relative;
    justify-content: space-between;
    align-items: center;
  }

  @media only screen and (max-width: 576px) {
    display: none;
  }
`;

const Link = styled.a`
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

export const Links = () => (
  <div>{telosLinks.map(({ text, href }) => <A text={text} href={href} />)}</div>
);

const TelosSubHeader = () => (
  <Div>
    <div className="container h-100">
      <Links />
    </div>
  </Div>
);

export default TelosSubHeader;
