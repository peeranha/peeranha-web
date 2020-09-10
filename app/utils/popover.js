let timerIsRunning = false;
let timerId = null;

export const showPopover = (elemId, message, restParamets = {}) => {
  const { callback, timeout = 2500, timer = true } = restParamets;

  if (!timerIsRunning) {
    timerIsRunning = true;

    window.$(`#${elemId}`).attr({
      'data-content': message,
      'data-trigger': 'manual',
      'data-placement': 'auto',
    });
    window.$(`#${elemId}`).popover('show');

    if (timer) timerId = setTimeout(() => closePopover(callback), timeout);
  }
};

export const closePopover = (callback = null) => {
  window.$(`.popover`).remove();
  clearTimeout(timerId);
  timerIsRunning = false;
  if (typeof callback === 'function') callback();
  return null;
};
