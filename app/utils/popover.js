export const showPopover = (elemId, message) => {
  window.$(`#${elemId}`).attr({
    'data-content': message,
    'data-trigger': 'manual',
    'data-placement': 'auto',
  });

  window.$(`#${elemId}`).popover('show');

  setTimeout(closePopover, 2500);
};

export const closePopover = () => {
  window.$(`.popover`).remove();
  return null;
};
