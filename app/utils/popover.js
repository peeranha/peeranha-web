export const getActivePopover = (elemId, message) => {
  window.$(`#${elemId}`).attr({
    'data-content': message,
    'data-trigger': 'focus',
  });

  window.$(`#${elemId}`).popover('show');
};
