import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { BG_PRIMARY_DARK_RGB } from 'style-constants';

const Div = styled.div`
  position: relative;
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
  padding: 12px 0;
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

const SubitemsWrapper = styled.div`
  position: relative;

  padding: 12px 0;
  margin-left: 14px;

  :hover {
    > div {
      display: flex;
    }
  }
`;

const SubitemsTitle = styled.span`
  color: #fff;

  cursor: pointer;

  :hover {
    color: rgba(255, 255, 255, 0.4);
  }

  transition: color 170ms ease-in-out;

  @media only screen and (max-width: 576px) {
    padding: 0 !important;
  }
`;

const Subitems = styled.div`
  position: absolute;
  top: 100%;
  right: -14px;
  z-index: 99;

  display: none;
  width: 200px;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;

  background: ${props => props.styles.background || `rgb(${'80, 101, 165'})`};

  @media only screen and (max-width: 576px) {
    position: relative;
    top: 0;
    right: 0;

    display: flex;
    align-items: flex-start;
    width: 100%;
  }

  a {
    display: inline-block;
    padding: 0;
    margin: 6px 14px;
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

export const B = ({ text, subitems, styles }) => (
  <SubitemsWrapper>
    <SubitemsTitle>{text}</SubitemsTitle>
    <Subitems styles={styles}>
      {subitems.map(({ text, href }) => (
        <Link href={href} target="_blank">
          {text}
        </Link>
      ))}
    </Subitems>
  </SubitemsWrapper>
);

B.propTypes = {
  text: PropTypes.string.isRequired,
  subitems: PropTypes.array.isRequired,
};

export const Links = ({ links, styles }) => (
  <div>
    {links.map(
      ({ text, href, subitems }) =>
        href ? (
          <A text={text} href={href} key={href} />
        ) : (
          <B text={text} subitems={subitems} key={href} styles={styles} />
        ),
    )}
  </div>
);

Links.propTypes = {
  links: PropTypes.array.isRequired,
  styles: PropTypes.object,
};

const CustomSubHeader = ({ config }) => {
  const { styles, links } = config;

  return (
    <Div styles={styles.header}>
      <div className="container h-100">
        <Links links={links} styles={styles.subitems} />
      </div>
    </Div>
  );
};

CustomSubHeader.propTypes = {
  config: PropTypes.object.isRequired,
};

export default CustomSubHeader;
