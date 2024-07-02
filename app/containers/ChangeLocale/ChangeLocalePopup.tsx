import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import ArrowDownIcon from 'icons/ArrowDown';

import { CaretRightGraph } from 'components/icons';
import Popup from 'common-components/Popup';

import { Flag } from './Styled';
import { styled } from './ChangeLocale.styled';
import ChangeLocaleButton from './ChangeLocaleButton';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

type ChangeLocalePopupProps = {
  setLocale: (language: string) => void;
  locale: string;
  open: boolean;
  setOpen: (argument: boolean) => void;
  getAvailableLanguages: string[];
};

const ChangeLocalePopup: React.FC<ChangeLocalePopupProps> = ({
  setLocale,
  locale,
  open,
  setOpen,
  getAvailableLanguages,
}): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <ChangeLocaleButton withTitle locale={locale} />
      {graphCommunity ? (
        <CaretRightGraph className="mr-4" size={[24, 24]} />
      ) : (
        <ArrowDownIcon
          className="transform270"
          css={{ color: colors.localeArrowColor || `var(--color-blue)`, marginRight: '13px' }}
        />
      )}
      {open && (
        <Popup onClose={() => setOpen(false)}>
          <div className="mb-3 df fdc">
            <div
              className="df aic jcc semi-bold fz24 mb-4"
              css={graphCommunity && { color: '#E1E1E4' }}
            >
              {t(`common.selectLanguage`)}
            </div>
            {getAvailableLanguages.map((language) => (
              <label key={language}>
                <input
                  className="dn"
                  type="radio"
                  checked={locale === language}
                  onChange={() => setLocale(language)}
                  css={styled.input}
                />
                <div className="df aic jcsb" css={styled.inputRadio}>
                  <div className="mb-3 df aic ml-3 text-center">
                    <Flag
                      src={`https://images.peeranha.io/languages/${language}_language.svg`}
                      alt="language"
                    />
                    <span css={graphCommunity && { color: '#E1E1E4' }}>
                      {t(`common.${language}`)}
                    </span>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </Popup>
      )}
    </>
  );
};
export default memo(ChangeLocalePopup);
