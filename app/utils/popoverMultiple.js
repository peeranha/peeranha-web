let timerArray = [];

const setNewCurrentElement = (elemId, timerId) =>
  timerArray.push({ timerId, elemId });

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

export const closePopover = (elemId, callback = null) => {
  const currentTimerId = getCurrentElement(elemId)?.timerId || null;
  window.$(`#${elemId}`).popover('dispose');
  clearTimeout(currentTimerId);
  timerArray = timerArray.filter(el => el.elemId !== elemId);
  if (typeof callback === 'function') callback();
};
