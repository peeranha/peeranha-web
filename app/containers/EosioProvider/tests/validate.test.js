import { translationMessages } from 'i18n';

import { showPopover } from 'utils/popover';
import messages from 'containers/ViewQuestion/messages';

import validate from '../validate';

jest.mock('utils/popover', () => ({
  showPopover: jest.fn(),
}));

beforeEach(() => {
  showPopover.mockClear();
});

describe('validate', () => {
  const props = {
    rating: 10,
    translations: translationMessages.en,
    actor: 'actor',
    creator: 'creator',
    buttonId: 'buttonId',
    energy: 10,
    minRating: 10,
    minEnergy: 10,
  };

  it('actor && actor === creator', () => {
    try {
      validate({
        ...props,
        actor: 'actor',
        creator: 'actor',
      });
    } catch ({ message }) {
      expect(showPopover).toHaveBeenCalledWith(
        props.buttonId,
        props.translations[messages.creatorCannot.id],
      );
      expect(message).toBe(props.translations[messages.creatorCannot.id]);
    }
  });

  it('rating < minRating', () => {
    try {
      validate({
        ...props,
        rating: -1,
      });
    } catch ({ message }) {
      expect(showPopover).toHaveBeenCalledWith(
        props.buttonId,
        `${props.translations[messages.notEnoughRating.id]} ${props.minRating}`,
      );
      expect(message).toBe(
        `${props.translations[messages.notEnoughRating.id]} ${props.minRating}`,
      );
    }
  });

  it('energy < minEnergy', () => {
    try {
      validate({
        ...props,
        energy: 0,
      });
    } catch ({ message }) {
      expect(showPopover).toHaveBeenCalledWith(
        props.buttonId,
        `${props.translations[messages.notEnoughEnergy.id]} ${props.minEnergy}`,
      );
      expect(message).toBe(
        `${props.translations[messages.notEnoughEnergy.id]} ${props.minEnergy}`,
      );
    }
  });

  it('passed successfully', () => {
    validate(props);
    expect(showPopover).not.toHaveBeenCalled();
  });
});
