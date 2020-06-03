import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

  ${({ styles }) => styles.subHeader || ``};
`;

const Link = styled.a`
  ${({ styles }) => styles || ``};

  padding: 12px 0;
  margin-left: 14px;

  white-space: nowrap;

  :hover {
    opacity: 0.6;
  }

  transition: color 170ms ease-in-out;
`;

const SubitemsWrapper = styled.div`
  padding: 12px 0;
  margin-left: 14px;

  @media only screen and (min-width: 992px) {
    :hover {
      > div {
        display: block;
      }
    }
  }

  ${({ styles }) => styles || ``};
`;

const SubitemsTitleButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 !important;
  width: 100%;

  font-size: inherit;

  cursor: pointer;

  :hover {
    opacity: 0.6;
  }

  transition: color 170ms ease-in-out;

  > span {
    padding: 0;
    margin-right: 4px;
  }

  > div {
    padding: 0;
    margin-right: 16px;
  }

  img {
    padding: 0;
  }
`;

const SubitemsTitle = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: inherit;

  cursor: pointer;

  :hover {
    opacity: 0.6;
  }

  transition: color 170ms ease-in-out;

  > span {
    padding: 0;
    margin-right: 4px;
  }

  > div {
    padding: 0;
    margin-right: 0;
  }

  img {
    padding: 0;
  }
`;

const Subitems = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 99;

  display: none;
  width: 200px;
  width: 100%;
  padding: 8px 0;

  font-size: inherit;

  a {
    display: inline-block;
    padding: 0;
    margin: 6px 14px;
  }

  div {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    max-width: 1360px;
    margin: 0 auto;
  }

  @media only screen and (max-width: 991px) {
    position: relative;
    top: 0;
    right: 0;

    display: block;
    width: 100%;
    padding: 0 !important;
    padding-top: 10px !important;

    > div {
      flex-direction: column;
    }
  }

  ${({ styles }) => styles || ``};
`;

export const A = ({ href, text, styles }) => (
  <Link href={href} target="_blank" styles={styles.subHeaderItem}>
    {text}
  </Link>
);

A.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
};

export const B = ({ text, subitems, styles, device }) => {
  const [visible, setVisibility] = useState(false);
  const setVis = useCallback(() => setVisibility(!visible), [visible]);

  return (
    <SubitemsWrapper styles={styles.subHeaderItem}>
      {device === 'mobile' ? (
        <>
          <SubitemsTitleButton onClick={setVis}>
            <span>{text}</span>
            <Arrow
              className="mt-auto mb-auto"
              color={'small'}
              rotate={visible}
            />
          </SubitemsTitleButton>
          {visible && (
            <Subitems styles={styles.subitems}>
              <div>
                {subitems.map(({ text, href }) => (
                  <Link key={href} href={href} target="_blank">
                    {text}
                  </Link>
                ))}
              </div>
            </Subitems>
          )}
        </>
      ) : (
        <>
          <SubitemsTitle styles={styles.subHeaderItem}>
            <span>{text}</span>
            <Arrow
              className="mt-auto mb-auto"
              color={'small'}
            />
          </SubitemsTitle>
          <Subitems styles={styles.subitems}>
            <div>
              {subitems.map(({ text, href }) => (
                <Link key={href} href={href} target="_blank">
                  {text}
                </Link>
              ))}
            </div>
          </Subitems>
        </>
      )}
    </SubitemsWrapper>
  );
};

B.propTypes = {
  text: PropTypes.string.isRequired,
  subitems: PropTypes.array.isRequired,
};

export const Links = ({ links, styles, device = 'desktop' }) => (
  <div>
    {links.map(
      ({ text, href, subitems }) =>
        href ? (
          <A text={text} href={href} key={href} styles={styles} />
        ) : (
          <B
            text={text}
            subitems={subitems}
            key={text}
            styles={styles}
            device={device}
          />
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
        <Links links={links} styles={styles} />
      </div>
    </Div>
  );
};

CustomSubHeader.propTypes = {
  config: PropTypes.object.isRequired,
};

export default CustomSubHeader;
