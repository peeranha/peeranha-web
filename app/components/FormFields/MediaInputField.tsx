import React from 'react';
import Dropzone from 'components/common/Dropzone';
import Wrapper from './Wrapper';

type MediaInputFieldProps = {
  disabled: boolean;
  label: string;
  meta: object;
  previewLabel: string;
  tip: string;
  splitInHalf: boolean;
  mediaLinks: string[];
  setMediaLink: (link: string) => void;
};

export const MediaInputField = ({
  label,
  disabled,
  meta,
  tip,
  splitInHalf,
  setMediaLink,
}: MediaInputFieldProps) => (
  <Wrapper
    label={label}
    tip={tip}
    meta={meta}
    splitInHalf={splitInHalf}
    disabled={disabled}
  >
    <Dropzone setMediaLink={setMediaLink} />
  </Wrapper>
);

export default MediaInputField;
