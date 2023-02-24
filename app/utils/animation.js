import { useEffect } from 'react';
import { HEADER_HEIGHT } from 'containers/Header/constants';

export function ScrollTo() /* istanbul ignore next */ {
  const { pathname, hash } = window.location;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(scrollToSection, 250);
  }, [hash]);

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

export function scrollTrigger(element, action, options = {}) {
  addObserver(element, action, options);
}

function addObserver(element, action, options) {
  if (!('IntersectionObserver' in window)) {
    if (options.callback) {
      options.callback(element);
    } else {
      action();
    }
    return;
  }
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (options.callback) {
          options.callback(element);
        } else {
          action();
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);
  observer.observe(element);
}
