export const getActivePopover = (elemId, message) => {
  window.$(`#${elemId}`).attr('data-content', message);
  window.$(`#${elemId}`).attr('data-trigger', 'focus');
  window.$(`#${elemId}`).popover('show');
};
