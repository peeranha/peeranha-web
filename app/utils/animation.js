import { HEADER_HEIGHT } from 'containers/Header/constants';

export function scrollToSection(
  hash = window.location.hash,
) /* istanbul ignore next */ {
  if (hash) {
    window.$('html, body').animate(
      {
        scrollTop: window.$(hash).offset().top - HEADER_HEIGHT,
      },
      250,
    );
  }
}

export function formatStringToHtmlId(str) /* istanbul ignore next */ {
  return str ? str.replace(/[/.]/gim, '_') : '';
}

export function scrollToErrorField(errors) /* istanbul ignore next */ {
  const keys = Object.keys(errors);
  scrollToSection(`#${formatStringToHtmlId(keys[0])}`);
}
