export function scrollToSection() /* istanbul ignore next */ {
  const { hash } = window.location;

  if (hash) {
    window.$('html, body').animate(
      {
        scrollTop: window.$(hash).offset().top,
      },
      250,
    );
  }
}
