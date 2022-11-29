type EventListener = {
  targets: Array<null | HTMLElement | Node>;
  events: string[];
  action?: 'addEventListener' | 'removeEventListener';
  handler: (event: Event | MouseEvent) => void;
};

const eventListener = ({
  targets,
  events,
  action = 'addEventListener',
  handler,
}: EventListener): any => {
  targets.forEach((target) => {
    events.forEach((eventName) => {
      if (target) {
        target[action](eventName, handler);
      }
    });
  });

  return (): any =>
    eventListener({
      action: 'removeEventListener',
      targets,
      events,
      handler,
    });
};

export default eventListener;
