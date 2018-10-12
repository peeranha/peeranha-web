import messages from 'containers/Profile/messages';
import { FILE_MAX_SIZE } from './constants';

export const imageValidation = value =>
  value && value[0] && value[0].size > FILE_MAX_SIZE
    ? messages.fileSize.id
    : undefined;

export const stringLength = (min, max) => value =>
  value && (value.length > max || value.length < min)
    ? messages.stringLength.id
    : undefined;

export const strLength20 = stringLength(3, 20);
export const strLength96 = stringLength(3, 96);
