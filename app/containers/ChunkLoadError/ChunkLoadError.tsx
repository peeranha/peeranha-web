import React from 'react';
import { ANIMATE_IMAGE } from '../HomePage/constants';
import messages from 'common-messages';
import { FormattedMessage } from 'react-intl';
import { getLinks } from 'media-links';

import chunkLoadErrorImage from 'images/ChunkLoadError.svg?inline';
import { css } from '@emotion/react';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { SocialDiscord, SocialEmail, SocialTwitter } from 'icons/index';

const ChunkLoadError = (locale: string) => (
  <div
    css={css`
      display: flex;
      min-height: 100vh;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      text-align: left;
    `}
  >
    <img
      className={ANIMATE_IMAGE}
      src={chunkLoadErrorImage}
      alt="simpleAndAffordable"
    />
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 40px;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          gap: 16px;
        `}
      >
        <div
          css={css`
            font-size: 38px;
            font-weight: bold;
          `}
        >
          <FormattedMessage id={messages.weUpdatedTheApplication.id} />
        </div>

        <div
          css={css`
            display: flex;
            flex-direction: column;
            gap: 8px;
          `}
        >
          <h5 className="fz18">
            <FormattedMessage id={messages.clearYourBrowser.id} />
          </h5>

          <p className="fz18">
            <FormattedMessage
              id={messages.holdDown.id}
              values={{
                ctrl: <b>Ctrl</b>,
                f5: <b>F5</b>,
              }}
            />
          </p>
        </div>
      </div>

      <div
        css={css`
          display: flex;
          align-items: flex-start;
          gap: 24px;
        `}
      >
        <a href={getLinks(locale).email}>
          <SocialEmail className="icon" />
        </a>

        <a href={getLinks(locale).twitter} target="_blank">
          <SocialTwitter className="icon" />
        </a>

        <a href={getLinks(locale).discord} target="_blank">
          <SocialDiscord className="icon" />
        </a>
      </div>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
});

export default connect(
  mapStateToProps,
  null,
)(ChunkLoadError);
