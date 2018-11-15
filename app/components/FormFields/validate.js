import { FILE_MAX_SIZE } from 'containers/EditProfilePage/constants';
import messages from './messages';

export const imageValidation = value =>
  value && value[0] && value[0].size > FILE_MAX_SIZE
    ? messages.fileSize
    : undefined;

export const stringLength = (min, max) => value =>
  value && (value.length > max || value.length < min)
    ? messages.wrongLength
    : undefined;

export const required = value => (!value ? messages.requiredField : undefined);

export const strLength20 = stringLength(3, 20);
export const strLength20x100 = stringLength(20, 100);
export const strLength1000 = stringLength(20, 1000);
export const strLength30000 = stringLength(50, 30000);
