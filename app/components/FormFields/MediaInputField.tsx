import React from 'react';
import Dropzone from 'components/common/Dropzone';
import { uploadImagesToIpfs, uploadVideoToLivepeer } from 'utils/uploadFiles';
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
};

export const MediaInputField = ({
  label,
  disabled,
  meta,
  tip,
  splitInHalf,
  setMediaLink,
  showToastDispatch,
}: MediaInputFieldProps) => {
  const config = [
    {
      types: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
      maxFileSizeInBytes: 1750 * 1000,
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
    <Wrapper label={label} tip={tip} meta={meta} splitInHalf={splitInHalf} disabled={disabled}>
      <Dropzone config={config} showToast={showToastDispatch} />
    </Wrapper>
  );
};

export default MediaInputField;
