let currentElement = null;
let timerId = null;
let timerOn = false;

const setPopover = (elemId, message, position) => {
  window.$(`#${elemId}`).attr({
    'data-content': message,
    'data-trigger': 'manual',
    'data-placement': position,
  });
  window.$(`#${elemId}`).popover('show');
};

export const showPopover = (elemId, message, restParamets = {}) => {
  const {
    callback,
    timeout = 2500,
    timer = true,
    position = 'top',
  } = restParamets;

  // if there are no running timers
  if (timer && !timerOn) {
    setPopover(elemId, message, position);
    timerId = setTimeout(() => closePopover(callback), timeout);
    currentElement = elemId;
    timerOn = true;
  }

  // if there is running timer & elemId !== currentElemId
  if (timer && currentElement && currentElement !== elemId) {
    closePopover();
    setPopover(elemId, message, position);
    timerId = setTimeout(() => closePopover(callback), timeout);
    currentElement = elemId;
    timerOn = true;
  }

  if (!timer) {
    closePopover();
    setPopover(elemId, message, position);
  }
};

export const closePopover = callback => {
  if (timerOn) {
    clearTimeout(timerId);
    currentElement = null;
    timerOn = false;
  }

  window.$(`.popover`).remove();
  if (typeof callback === 'function') callback();

  return null;
};
