import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// import { BG_PRIMARY_DARK_RGB, APP_FONT } from 'style-constants';

import Arrow from '../Arrow';

const Div = styled.div`
  position: relative;

  color: ${props => props.styles.color.a || `#ffffff`};

  background: ${props => props.styles.bg.header || `rgb(${'80, 101, 165'})`};
  border-bottom: 1px solid
    ${props =>
      props.styles.bg.header === `#ffffff`
        ? `#c2c6d8`
        : props.styles.bg.header};

  > div > div {
    position: relative;
    float: right;

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;

    font-family: ${props => props.styles.font.body || `inherit`};
    font-size: 15px;
    letter-spacing: 1px;
  }

  a {
    color: ${props => props.styles.color.a || `#ffffff`};

    :visited {
      color: ${props => props.styles.color.a || `#ffffff`};
    }
  }

  span {
    color: ${props => props.styles.color.a || `#ffffff`};
  }

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const Link = styled.a`
  padding: 12px 0;
  margin-left: 14px;

  white-space: nowrap;

  :hover {
    opacity: 0.6;
  }

  transition: color 170ms ease-in-out;
`;

const SubitemsWrapper = styled.div`
  position: relative;

  padding: 12px 0;
  margin-left: 14px;
`;

const SubitemsTitle = styled.button`
  display: flex;
  justify-content: space-between;
  
  cursor: pointer;

  :hover {
    opacity: 0.6;
  }

  transition: color 170ms ease-in-out;

  > span {
    padding: 0;
    margin-right: 8px;
  }

  > div {
    padding: 0;
  }

  img {
    padding: 0;
  }

  @media only screen and (max-width: 991px) {
    padding: 0 !important;
    width: 100%;
  }

  @media only screen and (max-width: 576px) {
    // width: 100%;
    // padding: 0 !important;
  }
`;

const Subitems = styled.div`
  position: absolute;
  top: 100%;
  right: -14px;
  z-index: 99;

  display: flex;
  width: 200px;
  flex-direction: column;
  align-items: center;
  padding: 8px 0;

  background: ${props => props.styles.background || `rgb(${'80, 101, 165'})`};

  @media only screen and (max-width: 991px) {
    position: relative;
    top: 0;
    right: 0;

    display: flex;
    align-items: flex-start;
    width: 100%;
    padding: 0 !important;
    padding-top: 10px !important;
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

export const B = ({ text, subitems, styles }) => {
  const [visible, setVisibility] = useState(false);
  const setVis = useCallback(() => setVisibility(!visible), [visible]);

  return (
    <SubitemsWrapper>
      <SubitemsTitle onClick={setVis}>
        <span>{text}</span>
        <Arrow
          className="mt-auto mb-auto"
          // color={styles.color.arrow}
          color={"default"}
          rotate={visible}
        />
      </SubitemsTitle>
      {visible && (
        <Subitems styles={styles}>
          {subitems.map(({ text, href }) => (
            <Link href={href} target="_blank">
              {text}
            </Link>
          ))}
        </Subitems>
      )}
    </SubitemsWrapper>
  );
};

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
    <Div styles={styles}>
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
