import { useEffect } from 'react';
import { HEADER_HEIGHT } from 'containers/Header/constants';

export function ScrollTo() /* istanbul ignore next */ {
  const { pathname, hash } = window.location;

  useEffect(
    () => {
      window.scrollTo(0, 0);
    },
    [pathname],
  );

  useEffect(
    () => {
      setTimeout(scrollToSection, 250);
    },
    [hash],
  );

  return null;
}

export function scrollToSection(
  hash = window.location.hash,
) /* istanbul ignore next */ {
  const hsh = window.$(hash);

  if (hsh && hsh.offset()) {
    window.$('html, body').animate(
      {
        scrollTop: hsh.offset().top - HEADER_HEIGHT,
      },
      250,
    );
  }
}

export function formatStringToHtmlId(str) /* istanbul ignore next */ {
  return str ? str.replace(/[/._]/gim, '-') : '';
}

export function scrollToErrorField(errors) /* istanbul ignore next */ {
  const keys = Object.keys(errors);
  scrollToSection(`#${formatStringToHtmlId(keys[0])}`);
}
