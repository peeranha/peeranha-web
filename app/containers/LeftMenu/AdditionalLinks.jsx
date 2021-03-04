import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import isMobile from 'ismobilejs';

import { singleCommunityStyles } from 'utils/communityManagement';

import telosIcon from 'images/telosIconLight.svg?inline';
import peeranhaLogo from 'images/LogoBlack.svg?inline';
import infoIcon from 'images/information.svg?external';

import { TEXT_SECONDARY } from 'style-constants';
import messages from 'common-messages';

import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';
import A, { ADefault } from 'components/A';

import ChangeLocale from 'containers/ChangeLocale';
import Span from 'components/Span/index';
import { Li } from 'containers/ChangeLocale/Styled';
import { FULL_SIZE, INFO_LINKS, SEMI_SIZE } from './constants';

const styles = singleCommunityStyles();

const AdditionalLinks = styled.div`
  display: flex;
  flex-direction: column;

  > * {
    padding: 10px 15px;

    span,
    a:hover,
    a {
      color: ${TEXT_SECONDARY};
    }
  }

  a {
    padding: 7px 15px;
  }

  @media only screen and (max-width: 576px) {
    padding: 30px 10px;
  }
`;

const FooterStyled = styled.footer`
  font-size: 12px;
  margin: ${({ currClientHeight }) => {
    if (styles.withoutAdditionalLinks) return '0 0';
    if (currClientHeight < FULL_SIZE && !isMobile(window.navigator).any)
      return '10px 0 0';
    return '30px 0';
  }};

  a {
    padding-left: 0;
  }
`;

const Img = styled.img`
  width: ${({ alt }) => (alt === 'telos' ? 40 : 60)}px;
  height: 12px;
  filter: gray;
  filter: grayscale(100%);
`;

const Link =
  document.location.origin === process.env.APP_LOCATION
    ? ({ path, message }) => (
      <A to={path}>
        <FormattedMessage {...message} />
      </A>
    )
    : ({ path, message }) => (
      <ADefault href={`${process.env.APP_LOCATION}${path}`}>
        <FormattedMessage {...message} />
      </ADefault>
    );

const InfoLinksDropDown = ({ withTitle }) => (
  <Dropdown
    className="mr-3"
    button={
      <>
        <Span
          className="d-flex align-items-center mr-1"
          fontSize="16"
          lineHeight="20"
          color={TEXT_SECONDARY}
        >
          <Icon
            icon={infoIcon}
            width="16"
            height="16"
            css={{ marginRight: '10px' }}
          />
          {withTitle && <FormattedMessage {...messages.more} />}
        </Span>
      </>
    }
    menu={
      <ul>
        {INFO_LINKS.map(el => (
         <>
          <Li key={el.route}>
            <Link
              path={el.route}
              message={el.title}
            />
          </Li>
          <Li key={el.route}>
            <A to={el.route}>
              <FormattedMessage {...el.title} />
            </A>
          </Li>
         </>
        ))}
      </ul>
    }
    id="choose-language-dropdown"
    isArrowed
  />
);

InfoLinksDropDown.propTypes = {
  withTitle: PropTypes.bool,
};

export default React.memo(({ currClientHeight }) => (
  <AdditionalLinks>
    {((!styles.withoutAdditionalLinks && currClientHeight > FULL_SIZE) ||
      (!styles.withoutAdditionalLinks && isMobile(window.navigator).any)) && (
      <>
        {INFO_LINKS.map(el => (
          <A to={el.route} key={el.route}>
            <FormattedMessage {...el.title} />
          </A>
        ))}{' '}
      </>
    )}

    {!styles.withoutAdditionalLinks &&
      currClientHeight <= FULL_SIZE &&
      currClientHeight > SEMI_SIZE &&
      !isMobile(window.navigator).any && <InfoLinksDropDown withTitle />}

    {currClientHeight > SEMI_SIZE && <ChangeLocale withTitle />}

    {currClientHeight <= SEMI_SIZE && (
      <div css={{ display: 'flex' }}>
        {!isMobile(window.navigator).any && <InfoLinksDropDown />}
        <ChangeLocale />
      </div>
    )}

    <FooterStyled currClientHeight={currClientHeight}>
      {!styles.withoutCopyright && (
        <div>
          <FormattedMessage
            {...messages.copyrightPeeranha}
            values={{ year: new Date().getFullYear() }}
          />
        </div>
      )}
      <div className="mt-2">
        <FormattedMessage
          {...messages.poweredByTelos}
          values={{
            image: styles.poweredByPeeranha ? (
              <Img key="peeranha" src={peeranhaLogo} alt="peeranha" />
            ) : (
              <Img key="telos" src={telosIcon} alt="telos" />
            ),
          }}
        >
          {(...chunks) => (
            <a
              className={
                styles.poweredByPeeranha ? 'd-flex align-content-center' : ''
              }
              href={
                styles.poweredByPeeranha
                  ? process.env.APP_LOCATION
                  : 'https://www.telosfoundation.io/'
              }
              target="_blank"
            >
              {chunks}
            </a>
          )}
        </FormattedMessage>
      </div>
    </FooterStyled>
  </AdditionalLinks>
));
