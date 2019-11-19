export const showPopover = (elemId, message) => {
  window.$(`#${elemId}`).attr({
    'data-content': message,
    'data-trigger': 'manual',
  });

  window.$(`#${elemId}`).popover('show');

  setTimeout(() => window.$(`.popover`).remove(), 2500);
};
