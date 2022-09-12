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
  setMediaLinks: (links: string[]) => void;
};

export const MediaInputField = ({
  label,
  disabled,
  meta,
  tip,
  splitInHalf,
  setMediaLinks,
}: MediaInputFieldProps) => (
  <Wrapper
    label={label}
    tip={tip}
    meta={meta}
    splitInHalf={splitInHalf}
    disabled={disabled}
  >
    <Dropzone setMediaLinks={setMediaLinks} />
  </Wrapper>
);

export default MediaInputField;
