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

export function scrollTrigger(selector, action, options = {}) {
  let els = document.querySelectorAll(selector);
  els = Array.from(els);
  els.forEach((el) => {
    addObserver(el, action, options);
  });
}

function addObserver(el, action, options) {
  if (!('IntersectionObserver' in window)) {
    if (options.cb) {
      options.cb(el);
    } else {
      action();
    }
    return;
  }
  const observer = new IntersectionObserver((entries, observer) => {
    // this takes a callback function which receives two arguments: the elemts list and the observer instance
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (options.cb) {
          options.cb(el);
        } else {
          action();
        }
        observer.unobserve(entry.target);
      }
    });
  }, options);
  observer.observe(el);
}
