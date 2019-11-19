export const showPopover = (elemId, message) => {
  window.$(`#${elemId}`).attr({
    'data-content': message,
    'data-trigger': 'manual',
  });

  window.$(`#${elemId}`).popover('show');

  setTimeout(() => window.$(`#${elemId}`).popover('hide'), 2500);
};
