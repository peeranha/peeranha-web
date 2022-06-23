let currentElement = null;
let timerId = null;
let timerOn = false;

const setPopover = (elemId, message, position) => {
  const elem = document.querySelector(`#${elemId}`);

  elem.setAttribute('data-content', message);
  elem.setAttribute('data-trigger', 'manual');
  elem.setAttribute('data-placement', position);
};

export const showPopover = (elemId, message, restParamets = {}) => {
  const {
    callback,
    timeout = 2500,
    timer = true,
    position = 'auto',
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

  const popover = document.querySelector(`.popover`);

  if (popover) {
    popover.classList.remove('popover');
  }

  if (typeof callback === 'function') callback();

  return null;
};
