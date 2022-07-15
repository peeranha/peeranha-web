import React from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import isMobile from 'ismobilejs';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

import * as routes from 'routes-config';

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

const single = isSingleCommunityWebsite();

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
  height: 15px;
  margin-left: 1px;
  filter: gray;
  filter: grayscale(100%);
`;

const FlexibleDiv = styled.div`
  display: flex;
`;

const LinkAdditionalStyles = css`
  width: 100% !important;
  padding: 15px 35px !important;
  display: flex !important;
`;

const LiAdditionalStyles = css`
  padding: 0 !important;
`;

const StyledIcon = styled(Icon)`
  margin-right: 10px !important;
`;

const Link = ({ path, message, cssStyles }) =>
  document.location.origin === process.env.APP_LOCATION ? (
    <A to={path} css={cssStyles}>
      <FormattedMessage {...message} />
    </A>
  ) : (
    <ADefault href={`${process.env.APP_LOCATION}${path}`} css={cssStyles}>
      <FormattedMessage {...message} />
    </ADefault>
  );

Link.propTypes = {
  path: PropTypes.string,
  message: PropTypes.object,
  cssStyles: PropTypes.array,
};

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
          <StyledIcon icon={infoIcon} width="16" height="16" />
          {withTitle && <FormattedMessage {...messages.more} />}
        </Span>
      </>
    }
    menu={
      <ul>
        {INFO_LINKS.map(el => (
          <Li key={el.route} css={LiAdditionalStyles}>
            <Link
              key={el.title}
              path={el.route}
              message={el.title}
              cssStyles={LinkAdditionalStyles}
            />
          </Li>
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

export default React.memo(({ currClientHeight }) => {
  const basicCondition =
    !styles.withoutAdditionalLinks && !isMobile(window.navigator).any;

  const fullSize = currClientHeight > SEMI_SIZE;
  const middleSize =
    currClientHeight <= FULL_SIZE && currClientHeight > SEMI_SIZE;
  const smallSize = currClientHeight <= SEMI_SIZE;

  return (
    <AdditionalLinks>
      {((!styles.withoutAdditionalLinks && currClientHeight > FULL_SIZE) ||
        (!styles.withoutAdditionalLinks && isMobile(window.navigator).any)) && (
        <>
          {INFO_LINKS.map(el => (
            <Link path={el.route} key={el.route} message={el.title} />
          ))}{' '}
        </>
      )}

      {middleSize && basicCondition && <InfoLinksDropDown withTitle />}

      {(fullSize ||
        ((smallSize || middleSize) && !basicCondition) ||
        isMobile(window.navigator).any) && <ChangeLocale withTitle />}

      {smallSize &&
        basicCondition && (
          <FlexibleDiv>
            <InfoLinksDropDown />
            <ChangeLocale />
          </FlexibleDiv>
        )}

      <FooterStyled currClientHeight={currClientHeight}>
        {!single && (
          <div>
            <FormattedMessage
              {...messages.copyrightPeeranha}
              values={{ year: new Date().getFullYear() }}
            />
          </div>
        )}
        <div className="mt-2">
          {!!single ? (
            <FormattedMessage
              {...messages.poweredBy}
              values={{
                year: new Date().getFullYear(),
                image: <Img key="peeranha" src={peeranhaLogo} alt="peeranha" />,
              }}
            >
              {(...chunks) => (
                <A className="d-flex align-content-center" to={routes.feed()}>
                  {chunks}
                </A>
              )}
            </FormattedMessage>
          ) : null}
        </div>
      </FooterStyled>
    </AdditionalLinks>
  );
});
