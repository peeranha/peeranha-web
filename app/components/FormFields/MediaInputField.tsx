import React from 'react';
import Dropzone from 'components/common/Dropzone';
import { uploadImagesToIpfs, uploadVideoToLivepeer } from 'utils/uploadFiles';
import { translations } from 'components/common/Dropzone/translations';
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
  showToastDispatch: () => void;
  locale: string;
};

export const MediaInputField = ({
  label,
  disabled,
  meta,
  tip,
  splitInHalf,
  setMediaLink,
  showToastDispatch,
  locale,
}: MediaInputFieldProps) => {
  const config = [
    {
      types: ['image'],
      maxFileSizeInBytes: 5 * 1000 * 1000,
      uploadFile: uploadImagesToIpfs,
      saveUploadedFileLink: setMediaLink,
      showUploadProgress: false,
    },
    {
      types: ['video/mp4'],
      maxFileSizeInBytes: 1000 * 1000 * 1000,
      uploadFile: uploadVideoToLivepeer,
      saveUploadedFileLink: setMediaLink,
      showUploadProgress: true,
    },
  ];

  return (
    <Wrapper
      label={label}
      tip={tip}
      meta={meta}
      splitInHalf={splitInHalf}
      disabled={disabled}
    >
      <Dropzone
        config={config}
        translations={translations(locale)}
        showToast={showToastDispatch}
      />
    </Wrapper>
  );
};

export default MediaInputField;
