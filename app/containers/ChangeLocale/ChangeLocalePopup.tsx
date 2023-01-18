import React, { useState } from 'react';
import Popup from 'common-components/Popup';
import { appLocales } from 'i18n';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';
import { styled } from './ChangeLocale.styled';
import { Flag } from './Styled';
import ChangeLocale from './ChangeLocale';

type ChangeLocalePopupProps = {
  setLocale: () => void;
  title: string;
  locale: string;
};

const ChangeLocalePopup: React.FC<ChangeLocalePopupProps> = ({
  setLocale,
  title,
  locale,
}): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <button onClick={() => setOpen(true)}>
      <ChangeLocale locale={locale} setOpen={setOpen} />
      {open && (
        <Popup onClose={() => setOpen(false)} title={title}>
          <div className="mb-3 df fdc">
            {appLocales.map((item) => (
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
                      src={require(`images/Language/${[item]}_lang.svg?inline`)}
                      alt="country"
                    />
                    <FormattedMessage id={commonMessages[item].id} />
                  </div>
                </div>
              </label>
            ))}
          </div>
        </Popup>
      )}
    </button>
  );
};
export default ChangeLocalePopup;
