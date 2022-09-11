import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import isMobile from 'ismobilejs';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

import peeranhaLogo from 'images/LogoBlack.svg?inline';
import infoIcon from 'images/information.svg?external';

import { TEXT_PRIMARY, TEXT_SECONDARY } from 'style-constants';

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
      white-space: nowrap;
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
  filter: grayscale(100%);
  :hover {
    filter: grayscale(0);
  }
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

const ASimple = styled.a`
  font-weight: 600;
  color: ${TEXT_PRIMARY};
  transition: opacity 0.3s ease-out;
  padding: 0 !important;

  :hover {
    opacity: 0.8;
  }
`;

const DivMention = styled.div`
  margin-top: 5px;
  line-height: 1.2;
  font-size: 10px;
  > span {
    white-space: normal;
  }
`;

const Link = ({ path, message, cssStyles }) => {
  const { t } = useTranslation();

  return document.location.origin === process.env.APP_LOCATION ? (
    <A to={path} css={cssStyles}>
      {t(message)}
    </A>
  ) : (
    <ADefault href={`${process.env.APP_LOCATION}${path}`} css={cssStyles}>
      {t(message)}
    </ADefault>
  );
};

Link.propTypes = {
  path: PropTypes.string,
  message: PropTypes.string,
  cssStyles: PropTypes.array,
};

const InfoLinksDropDown = ({ withTitle }) => {
  const { t } = useTranslation();

  return (
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
            {withTitle && t('common.more')}
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
};

InfoLinksDropDown.propTypes = {
  withTitle: PropTypes.bool,
};

const AdditionalLinksComponent = ({
  currClientHeight,
  changeLocale,
  locale,
}) => {
  const { t } = useTranslation();
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

      {middleSize &&
        basicCondition &&
        process.env.ENV !== 'prod' && <InfoLinksDropDown withTitle />}

      {(fullSize ||
        ((smallSize || middleSize) && !basicCondition) ||
        isMobile(window.navigator).any) && (
        <ChangeLocale withTitle changeLocale={changeLocale} locale={locale} />
      )}

      {smallSize &&
        basicCondition && (
          <FlexibleDiv>
            <InfoLinksDropDown />
            {process.env.ENV !== 'prod' && (
              <ChangeLocale changeLocale={changeLocale} locale={locale} />
            )}
          </FlexibleDiv>
        )}

      <FooterStyled currClientHeight={currClientHeight}>
        {!single && (
          <div>
            {t('common.copyrightPeeranha', { year: new Date().getFullYear() })}
          </div>
        )}

        {!!single && (
          <div className="mt-2">
            {Boolean(single) && (
              <a
                className="d-flex align-content-center"
                href={process.env.APP_LOCATION}
              >
                <Trans
                  i18nKey="common.poweredBy"
                  values={{ year: new Date().getFullYear() }}
                  components={[
                    <Img key="0" src={peeranhaLogo} alt="peeranha" />,
                  ]}
                />
              </a>
            )}
          </div>
        )}

        <DivMention>
          <Trans
            i18nKey="common.reCaptchaMention"
            values={{
              privacyPolicy: t('common.privacyPolicy'),
              termsOfService: t('common.termsOfService'),
            }}
            components={[
              <ASimple
                key="0"
                href="https://policies.google.com/privacy"
                target="_blank"
              />,
              <ASimple
                key="1"
                href="https://policies.google.com/terms"
                target="_blank"
              />,
            ]}
          />
        </DivMention>
      </FooterStyled>
    </AdditionalLinks>
  );
};

export default React.memo(AdditionalLinksComponent);
