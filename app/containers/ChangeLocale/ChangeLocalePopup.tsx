import React from 'react';
import { useTranslation } from 'react-i18next';
import { languages } from 'app/i18n';
import Popup from 'common-components/Popup';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import ArrowDownIcon from 'icons/ArrowDown';
import { CaretRightGraph } from 'components/icons';

import { Flag } from './Styled';
import { styled } from './ChangeLocale.styled';

import ChangeLocaleButton from './ChangeLocaleButton';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

type ChangeLocalePopupProps = {
  setLocale: () => void;
  locale: string;
  open: boolean;
  setOpen: (argument: boolean) => void;
};

const ChangeLocalePopup: React.FC<ChangeLocalePopupProps> = ({
  setLocale,
  locale,
  open,
  setOpen,
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
            {Object.keys(languages).map((item) => (
              <label>
                <input
                  className="dn"
                  type="radio"
                  checked={locale === item}
                  onChange={() => setLocale(item)}
                  css={styled.input}
                />
                <div className="df aic jcsb" css={styled.inputRadio}>
                  <div className="mb-3 df aic ml-3 text-center">
                    <Flag
                      src={`https://images.peeranha.io/languages/${item}_language.svg`}
                      alt="language"
                    />
                    <span css={graphCommunity && { color: '#E1E1E4' }}>{t(`common.${item}`)}</span>
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
export default ChangeLocalePopup;
