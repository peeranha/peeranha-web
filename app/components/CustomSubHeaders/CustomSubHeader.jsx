import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Arrow from '../Arrow';
import CustomSubHeaderContainer from './CustomSubHeaderContainer';

const Div = styled.div`
  position: relative;

  color: ${({ styles }) =>
    styles.color && styles.color.a ? styles.color.a : `#ffffff`};

  background: ${({ styles }) => styles.bg.header || `rgb(${'80, 101, 165'})`};
  border-bottom: 1px solid
    ${({ styles }) =>
      styles.bg.header === `#ffffff` ? `#c2c6d8` : styles.bg.header};

  ${({ styles }) =>
    styles.CustomSubHeader ? styles.CustomSubHeader : ``} > div > div {
    font-family: ${({ styles }) =>
      styles.font && styles.font.body ? styles.font.body : `inherit`};
    font-size: 15px;
    letter-spacing: ${({ styles }) => styles.subHeaderLetterSpacing || '1px'};
  }

  a {
    color: ${({ styles }) =>
      styles.color && styles.color.a ? styles.color.a : `#ffffff`};

    :visited {
      color: ${({ styles }) =>
        styles.color && styles.color.a ? styles.color.a : `#ffffff`};
    }
  }

  span {
    color: ${({ styles }) =>
      styles.color && styles.color.a ? styles.color.a : `#ffffff`};
  }

  @media only screen and (max-width: 991px) {
    display: none;
  }

  ${({ styles }) => styles.subHeader || ``};
`;

export const Container = styled.div`
  margin: 0 auto !important;
  padding: 0 !important;
`;

export const LocalLink = styled.a`
  ${({ styles }) => styles.subHeaderItem || ``};

  display: inline-flex;
  align-items: center;
  padding: 10px 0;
  margin-left: 18.5px;

  white-space: nowrap;

  :hover {
    opacity: 0.6;
  }

  :hover:after {
    display: ${({ device }) => (device === 'mobile' ? 'none' : '')};
  }

  transition: color 170ms ease-in-out;

  @media (max-width: 992px) {
    margin-left: 0;
  }

  ${({ isHighlighted, styles }) => (isHighlighted ? styles.Highlighted : ``)};
`;

const SubitemsWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding: 12px 0;
  margin-left: 14px;

  @media only screen and (min-width: 992px) {
    :hover {
      > div {
        display: block;
      }
    }
  }

  @media only screen and (max-width: 991px) {
    flex-direction: column;
    padding: 0 !important;
    margin-left: 0;
  }

  ${({ styles }) => styles || ``};
`;

const SubitemsTitleButton = styled.span`
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

    + div {
      margin-left: 4px;
    }
  }

  > div {
    padding: 0;
    margin-right: 0;
  }

  img {
    padding: 0;
  }
`;

export const Subitems = styled.div`
  position: absolute;
  top: 100%;
  left: -30px;
  z-index: 9999;

  display: none;
  min-width: 152px;
  padding: 15px 0;

  font-size: inherit;

  a {
    display: block;
    padding: 0 30px;
    margin: 0;

    line-height: 48px;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media only screen and (max-width: 991px) {
    position: relative;
    top: 0;
    right: 0;

    display: block;
    width: 100%;
    padding: 0 !important;
    padding-top: 10px !important;

    a {
      margin-left: 15px;

      line-height: 2;
    }

    > div {
      flex-direction: column;
      padding-left: 0;
    }
  }

  @media only screen and (min-width: 992px) {
    border: 1px solid #f2f2f2;
    box-shadow: 0 40px 40px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 4px;
  }

  ${({ styles }) => styles || ``};
`;

const ArrowButton = styled.button`
  padding: 0 16px !important;

  > div {
    padding: 0;
    margin: 0;
  }
`;

// simple links
export const A = ({ href, text, isHighlighted, styles, target, device }) => (
  <LocalLink
    href={href}
    target={target || '_blank'}
    styles={styles}
    isHighlighted={isHighlighted}
    device={device}
  >
    {text}
  </LocalLink>
);

A.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string,
  isHighlighted: PropTypes.bool,
  styles: PropTypes.object,
  target: PropTypes.string,
  device: PropTypes.string,
};

// links with dropdowns
export const B = ({
  text,
  subitems,
  styles,
  device,
  isDropdownMenuArrow,
  href,
  isHighlighted,
  target,
}) => {
  const [visible, setVisibility] = useState(false);
  const setVis = useCallback(() => setVisibility(!visible), [visible]);

  return (
    <SubitemsWrapper styles={styles.subHeaderItem}>
      {device === 'mobile' ? (
        <>
          <SubitemsTitleButton>
            {href ? (
              <A
                text={text}
                href={href}
                key={href}
                styles={styles}
                isHighlighted={isHighlighted}
                target={target || '_blank'}
              />
            ) : (
              <span>{text}</span>
            )}

            {isDropdownMenuArrow && (
              <ArrowButton onClick={setVis}>
                <Arrow
                  className="mt-auto mb-auto"
                  color="small"
                  rotate={visible}
                />
              </ArrowButton>
            )}
          </SubitemsTitleButton>
          {visible && (
            <Subitems styles={styles.subitems}>
              <div>
                {subitems.map(({ text, href, target }) => (
                  <LocalLink
                    styles={styles}
                    key={href}
                    href={href}
                    target={target || '_blank'}
                  >
                    {text}
                  </LocalLink>
                ))}
              </div>
            </Subitems>
          )}
        </>
      ) : (
        <>
          <SubitemsTitle>
            <span>{text}</span>
            {isDropdownMenuArrow && (
              <Arrow className="mt-auto mb-auto" color="small" />
            )}
          </SubitemsTitle>
          <Subitems styles={styles.subitems}>
            <div>
              {subitems.map(({ text, href, target }) => (
                <LocalLink
                  styles={styles}
                  key={href}
                  href={href}
                  target={target || '_blank'}
                >
                  {text}
                </LocalLink>
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
  styles: PropTypes.object,
  device: PropTypes.string,
  isDropdownMenuArrow: PropTypes.bool,
  href: PropTypes.string,
  isHighlighted: PropTypes.bool,
  target: PropTypes.string,
};

export const Links = ({
  links,
  styles,
  device = 'desktop',
  isDropdownMenuArrow = true,
}) => (
  <div>
    {links.map(({ text, href, isHighlighted, subitems, target }) => (
      <React.Fragment key={text}>
        {href &&
          !subitems && (
            <A
              text={text}
              href={href}
              key={href}
              styles={styles}
              isHighlighted={isHighlighted}
              target={target || '_blank'}
              device={device}
            />
          )}
        {subitems && (
          <B
            text={text}
            href={href}
            subitems={subitems}
            key={text}
            styles={styles}
            device={device}
            isDropdownMenuArrow={isDropdownMenuArrow}
            isHighlighted={isHighlighted}
          />
        )}
      </React.Fragment>
    ))}
  </div>
);

Links.propTypes = {
  links: PropTypes.array.isRequired,
  styles: PropTypes.object,
  device: PropTypes.string,
  isDropdownMenuArrow: PropTypes.bool,
};

const CustomSubHeader = ({ config }) =>
  config ? (
    <Div styles={config.styles}>
      <Container
        className="container h-100"
        css={config.styles.subHeaderContainerStyles}
      >
        <CustomSubHeaderContainer design={config.design} />
      </Container>
    </Div>
  ) : null;

CustomSubHeader.propTypes = {
  config: PropTypes.object,
};

export default CustomSubHeader;
