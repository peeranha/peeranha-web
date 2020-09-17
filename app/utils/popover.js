let timerArray = [];

const setNewCurrentElement = (elemId, timerId) =>
  timerArray.push({ elemId, timerId });

const setPopover = (elemId, message, position) => {
  window.$(`#${elemId}`).attr({
    'data-content': message,
    'data-trigger': 'manual',
    'data-placement': position,
  });
  window.$(`#${elemId}`).popover('show');
};

const getCurrentElement = elemId =>
  timerArray.length && timerArray.filter(el => el.elemId === elemId).length
    ? timerArray.filter(el => el.elemId === elemId)[0]
    : null;

export const showPopover = (elemId, message, restParamets = {}) => {
  const {
    callback,
    timeout = 2500,
    timer = true,
    position = 'auto',
  } = restParamets;

  const CurrentElement = getCurrentElement(elemId);

  if (timer && !CurrentElement) {
    setPopover(elemId, message, position);
    const timerId = setTimeout(() => closePopover(elemId, callback), timeout);
    setNewCurrentElement(elemId, timerId);
  }

  if (!timer) {
    setPopover(elemId, message, position);
    setNewCurrentElement(elemId);
  }
};

export const closePopover = (elemId, callback) => {
  // processing a call from the <Popover /> component in app/ErrorBoundary
  // delete all popovers
  if (typeof elemId === 'object' && Object.keys(elemId).length === 0) {
    timerArray.forEach(el => el.timerId && clearTimeout(el.timerId));
    timerArray = [];
    window.$(`.popover`).remove();
  } else {
    // delete one popover with elemId
    const currentTimerId = getCurrentElement(elemId)?.timerId || null;
    window.$(`#${elemId}`).popover('dispose');
    clearTimeout(currentTimerId);
    timerArray = timerArray.filter(el => el.elemId !== elemId);
  }

  if (typeof callback === 'function') callback();

  return null;
};
