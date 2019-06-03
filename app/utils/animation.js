export function scrollToSection(
  hash = window.location.hash,
) /* istanbul ignore next */ {
  if (hash) {
    window.$('html, body').animate(
      {
        scrollTop: window.$(hash).offset().top,
      },
      250,
    );
  }
}
